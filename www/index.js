import init, { World } from "snake_game";

async function start() {
  const wasm = await init();
  const world = World.new();
  console.log(world.width);
}

start();
