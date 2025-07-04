import init, { Direction, InitOutput, World, GameStatus } from "snake_game";

const CELL_SIZE = 10; // display sidelen of each cell, in pixels
const WORLD_ROWS = 16; // default # of rows
const WORLD_COLS = 16; // default # of columns
const SNAKE_SPAWN_ROW = Date.now() % WORLD_ROWS; // vertical position in grid
const SNAKE_SPAWN_COL = Date.now() % WORLD_COLS; // horizontal position in grid

let rows = WORLD_ROWS; // # of rows
let cols = WORLD_COLS; // # of columns
let snake_spawn_row = SNAKE_SPAWN_ROW; // vertical position in grid
let snake_spawn_col = SNAKE_SPAWN_COL; // horizontal position in grid

const q: <E extends Element = Element>(selectors: string) => E | null =
  document.querySelector.bind(document);

const $gameStatus = q("#game-status");
const $gameControlBtn = q("#game-control-btn");
const $gamePoints = q("#game-points");
const $gameWorldSizeSelect = q("#game-world-size-select");

if (!$gameControlBtn || !$gameStatus)
  throw new Error("Can't find HTML element: control button or status field");

/**
 * Represents the parameters required for a drawing function.
 *
 * @property {HTMLCanvasElement} canvas - The canvas element where the drawing will be rendered.
 * @property {CanvasRenderingContext2D} context - The 2D rendering context for the drawing operations.
 * @property {World} world - The game world instance containing the state and logic for the drawing.
 */
interface DrawingFnParams {
  canvas?: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  world: World;
  wasm?: InitOutput;
}

const statusToText = (status: GameStatus) => {
  switch (status) {
    case GameStatus.Won:
      return "You have won! 🎉";
    case GameStatus.Lost:
      return "You have lost! 😢";
    case GameStatus.Played:
      return "Playing...";
    default:
      return "Game not started";
  }
};

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

function drawCell({
  context,
  row,
  col,
}: {
  context: CanvasRenderingContext2D;
  row: number;
  col: number;
}) {
  context.beginPath();
  context.fillRect(CELL_SIZE * col, CELL_SIZE * row, CELL_SIZE, CELL_SIZE);
  context.stroke();
}

function drawCells({
  context,
  cells,
}: {
  context: CanvasRenderingContext2D;
  cells: [number, number][];
}) {
  context.beginPath();
  for (const [row, col] of cells) {
    context.fillRect(CELL_SIZE * col, CELL_SIZE * row, CELL_SIZE, CELL_SIZE);
  }
  context.stroke();
}

/**
 * Draws the snake's head on the canvas.
 *
 * This function uses the provided canvas and context to draw the snake's head
 * at its current position in the world. The position is determined by the
 * snake's head coordinates retrieved from the world object. The size of each
 * cell is defined by the CELL_SIZE constant.
 *
 * @param {DrawingFnParams} params - The parameters required for drawing,
 * including the canvas element, its rendering context, and the world object.
 */
function drawSnake({ wasm, context, world }: DrawingFnParams) {
  const snakeCellPtr = world.get_snake_cells(); // e.g. 1179632 a `Number` type
  const snakeLength = world.snake_length();
  const snakeCellsRaw = new Uint32Array( // access WASM memory in JS directly
    wasm.memory.buffer, // `wasm` is returned by init, type `InitInput` or `InitOutput`
    snakeCellPtr, // ptr returned by Rust
    snakeLength * 2 // each snake cell occupies 2 bytes: (row, col)
  ); // extract `snakeLength` bytes from memory buffer at the address of `snakeCellPtr`

  for (let i = snakeLength - 1; i >= 0; i--) {
    context.fillStyle = i == 0 ? "#344e41" : "#a3b18a"; // head: dark tone, body: light tone
    context.beginPath();
    const row = snakeCellsRaw[i * 2];
    const col = snakeCellsRaw[i * 2 + 1];
    context.fillRect(CELL_SIZE * col, CELL_SIZE * row, CELL_SIZE, CELL_SIZE);
  }
  context.stroke();
}

function drawRewardCell({ context, world }: DrawingFnParams) {
  const { row, col } = world.get_reward_cell();
  context.fillStyle = "#f5b700";
  context.beginPath();
  context.fillRect(CELL_SIZE * col, CELL_SIZE * row, CELL_SIZE, CELL_SIZE);
  context.stroke();
}

