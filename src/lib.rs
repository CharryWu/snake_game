use wasm_bindgen::prelude::*;
use wee_alloc::WeeAlloc;

// Use `wee_alloc` as the global allocator. Reduces compiled .wasm size by 3KB
#[global_allocator]
static ALLOC: WeeAlloc = WeeAlloc::INIT;
// Default size of newly spawned snake in new world
static SPAWN_SNAKE_LEN: usize = 3;

#[wasm_bindgen] // import externally defined JS functions into current module
extern "C" {
    pub fn alert(s: &str); // window.alert
}

#[wasm_bindgen(module = "/www/utils/random.js")]
extern "C" {
    fn getRandomInRange(min: usize, max: usize) -> usize;
}

// First up let's take a look of binding `console.log` manually, without the
// help of `web_sys`. Here we're writing the `#[wasm_bindgen]` annotations
// manually ourselves, and the correctness of our program relies on the
// correctness of these annotations!

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    // The `console.log` is quite polymorphic, so we can bind it with multiple
    // signatures. Note that we need to use `js_name` to ensure we always call
    // `log` in JS.
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_u32(a: u32);

    // Multiple arguments too!
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_many(a: &str, b: &str);
}

#[wasm_bindgen]
#[derive(PartialEq, Eq, Copy, Clone)]
pub enum GameStatus {
    Won,    // stop moving
    Lost,   // stop moving
    Played, // moving
}

#[wasm_bindgen]
// See https://doc.rust-lang.org/std/marker/trait.Copy.html#whats-the-difference-between-copy-and-clone
#[derive(Copy, Clone, Debug, PartialEq, Eq)] // A type can implement Copy if all of its components implement Copy.
pub struct Coordinate {
    pub row: usize,
    pub col: usize,
}

type Dimension = Coordinate;

/**
 * PartialEq equality must be (for all a, b and c):
 * - symmetric: a == b implies b == a; and
 * - transitive: a == b and b == c implies a == c.
 * **Trait Eq inherits trait PartialEq. All it does is refine the contract. a == a : valild assuming type A implements Eq**
 */
#[wasm_bindgen]
#[derive(PartialEq, Eq, Copy, Clone)]
pub enum Direction {
    Up,
    Down,
    Left,
    Right,
}

// usize/类型isize用于处理与内存访问相关的操作（数组索引、指针运算、指针类型双关、ffi 互操作等）。
// 如果你像数字u32一样使用usize，那么你可能误用了它。
// 例如，你可能会尝试在usize上执行算术运算，这是不可能的，因为usize不是数字，而是一个类型。
pub struct Snake {
    body: Vec<Coordinate>,
    direction: Direction,
}

impl Snake {
    /// Creates a new snake with the specified spawn coordinates, length, and world dimensions.
    ///
    /// # Arguments
    /// * `spawn_coord` - The initial position of the snake's head
    /// * `length` - The initial length of the snake
    /// * `world_dimension` - The dimensions of the game world
    ///
    /// # Returns
    /// A new Snake instance with the specified parameters
    fn new(spawn_coord: Coordinate, length: usize, world_dimension: Dimension) -> Snake {
        let mut body = vec![];

        for i in 0..length {
            body.push(Coordinate {
                row: spawn_coord.row,
                col: (world_dimension.col + spawn_coord.col - i) % world_dimension.col, // avoid overflow
            })
        }
        Snake {
            body,
            direction: Direction::Right,
        }
    }
}

#[wasm_bindgen]
pub struct World {
    dimension: Dimension,
    snake: Snake,
    reward_cell: Coordinate,
    pub status: Option<GameStatus>,
}

