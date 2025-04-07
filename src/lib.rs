use wasm_bindgen::prelude::*;
use wee_alloc::WeeAlloc;

// Use `wee_alloc` as the global allocator. Reduces compiled .wasm size by 3KB
#[global_allocator]
static ALLOC: WeeAlloc = WeeAlloc::INIT;

#[wasm_bindgen] // import externally defined JS functions into current module
extern "C" {
    pub fn alert(s: &str); // window.alert
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
// See https://doc.rust-lang.org/std/marker/trait.Copy.html#whats-the-difference-between-copy-and-clone
#[derive(Copy, Clone, Debug, PartialEq, Eq)] // A type can implement Copy if all of its components implement Copy.
pub struct Coordinate {
    pub row: usize,
    pub col: usize,
}

type Dimension = Coordinate;

#[wasm_bindgen]
#[derive(PartialEq, Eq, Copy, Clone)]
/**
 * PartialEq equality must be (for all a, b and c):
 * - symmetric: a == b implies b == a; and
 * - transitive: a == b and b == c implies a == c.
 * **Trait Eq inherits trait PartialEq. All it does is refine the contract. a == a : valild assuming type A implements Eq**
 */
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
}

#[wasm_bindgen]
impl World {
    pub fn new() -> World {
        let dimension: Dimension = Dimension { row: 8, col: 8 };
        World {
            dimension,
            snake: Snake::new(Coordinate { row: 1, col: 2 }, 3, dimension),
        }
    }

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
        World {
            dimension,
            snake: Snake::new(
                Coordinate {
                    row: snake_row,
                    col: snake_col,
                },
                3,
                dimension,
            ),
        }
    }

    pub fn get_num_rows(&self) -> usize {
        self.dimension.row
    }

    pub fn get_num_cols(&self) -> usize {
        self.dimension.col
    }

    pub fn get_snake_head_coord(&self) -> Coordinate {
        self.snake.body[0]
    }

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

    pub fn change_snake_dir(&mut self, direction: Direction) {
        self.snake.direction = direction;
    }

    /**
     * Go over snake body, assign each cell coord to its next cell except
     * head which will move to a new cell according to `snake.direction`
     */
    pub fn step(&mut self) {
        let snake_head = self.get_snake_head_coord();
        for i in (1..self.snake.body.len()).rev() {
            self.snake.body[i] = self.snake.body[i - 1];
        }
        self.snake.body[0] = self.get_next_snake_cell(snake_head, self.snake.direction);
    }

    // cannot return a reference to JS because of borrowing rules
    // cannot return a borrowed ref with #[wasm_bindgen]
    // Rust code have no control of underlying memory data
    // pub fn get_snake_cells(&mut self) -> &Coordinate {
    //     &self.snake.body
    // }

    /**
     * `*const` is a raw pointer, Rust borrowing rules doesn't apply to it
     * You're telling rust compiler you'd like to access point anyways because you're in control of the code
     */
    pub fn get_snake_cells(&self) -> *const Coordinate {
        self.snake.body.as_ptr() // hack: go around rust's borrowing rules
        // points to first item of snake.body
    }

    pub fn snake_length(&self) -> usize {
        self.snake.body.len()
    }
}
