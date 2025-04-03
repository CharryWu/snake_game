import init, { World } from "snake_game";
const CELL_SIZE = 10;
const WORLD_ROWS = 24; // # of rows
const WORLD_COLS = 12; // # of columns
const SNAKE_SPAWN_ROW = Date.now() % WORLD_ROWS; // vertical position in grid
const SNAKE_SPAWN_COL = Date.now() % WORLD_COLS; // horizontal position in grid

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
  const worldRows = world.get_num_rows();
  const worldCols = world.get_num_cols();
  canvas.width = worldCols * CELL_SIZE * dpi;
  canvas.height = worldRows * CELL_SIZE * dpi;
  canvas.style.width = `${worldCols * CELL_SIZE}px`;
  canvas.style.height = `${worldRows * CELL_SIZE}px`;
  context.scale(dpi, dpi);
  context.beginPath();

  console.log({ worldRows, worldCols });

  // Draw horizontal lines
  for (let row = 0; row < worldRows + 1; row++) {
    // drawing (x, y) is transpose of (row, col)
    context.moveTo(0, row * CELL_SIZE); //x=0 at left edge
    context.lineTo(CELL_SIZE * worldCols, row * CELL_SIZE); // y=worldWidth * CELL_SIZE at right edge
  }
  // Draw vertical lines
  for (let col = 0; col < worldCols + 1; col++) {
    context.moveTo(col * CELL_SIZE, 0); //y=0 at top edge
    context.lineTo(col * CELL_SIZE, CELL_SIZE * worldRows); // x=worldHeight * CELL_SIZE at bottom edge
  }
  context.stroke();
}

function drawSnake({ canvas, context, world }: DrawingFnParams) {
  const { row: snake_head_row, col: snake_head_col } =
    world.get_snake_head_coord();
  context.beginPath();
  context.fillRect(
    CELL_SIZE * snake_head_col,
    CELL_SIZE * snake_head_row,
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
    WORLD_ROWS,
    WORLD_COLS,
    SNAKE_SPAWN_ROW,
    SNAKE_SPAWN_COL
  );
  const context = canvas.getContext("2d");
  // console.log(world.width); // will print `undefined` since `width` is a private field

  function update() {
    const FPS = 4;
    window.setTimeout(() => {
      world.update();
      paint({ canvas, context, world });
      // method takes callback to invoked before next browser repaint
      window.requestAnimationFrame(update);
    }, 1000 / FPS);
  }

  paint({ canvas, world, context });
  update();
}

init_main();