#[wasm_bindgen]
impl World {
    /// Creates a new game world with default dimensions (8x8) and a snake starting at position (1,2).
    ///
    /// # Returns
    /// A new World instance with default settings
    pub fn new() -> World {
        let dimension: Dimension = Dimension { row: 8, col: 8 };
        let snake = Snake::new(Coordinate { row: 1, col: 2 }, SPAWN_SNAKE_LEN, dimension);
        let reward_cell = Self::gen_reward_cell(dimension, &snake.body); // Self refers to World
        // local var `snake` is not borrowed, so it can be used again
        World {
            dimension,
            snake, // var `snake` is moved into World constructor
            reward_cell,
            status: None,
        }
    }

    /// Creates a new game world with custom dimensions and snake starting position.
    ///
    /// # Arguments
    /// * `world_num_rows` - Number of rows in the game world
    /// * `world_num_cols` - Number of columns in the game world
    /// * `snake_row` - Initial row position of the snake
    /// * `snake_col` - Initial column position of the snake
    ///
    /// # Returns
    /// A new World instance with the specified parameters
    pub fn from(
        world_num_rows: usize,
        world_num_cols: usize,
        snake_row: usize,
        snake_col: usize,
    ) -> World {
        let dimension: Dimension = Dimension {
            row: world_num_rows,
            col: world_num_cols,
        };
        let snake = Snake::new(
            Coordinate {
                row: snake_row,
                col: snake_col,
            },
            SPAWN_SNAKE_LEN,
            dimension,
        );
        let reward_cell = Self::gen_reward_cell(dimension, &snake.body); // Self refers to World
        // local var `snake` is not borrowed, so it can be used again
        World {
            dimension,
            snake, // var `snake` is moved into World constructor
            reward_cell,
            status: None,
        }
    }

    /// Starts the game by setting the game status to Played.
    pub fn start_game(&mut self) {
        self.status = Some(GameStatus::Played);
    }

    /// Returns the number of rows in the game world.
    ///
    /// # Returns
    /// The number of rows as a usize
    pub fn get_num_rows(&self) -> usize {
        self.dimension.row
    }

    /// Returns the number of columns in the game world.
    ///
    /// # Returns
    /// The number of columns as a usize
    pub fn get_num_cols(&self) -> usize {
        self.dimension.col
    }

    /// Returns the current position of the snake's head.
    ///
    /// # Returns
    /// The Coordinate of the snake's head
    pub fn get_snake_head_coord(&self) -> Coordinate {
        self.snake.body[0]
    }

    /// Returns the current position of the reward cell.
    ///
    /// # Returns
    /// The Coordinate of the reward cell
    pub fn get_reward_cell(&self) -> Coordinate {
        self.reward_cell
    }

    /// Changes the direction of the snake's movement.
    /// Prevents 180-degree turns (snake cannot turn back on itself).
    ///
    /// # Arguments
    /// * `direction` - The new direction to move
    pub fn change_snake_dir(&mut self, direction: Direction) {
        let next_cell = self.get_next_snake_cell(self.get_snake_head_coord(), direction);
        if next_cell == self.snake.body[1] {
            return; // 180 degree turn is not allowed
        }
        self.snake.direction = direction;
    }

