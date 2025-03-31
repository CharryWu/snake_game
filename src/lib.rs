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
    pub x: usize,
    pub y: usize,
}

// usize/类型isize用于处理与内存访问相关的操作（数组索引、指针运算、指针类型双关、ffi 互操作等）。
// 如果你像数字u32一样使用usize，那么你可能误用了它。
// 例如，你可能会尝试在usize上执行算术运算，这是不可能的，因为usize不是数字，而是一个类型。
pub struct Snake {
    body: Vec<Coordinate>,
}

impl Snake {
    fn new(spawn_x: usize, spawn_y: usize) -> Snake {
        Snake {
            body: vec![Coordinate {
                x: spawn_x,
                y: spawn_y,
            }],
        }
    }
}

#[wasm_bindgen]
pub struct World {
    width: usize,
    height: usize,
    snake: Snake,
}

#[wasm_bindgen]
impl World {
    pub fn new() -> World {
        World {
            width: 8,
            height: 8,
            snake: Snake::new(1, 2),
        }
    }
    pub fn get_width(&self) -> usize {
        self.width
    }
    pub fn get_height(&self) -> usize {
        self.height
    }

    pub fn get_snake_head_coord(&self) -> Coordinate {
        self.snake.body[0]
    }

    pub fn update(&mut self) {
        let Coordinate { x, y } = self.get_snake_head_coord();
        self.snake.body[0].x = (x + 1) % self.get_width();
    }
}
