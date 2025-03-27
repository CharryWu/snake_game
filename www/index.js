import init, { greet } from "snake_game";

async function start() {
  const wasm = await init();
  greet("Filip"); // don't call wasm.greet, since in assembly you can only work with numbers, not strings
  // call the glue code `greet` for more abstraction
}

start();