    /// Updates the game state by moving the snake and checking for collisions or rewards.
    /// This method:
    /// - Moves the snake in its current direction
    /// - Checks for self-collision
    /// - Checks if the snake has eaten the reward
    /// - Updates game status based on win/lose conditions
    pub fn step(&mut self) {
        match self.status {
            Some(GameStatus::Won) => {
                return;
            }
            Some(GameStatus::Lost) => {
                return;
            }
            Some(GameStatus::Played) => {
                // go over snake body, assign each cell coord to its next cell except
                // head which will move to a new cell according to `snake.direction`
                let snake_head = self.get_snake_head_coord();
                for i in (1..self.snake_length()).rev() {
                    self.snake.body[i] = self.snake.body[i - 1];
                }
                self.snake.body[0] = self.get_next_snake_cell(snake_head, self.snake.direction);

                // FAIL: snake eats self
                // use Rust vector `contains` method to check whether snake head
                // overlaps with any snake body cells
                if self.snake.body[1..self.snake_length()].contains(&self.snake.body[0]) {
                    self.status = Some(GameStatus::Lost);
                }

                // snake eats reward
                if self.snake.body[0] == self.reward_cell {
                    // push `snake_head` which is previous pos of snake head
                    // instead of `reward_cell` which is current index of snake head
                    // to ensure in next `step` update, body cell does not occupy head position
                    // log(&format!("before push snake.body={:?}", self.snake.body));
                    self.snake.body.push(snake_head); // grow snake by 1 more cell.
                    // The newly pushed cell position is irrelevant as it will be overwritten
                    // in next `step` update, value will be reassigned by second last cell
                    // log(&format!("after push snake.body={:?}", self.snake.body));
                    if self.snake_length() < self.dimension.row * self.dimension.col {
                        self.reward_cell = Self::gen_reward_cell(self.dimension, &self.snake.body);
                    } else {
                        // winning condition
                        self.status = Some(GameStatus::Won);
                    }
                }
            }
            None => {
                return;
            }
        }
    }

    /// Returns a raw pointer to the snake's body cells.
    /// This is a workaround for Rust's borrowing rules when interfacing with JavaScript.
    ///
    /// # Returns
    /// A raw pointer to the first Coordinate in the snake's body
    pub fn get_snake_cells(&self) -> *const Coordinate {
        // cannot return a reference to JS because of borrowing rules
        // cannot return a borrowed ref with #[wasm_bindgen]
        // Rust code have no control of underlying memory data
        // pub fn get_snake_cells(&mut self) -> &Coordinate {
        //     &self.snake.body
        // }
        self.snake.body.as_ptr() // hack: go around rust's borrowing rules
        // points to first item of snake.body
        // `*const` is a raw pointer, Rust borrowing rules doesn't apply to it
        // You're telling rust compiler you'd like to access point anyways because you're in control of the code
    }

    /// Returns the current length of the snake.
    ///
    /// # Returns
    /// The number of cells in the snake's body
    pub fn snake_length(&self) -> usize {
        self.snake.body.len()
    }

    /// Generates a new reward cell position that doesn't overlap with the snake's body.
    ///
    /// # Arguments
    /// * `world_dimension` - The dimensions of the game world
    /// * `snake_body` - The current positions of the snake's body cells
    ///
    /// # Returns
    /// A new Coordinate for the reward cell
    fn gen_reward_cell(world_dimension: Dimension, snake_body: &Vec<Coordinate>) -> Coordinate {
        let mut reward_cell: Coordinate;
        loop {
            reward_cell = Coordinate {
                row: getRandomInRange(0, world_dimension.row),
                col: getRandomInRange(0, world_dimension.col),
            };
            if !snake_body.contains(&reward_cell) {
                break; // loop until reward cell is not inside snake body
            }
        }
        reward_cell
    }

    /// Calculates the next cell position based on the current position and direction.
    /// Handles wrapping around the world boundaries.
    ///
    /// # Arguments
    /// * `cell` - The current cell position
    /// * `direction` - The direction of movement
    ///
    /// # Returns
    /// The next Coordinate the snake will move to
    fn get_next_snake_cell(&self, cell: Coordinate, direction: Direction) -> Coordinate {
        match direction {
            Direction::Left => Coordinate {
                row: cell.row,
                col: (cell.col + self.dimension.col - 1) % self.dimension.col,
            },
            Direction::Right => Coordinate {
                row: cell.row,
                col: (cell.col + self.dimension.col + 1) % self.dimension.col,
            },
            Direction::Up => Coordinate {
                row: (cell.row + self.dimension.row - 1) % self.dimension.row,
                col: cell.col,
            },
            Direction::Down => Coordinate {
                row: (cell.row + self.dimension.row + 1) % self.dimension.row,
                col: cell.col,
            },
        }
    }
}