function drawGameStatus(world: World) {
  $gameStatus.textContent = statusToText(world.status);
  $gamePoints.textContent = String(world.points);
  switch (world.status) {
    case GameStatus.Won:
    case GameStatus.Lost:
      $gameStatus.textContent = statusToText(world.status);
      $gameControlBtn.textContent = "Reset";
  }
}

/**
 * Paints the current state of the world and the snake onto the canvas.
 *
 * This function first clears the entire canvas, then draws the grid
 * representing the world and finally draws the snake on top of it.
 *
 * @param {DrawingFnParams} params - The parameters containing the canvas,
 * context, and world to be drawn.
 */
function paint({ canvas, context, world, wasm }: DrawingFnParams) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawWorld({ canvas, context, world });
  drawRewardCell({ canvas, context, world, wasm });
  drawSnake({ canvas, context, world, wasm });
  drawGameStatus(world);
}

/**
 * Initializes the main application by setting up the WebAssembly module,
 * creating the game world, and starting the game loop. The function retrieves
 * the canvas element, initializes the game world with specified dimensions
 * and snake starting position, and sets up the 2D rendering context. It
 * begins the game loop with a specified frames per second (FPS) rate, updating
 * the game state and rendering the world and snake on each frame.
 */
async function init_main() {
  const wasm = await init(); // needs to be called at top of init_main
  const canvas = q("#canvas") as HTMLCanvasElement;
  let world = World.from(rows, cols, snake_spawn_row, snake_spawn_col);
  const context = canvas.getContext("2d");
  // console.log(world.num_rows); // will print `undefined` since `num_rows` is a private field

  document.addEventListener("keydown", (e) => {
    switch (e.code) {
      case "ArrowLeft":
        world.change_snake_dir(Direction.Left);
        break;
      case "ArrowRight":
        world.change_snake_dir(Direction.Right);
        break;
      case "ArrowUp":
        world.change_snake_dir(Direction.Up);
        break;
      case "ArrowDown":
        world.change_snake_dir(Direction.Down);
        break;
    }
  });

  let timeout: number;
  let raf: number;

  function loop_play() {
    if (world.status === GameStatus.Won || world.status === GameStatus.Lost) {
      return; // IMPORTANT: exit game loop if win or loss
    }
    const FPS = 4;
    timeout = window.setTimeout(() => {
      world.step();
      paint({ canvas, context, world, wasm });
      // method takes callback to invoked before next browser repaint
      raf = window.requestAnimationFrame(loop_play);
    }, 1000 / FPS);
  }

  $gameControlBtn.addEventListener("click", (_: MouseEvent) => {
    switch (world.status) {
      case GameStatus.Played:
      case GameStatus.Won:
      case GameStatus.Lost: // reset mid-game, could also be restart after win/lost
        ($gameWorldSizeSelect as HTMLSelectElement).disabled = false;
        context.reset();
        window.cancelAnimationFrame(raf);
        window.clearTimeout(timeout);
        $gameStatus.textContent = statusToText(null);
        world = World.from(rows, cols, snake_spawn_row, snake_spawn_col); // reset world
        $gameControlBtn.textContent = "Play";
        paint({ canvas, world, context, wasm });
        return;

      default: // status defaults to None, player starts game!
        // disable world size select when game is played
        ($gameWorldSizeSelect as HTMLSelectElement).disabled = true;
        $gameStatus.textContent = statusToText(GameStatus.Played);
        $gameControlBtn.textContent = "Reset";
        world.start_game();
        loop_play();
        return;
    }
  });

  $gameStatus.textContent = statusToText(null);

  $gameWorldSizeSelect.addEventListener("change", (e: Event) => {
    const target = e.target as HTMLSelectElement;
    rows = parseInt(target.value) || WORLD_ROWS;
    cols = parseInt(target.value) || WORLD_COLS;
    snake_spawn_row = Date.now() % rows;
    snake_spawn_col = Date.now() % cols;
    world = World.from(rows, cols, snake_spawn_row, snake_spawn_col);
    paint({ canvas, world, context, wasm });
  });

  paint({ canvas, world, context, wasm });
}

init_main();
