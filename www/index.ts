import init, { World } from "snake_game";
const CELL_SIZE = 10;
const WORLD_WIDTH = 16;
const WORLD_HEIGHT = 20;
const SNAKE_SPAWN_X = 2;
const SNAKE_SPAWN_Y = 2;

interface DrawingFnParams {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  world: World;
}
/**
 * Draws the game world on a canvas element by setting its dimensions
 * based on the world's width and height, and drawing grid lines.
 * Automatically adjust based on Retina Screen DPI
 * See: https://stackoverflow.com/a/74556648
 *
 * @param {Object} params - The parameters for drawing the world.
 * @param {HTMLCanvasElement} params.canvas - The canvas element to draw on.
 * @param {CanvasRenderingContext2D} params.context - The 2D rendering context for the drawing surface of the canvas.
 * @param {World} params.world - The game world instance providing dimensions.
 */
function drawWorld({ canvas, context, world }: DrawingFnParams) {
  const dpi = window.devicePixelRatio;
  const worldWidth = world.get_width();
  const worldHeight = world.get_height();
  canvas.width = worldWidth * CELL_SIZE * dpi;
  canvas.height = worldHeight * CELL_SIZE * dpi;
  canvas.style.width = `${worldWidth * CELL_SIZE}px`;
  canvas.style.height = `${worldHeight * CELL_SIZE}px`;
  context.scale(dpi, dpi);
  context.beginPath();

  // Draw horizontal lines
  for (let x = 0; x < worldWidth + 1; x++) {
    context.moveTo(CELL_SIZE * x, 0); //y=0 at left edge
    context.lineTo(CELL_SIZE * x, worldWidth * CELL_SIZE); // y=worldWidth * CELL_SIZE at right edge
  }
  // Draw vertical lines
  for (let y = 0; y < worldWidth + 1; y++) {
    context.moveTo(0, CELL_SIZE * y); //x=0 at top edge
    context.lineTo(CELL_SIZE * worldHeight, CELL_SIZE * y); // x=worldHeight * CELL_SIZE at bottom edge
  }
  context.stroke();
}

function drawSnake({ canvas, context, world }: DrawingFnParams) {
  const { x: snake_head_x, y: snake_head_y } = world.get_snake_head_coord();
  context.beginPath();
  context.fillRect(
    CELL_SIZE * snake_head_x,
    CELL_SIZE * snake_head_y,
    CELL_SIZE,
    CELL_SIZE
  );
  context.stroke();
}

function paint({ canvas, context, world }: DrawingFnParams) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawWorld({ canvas, context, world });
  drawSnake({ canvas, context, world });
}

async function init_main() {
  const wasm = await init(); // needs to be called at top of init_main
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const world = World.from(
    WORLD_WIDTH,
    WORLD_HEIGHT,
    SNAKE_SPAWN_X,
    SNAKE_SPAWN_Y
  );
  const context = canvas.getContext("2d");
  // console.log(world.width); // will print `undefined` since `width` is a private field

  function update() {
    window.setTimeout(() => {
      world.update();
      paint({ canvas, context, world });
      // method takes callback to invoked before next browser repaint
      window.requestAnimationFrame(update);
    }, 1000);
  }

  paint({ canvas, world, context });
  update();
}

init_main();
