use wasm_bindgen::prelude::*;

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

#[wasm_bindgen] // exported to web assembly and invoked in JS context
// It's the opposite of extern: these aren't the functions we need, but rather the functions we're giving out to the world.
pub fn greet(name: &str) {
    log(&format!("+++++++ WASM: Hi there {}", name));
}
