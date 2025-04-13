"use strict";
(self["webpackChunkwww"] = self["webpackChunkwww"] || []).push([["index_ts"],{

/***/ "../pkg/snake_game.js":
/*!****************************!*\
  !*** ../pkg/snake_game.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Coordinate: () => (/* binding */ Coordinate),
/* harmony export */   Direction: () => (/* binding */ Direction),
/* harmony export */   GameStatus: () => (/* binding */ GameStatus),
/* harmony export */   World: () => (/* binding */ World),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   initSync: () => (/* binding */ initSync)
/* harmony export */ });
/* harmony import */ var _snippets_snake_game_027f5cd2d64d2885_www_utils_random_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./snippets/snake_game-027f5cd2d64d2885/www/utils/random.js */ "../pkg/snippets/snake_game-027f5cd2d64d2885/www/utils/random.js");


let wasm;

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

function isLikeNone(x) {
    return x === undefined || x === null;
}
/**
 *
 * * PartialEq equality must be (for all a, b and c):
 * * - symmetric: a == b implies b == a; and
 * * - transitive: a == b and b == c implies a == c.
 * * **Trait Eq inherits trait PartialEq. All it does is refine the contract. a == a : valild assuming type A implements Eq**
 *
 * @enum {0 | 1 | 2 | 3}
 */
const Direction = Object.freeze({
    Up: 0, "0": "Up",
    Down: 1, "1": "Down",
    Left: 2, "2": "Left",
    Right: 3, "3": "Right",
});
/**
 * @enum {0 | 1 | 2}
 */
const GameStatus = Object.freeze({
    Won: 0, "0": "Won",
    Lost: 1, "1": "Lost",
    Played: 2, "2": "Played",
});

const CoordinateFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_coordinate_free(ptr >>> 0, 1));

class Coordinate {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Coordinate.prototype);
        obj.__wbg_ptr = ptr;
        CoordinateFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CoordinateFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_coordinate_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get row() {
        const ret = wasm.__wbg_get_coordinate_row(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set row(arg0) {
        wasm.__wbg_set_coordinate_row(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get col() {
        const ret = wasm.__wbg_get_coordinate_col(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set col(arg0) {
        wasm.__wbg_set_coordinate_col(this.__wbg_ptr, arg0);
    }
}

const WorldFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_world_free(ptr >>> 0, 1));

class World {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(World.prototype);
        obj.__wbg_ptr = ptr;
        WorldFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WorldFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_world_free(ptr, 0);
    }
    /**
     * @returns {GameStatus | undefined}
     */
    get status() {
        const ret = wasm.__wbg_get_world_status(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
     * @param {GameStatus | null} [arg0]
     */
    set status(arg0) {
        wasm.__wbg_set_world_status(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
    /**
     * @returns {number}
     */
    get points() {
        const ret = wasm.__wbg_get_world_points(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set points(arg0) {
        wasm.__wbg_set_world_points(this.__wbg_ptr, arg0);
    }
    /**
     * Creates a new game world with default dimensions (8x8) and a snake starting at position (1,2).
     *
     * # Returns
     * A new World instance with default settings
     * @returns {World}
     */
    static new() {
        const ret = wasm.world_new();
        return World.__wrap(ret);
    }
    /**
     * Creates a new game world with custom dimensions and snake starting position.
     *
     * # Arguments
     * * `world_num_rows` - Number of rows in the game world
     * * `world_num_cols` - Number of columns in the game world
     * * `snake_row` - Initial row position of the snake
     * * `snake_col` - Initial column position of the snake
     *
     * # Returns
     * A new World instance with the specified parameters
     * @param {number} world_num_rows
     * @param {number} world_num_cols
     * @param {number} snake_row
     * @param {number} snake_col
     * @returns {World}
     */
    static from(world_num_rows, world_num_cols, snake_row, snake_col) {
        const ret = wasm.world_from(world_num_rows, world_num_cols, snake_row, snake_col);
        return World.__wrap(ret);
    }
    /**
     * Starts the game by setting the game status to Played.
     */
    start_game() {
        wasm.world_start_game(this.__wbg_ptr);
    }
    /**
     * Returns the number of rows in the game world.
     *
     * # Returns
     * The number of rows as a usize
     * @returns {number}
     */
    get_num_rows() {
        const ret = wasm.world_get_num_rows(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Returns the number of columns in the game world.
     *
     * # Returns
     * The number of columns as a usize
     * @returns {number}
     */
    get_num_cols() {
        const ret = wasm.world_get_num_cols(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Returns the current position of the snake's head.
     *
     * # Returns
     * The Coordinate of the snake's head
     * @returns {Coordinate}
     */
    get_snake_head_coord() {
        const ret = wasm.world_get_snake_head_coord(this.__wbg_ptr);
        return Coordinate.__wrap(ret);
    }
    /**
     * Returns the current position of the reward cell.
     *
     * # Returns
     * The Coordinate of the reward cell
     * @returns {Coordinate}
     */
    get_reward_cell() {
        const ret = wasm.world_get_reward_cell(this.__wbg_ptr);
        return Coordinate.__wrap(ret);
    }
    /**
     * Changes the direction of the snake's movement.
     * Prevents 180-degree turns (snake cannot turn back on itself).
     *
     * # Arguments
     * * `direction` - The new direction to move
     * @param {Direction} direction
     */
    change_snake_dir(direction) {
        wasm.world_change_snake_dir(this.__wbg_ptr, direction);
    }
    /**
     * Updates the game state by moving the snake and checking for collisions or rewards.
     * This method:
     * - Moves the snake in its current direction
     * - Checks for self-collision
     * - Checks if the snake has eaten the reward
     * - Updates game status based on win/lose conditions
     */
    step() {
        wasm.world_step(this.__wbg_ptr);
    }
    /**
     * Returns a raw pointer to the snake's body cells.
     * This is a workaround for Rust's borrowing rules when interfacing with JavaScript.
     *
     * # Returns
     * A raw pointer to the first Coordinate in the snake's body
     * @returns {number}
     */
    get_snake_cells() {
        const ret = wasm.world_get_snake_cells(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Returns the current length of the snake.
     *
     * # Returns
     * The number of cells in the snake's body
     * @returns {number}
     */
    snake_length() {
        const ret = wasm.world_snake_length(this.__wbg_ptr);
        return ret >>> 0;
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_getRandomInRange_ede7d48230436272 = function(arg0, arg1) {
        const ret = (0,_snippets_snake_game_027f5cd2d64d2885_www_utils_random_js__WEBPACK_IMPORTED_MODULE_0__.getRandomInRange)(arg0 >>> 0, arg1 >>> 0);
        return ret;
    };
    imports.wbg.__wbindgen_init_externref_table = function() {
        const table = wasm.__wbindgen_export_0;
        const offset = table.grow(4);
        table.set(0, undefined);
        table.set(offset + 0, undefined);
        table.set(offset + 1, null);
        table.set(offset + 2, true);
        table.set(offset + 3, false);
        ;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function __wbg_init_memory(imports, memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedUint8ArrayMemory0 = null;


    wasm.__wbindgen_start();
    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (typeof module !== 'undefined') {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (typeof module_or_path !== 'undefined') {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (typeof module_or_path === 'undefined') {
        module_or_path = new URL(/* asset import */ __webpack_require__(/*! snake_game_bg.wasm */ "../pkg/snake_game_bg.wasm"), __webpack_require__.b);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__wbg_init);


/***/ }),

/***/ "../pkg/snake_game_bg.wasm":
/*!*********************************!*\
  !*** ../pkg/snake_game_bg.wasm ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "c23d72aa190fa080db7b.wasm";

/***/ }),

/***/ "../pkg/snippets/snake_game-027f5cd2d64d2885/www/utils/random.js":
/*!***********************************************************************!*\
  !*** ../pkg/snippets/snake_game-027f5cd2d64d2885/www/utils/random.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRandomInRange: () => (/* binding */ getRandomInRange)
/* harmony export */ });
/**
 * Random number generator based on [min, max)
 * @param {number} min
 * @param {number} max
 * @returns {number} a random integer between min (inclusive) and max (exclusive)
 */
function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var snake_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! snake_game */ "../pkg/snake_game.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var CELL_SIZE = 10;
var WORLD_ROWS = 4; // # of rows
var WORLD_COLS = 4; // # of columns
var SNAKE_SPAWN_ROW = Date.now() % WORLD_ROWS; // vertical position in grid
var SNAKE_SPAWN_COL = Date.now() % WORLD_COLS; // horizontal position in grid
var q = document.querySelector.bind(document);
var $gameStatus = q("#game-status");
var $gameControlBtn = q("#game-control-btn");
var $gamePoints = q("#game-points");
if (!$gameControlBtn || !$gameStatus)
    throw new Error("Can't find HTML element: control button or status field");
var statusToText = function (status) {
    switch (status) {
        case snake_game__WEBPACK_IMPORTED_MODULE_0__.GameStatus.Won:
            return "You have won! 🎉";
        case snake_game__WEBPACK_IMPORTED_MODULE_0__.GameStatus.Lost:
            return "You have lost! 😢";
        case snake_game__WEBPACK_IMPORTED_MODULE_0__.GameStatus.Played:
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
function drawWorld(_a) {
    var canvas = _a.canvas, context = _a.context, world = _a.world;
    var dpi = window.devicePixelRatio;
    var worldRows = world.get_num_rows();
    var worldCols = world.get_num_cols();
    canvas.width = worldCols * CELL_SIZE * dpi;
    canvas.height = worldRows * CELL_SIZE * dpi;
    canvas.style.width = "".concat(worldCols * CELL_SIZE, "px");
    canvas.style.height = "".concat(worldRows * CELL_SIZE, "px");
    context.scale(dpi, dpi);
    context.beginPath();
    // Draw horizontal lines
    for (var row = 0; row < worldRows + 1; row++) {
        // drawing (x, y) is transpose of (row, col)
        context.moveTo(0, row * CELL_SIZE); //x=0 at left edge
        context.lineTo(CELL_SIZE * worldCols, row * CELL_SIZE); // y=worldWidth * CELL_SIZE at right edge
    }
    // Draw vertical lines
    for (var col = 0; col < worldCols + 1; col++) {
        context.moveTo(col * CELL_SIZE, 0); //y=0 at top edge
        context.lineTo(col * CELL_SIZE, CELL_SIZE * worldRows); // x=worldHeight * CELL_SIZE at bottom edge
    }
    context.stroke();
}
function drawCell(_a) {
    var context = _a.context, row = _a.row, col = _a.col;
    context.beginPath();
    context.fillRect(CELL_SIZE * col, CELL_SIZE * row, CELL_SIZE, CELL_SIZE);
    context.stroke();
}
function drawCells(_a) {
    var context = _a.context, cells = _a.cells;
    context.beginPath();
    for (var _i = 0, cells_1 = cells; _i < cells_1.length; _i++) {
        var _b = cells_1[_i], row = _b[0], col = _b[1];
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
function drawSnake(_a) {
    var wasm = _a.wasm, context = _a.context, world = _a.world;
    var snakeCellPtr = world.get_snake_cells(); // e.g. 1179632 a `Number` type
    var snakeLength = world.snake_length();
    var snakeCellsRaw = new Uint32Array(// access WASM memory in JS directly
    wasm.memory.buffer, // `wasm` is returned by init, type `InitInput` or `InitOutput`
    snakeCellPtr, // ptr returned by Rust
    snakeLength * 2 // each snake cell occupies 2 bytes: (row, col)
    ); // extract `snakeLength` bytes from memory buffer at the address of `snakeCellPtr`
    for (var i = snakeLength - 1; i >= 0; i--) {
        context.fillStyle = i == 0 ? "#344e41" : "#a3b18a"; // head: dark tone, body: light tone
        context.beginPath();
        var row = snakeCellsRaw[i * 2];
        var col = snakeCellsRaw[i * 2 + 1];
        context.fillRect(CELL_SIZE * col, CELL_SIZE * row, CELL_SIZE, CELL_SIZE);
    }
    context.stroke();
}
function drawRewardCell(_a) {
    var context = _a.context, world = _a.world;
    var _b = world.get_reward_cell(), row = _b.row, col = _b.col;
    context.fillStyle = "#f5b700";
    context.beginPath();
    context.fillRect(CELL_SIZE * col, CELL_SIZE * row, CELL_SIZE, CELL_SIZE);
    context.stroke();
}
function drawGameStatus(world) {
    $gameStatus.textContent = statusToText(world.status);
    $gamePoints.textContent = String(world.points);
    switch (world.status) {
        case snake_game__WEBPACK_IMPORTED_MODULE_0__.GameStatus.Won:
        case snake_game__WEBPACK_IMPORTED_MODULE_0__.GameStatus.Lost:
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
function paint(_a) {
    var canvas = _a.canvas, context = _a.context, world = _a.world, wasm = _a.wasm;
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawWorld({ canvas: canvas, context: context, world: world });
    drawRewardCell({ canvas: canvas, context: context, world: world, wasm: wasm });
    drawSnake({ canvas: canvas, context: context, world: world, wasm: wasm });
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
function init_main() {
    return __awaiter(this, void 0, void 0, function () {
        function loop_play() {
            if (world.status === snake_game__WEBPACK_IMPORTED_MODULE_0__.GameStatus.Won || world.status === snake_game__WEBPACK_IMPORTED_MODULE_0__.GameStatus.Lost) {
                return; // IMPORTANT: exit game loop if win or loss
            }
            var FPS = 4;
            timeout = window.setTimeout(function () {
                world.step();
                paint({ canvas: canvas, context: context, world: world, wasm: wasm });
                // method takes callback to invoked before next browser repaint
                raf = window.requestAnimationFrame(loop_play);
            }, 1000 / FPS);
        }
        var wasm, canvas, world, context, timeout, raf;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0,snake_game__WEBPACK_IMPORTED_MODULE_0__["default"])()];
                case 1:
                    wasm = _a.sent();
                    canvas = q("#canvas");
                    world = snake_game__WEBPACK_IMPORTED_MODULE_0__.World.from(WORLD_ROWS, WORLD_COLS, SNAKE_SPAWN_ROW, SNAKE_SPAWN_COL);
                    context = canvas.getContext("2d");
                    // console.log(world.num_rows); // will print `undefined` since `num_rows` is a private field
                    document.addEventListener("keydown", function (e) {
                        switch (e.code) {
                            case "ArrowLeft":
                                world.change_snake_dir(snake_game__WEBPACK_IMPORTED_MODULE_0__.Direction.Left);
                                break;
                            case "ArrowRight":
                                world.change_snake_dir(snake_game__WEBPACK_IMPORTED_MODULE_0__.Direction.Right);
                                break;
                            case "ArrowUp":
                                world.change_snake_dir(snake_game__WEBPACK_IMPORTED_MODULE_0__.Direction.Up);
                                break;
                            case "ArrowDown":
                                world.change_snake_dir(snake_game__WEBPACK_IMPORTED_MODULE_0__.Direction.Down);
                                break;
                        }
                    });
                    $gameControlBtn.addEventListener("click", function (_) {
                        switch (world.status) {
                            case snake_game__WEBPACK_IMPORTED_MODULE_0__.GameStatus.Played:
                            case snake_game__WEBPACK_IMPORTED_MODULE_0__.GameStatus.Won:
                            case snake_game__WEBPACK_IMPORTED_MODULE_0__.GameStatus.Lost:
                                context.reset();
                                window.cancelAnimationFrame(raf);
                                window.clearTimeout(timeout);
                                $gameStatus.textContent = statusToText(null);
                                world = snake_game__WEBPACK_IMPORTED_MODULE_0__.World.from(WORLD_ROWS, WORLD_COLS, SNAKE_SPAWN_ROW, SNAKE_SPAWN_COL); // reset world
                                $gameControlBtn.textContent = "Play";
                                paint({ canvas: canvas, world: world, context: context, wasm: wasm });
                                return;
                            default:
                                $gameStatus.textContent = statusToText(snake_game__WEBPACK_IMPORTED_MODULE_0__.GameStatus.Played);
                                $gameControlBtn.textContent = "Reset";
                                world.start_game();
                                loop_play();
                                return;
                        }
                    });
                    $gameStatus.textContent = statusToText(null);
                    paint({ canvas: canvas, world: world, context: context, wasm: wasm });
                    return [2 /*return*/];
            }
        });
    });
}
init_main();


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXhfdHMuYm9vdHN0cmFwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBOEY7O0FBRTlGOztBQUVBLDJGQUEyRiw4QkFBOEIsTUFBTSxnQkFBZ0IsNkNBQTZDOztBQUU1TCwwQ0FBMEM7O0FBRTFDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLFVBQVU7QUFDVjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLFFBQVEsa0JBQWtCO0FBQzFCOztBQUVPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSxrQkFBa0I7QUFDMUI7O0FBRU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxtQkFBbUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGVBQWUsUUFBUTtBQUN2QixlQUFlLFFBQVE7QUFDdkIsZUFBZSxRQUFRO0FBQ3ZCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxXQUFXO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7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QTtBQUNBLHdDQUF3Qyw2Q0FBSyxpRUFBaUU7QUFDOUc7QUFDQSx3Q0FBd0MsNERBQTREO0FBQ3BHO0FBQ0E7QUFDQSx1RUFBdUUsa0RBQVU7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLDRCQUE0Qiw0REFBNEQ7QUFDeEY7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3d3dy8uLi9wa2cvc25ha2VfZ2FtZS5qcyIsIndlYnBhY2s6Ly93d3cvLi4vcGtnL3NuaXBwZXRzL3NuYWtlX2dhbWUtMDI3ZjVjZDJkNjRkMjg4NS93d3cvdXRpbHMvcmFuZG9tLmpzIiwid2VicGFjazovL3d3dy8uL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFJhbmRvbUluUmFuZ2UgfSBmcm9tICcuL3NuaXBwZXRzL3NuYWtlX2dhbWUtMDI3ZjVjZDJkNjRkMjg4NS93d3cvdXRpbHMvcmFuZG9tLmpzJztcblxubGV0IHdhc207XG5cbmNvbnN0IGNhY2hlZFRleHREZWNvZGVyID0gKHR5cGVvZiBUZXh0RGVjb2RlciAhPT0gJ3VuZGVmaW5lZCcgPyBuZXcgVGV4dERlY29kZXIoJ3V0Zi04JywgeyBpZ25vcmVCT006IHRydWUsIGZhdGFsOiB0cnVlIH0pIDogeyBkZWNvZGU6ICgpID0+IHsgdGhyb3cgRXJyb3IoJ1RleHREZWNvZGVyIG5vdCBhdmFpbGFibGUnKSB9IH0gKTtcblxuaWYgKHR5cGVvZiBUZXh0RGVjb2RlciAhPT0gJ3VuZGVmaW5lZCcpIHsgY2FjaGVkVGV4dERlY29kZXIuZGVjb2RlKCk7IH07XG5cbmxldCBjYWNoZWRVaW50OEFycmF5TWVtb3J5MCA9IG51bGw7XG5cbmZ1bmN0aW9uIGdldFVpbnQ4QXJyYXlNZW1vcnkwKCkge1xuICAgIGlmIChjYWNoZWRVaW50OEFycmF5TWVtb3J5MCA9PT0gbnVsbCB8fCBjYWNoZWRVaW50OEFycmF5TWVtb3J5MC5ieXRlTGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNhY2hlZFVpbnQ4QXJyYXlNZW1vcnkwID0gbmV3IFVpbnQ4QXJyYXkod2FzbS5tZW1vcnkuYnVmZmVyKTtcbiAgICB9XG4gICAgcmV0dXJuIGNhY2hlZFVpbnQ4QXJyYXlNZW1vcnkwO1xufVxuXG5mdW5jdGlvbiBnZXRTdHJpbmdGcm9tV2FzbTAocHRyLCBsZW4pIHtcbiAgICBwdHIgPSBwdHIgPj4+IDA7XG4gICAgcmV0dXJuIGNhY2hlZFRleHREZWNvZGVyLmRlY29kZShnZXRVaW50OEFycmF5TWVtb3J5MCgpLnN1YmFycmF5KHB0ciwgcHRyICsgbGVuKSk7XG59XG5cbmZ1bmN0aW9uIGlzTGlrZU5vbmUoeCkge1xuICAgIHJldHVybiB4ID09PSB1bmRlZmluZWQgfHwgeCA9PT0gbnVsbDtcbn1cbi8qKlxuICpcbiAqICogUGFydGlhbEVxIGVxdWFsaXR5IG11c3QgYmUgKGZvciBhbGwgYSwgYiBhbmQgYyk6XG4gKiAqIC0gc3ltbWV0cmljOiBhID09IGIgaW1wbGllcyBiID09IGE7IGFuZFxuICogKiAtIHRyYW5zaXRpdmU6IGEgPT0gYiBhbmQgYiA9PSBjIGltcGxpZXMgYSA9PSBjLlxuICogKiAqKlRyYWl0IEVxIGluaGVyaXRzIHRyYWl0IFBhcnRpYWxFcS4gQWxsIGl0IGRvZXMgaXMgcmVmaW5lIHRoZSBjb250cmFjdC4gYSA9PSBhIDogdmFsaWxkIGFzc3VtaW5nIHR5cGUgQSBpbXBsZW1lbnRzIEVxKipcbiAqXG4gKiBAZW51bSB7MCB8IDEgfCAyIHwgM31cbiAqL1xuZXhwb3J0IGNvbnN0IERpcmVjdGlvbiA9IE9iamVjdC5mcmVlemUoe1xuICAgIFVwOiAwLCBcIjBcIjogXCJVcFwiLFxuICAgIERvd246IDEsIFwiMVwiOiBcIkRvd25cIixcbiAgICBMZWZ0OiAyLCBcIjJcIjogXCJMZWZ0XCIsXG4gICAgUmlnaHQ6IDMsIFwiM1wiOiBcIlJpZ2h0XCIsXG59KTtcbi8qKlxuICogQGVudW0gezAgfCAxIHwgMn1cbiAqL1xuZXhwb3J0IGNvbnN0IEdhbWVTdGF0dXMgPSBPYmplY3QuZnJlZXplKHtcbiAgICBXb246IDAsIFwiMFwiOiBcIldvblwiLFxuICAgIExvc3Q6IDEsIFwiMVwiOiBcIkxvc3RcIixcbiAgICBQbGF5ZWQ6IDIsIFwiMlwiOiBcIlBsYXllZFwiLFxufSk7XG5cbmNvbnN0IENvb3JkaW5hdGVGaW5hbGl6YXRpb24gPSAodHlwZW9mIEZpbmFsaXphdGlvblJlZ2lzdHJ5ID09PSAndW5kZWZpbmVkJylcbiAgICA/IHsgcmVnaXN0ZXI6ICgpID0+IHt9LCB1bnJlZ2lzdGVyOiAoKSA9PiB7fSB9XG4gICAgOiBuZXcgRmluYWxpemF0aW9uUmVnaXN0cnkocHRyID0+IHdhc20uX193YmdfY29vcmRpbmF0ZV9mcmVlKHB0ciA+Pj4gMCwgMSkpO1xuXG5leHBvcnQgY2xhc3MgQ29vcmRpbmF0ZSB7XG5cbiAgICBzdGF0aWMgX193cmFwKHB0cikge1xuICAgICAgICBwdHIgPSBwdHIgPj4+IDA7XG4gICAgICAgIGNvbnN0IG9iaiA9IE9iamVjdC5jcmVhdGUoQ29vcmRpbmF0ZS5wcm90b3R5cGUpO1xuICAgICAgICBvYmouX193YmdfcHRyID0gcHRyO1xuICAgICAgICBDb29yZGluYXRlRmluYWxpemF0aW9uLnJlZ2lzdGVyKG9iaiwgb2JqLl9fd2JnX3B0ciwgb2JqKTtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG5cbiAgICBfX2Rlc3Ryb3lfaW50b19yYXcoKSB7XG4gICAgICAgIGNvbnN0IHB0ciA9IHRoaXMuX193YmdfcHRyO1xuICAgICAgICB0aGlzLl9fd2JnX3B0ciA9IDA7XG4gICAgICAgIENvb3JkaW5hdGVGaW5hbGl6YXRpb24udW5yZWdpc3Rlcih0aGlzKTtcbiAgICAgICAgcmV0dXJuIHB0cjtcbiAgICB9XG5cbiAgICBmcmVlKCkge1xuICAgICAgICBjb25zdCBwdHIgPSB0aGlzLl9fZGVzdHJveV9pbnRvX3JhdygpO1xuICAgICAgICB3YXNtLl9fd2JnX2Nvb3JkaW5hdGVfZnJlZShwdHIsIDApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGdldCByb3coKSB7XG4gICAgICAgIGNvbnN0IHJldCA9IHdhc20uX193YmdfZ2V0X2Nvb3JkaW5hdGVfcm93KHRoaXMuX193YmdfcHRyKTtcbiAgICAgICAgcmV0dXJuIHJldCA+Pj4gMDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGFyZzBcbiAgICAgKi9cbiAgICBzZXQgcm93KGFyZzApIHtcbiAgICAgICAgd2FzbS5fX3diZ19zZXRfY29vcmRpbmF0ZV9yb3codGhpcy5fX3diZ19wdHIsIGFyZzApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGdldCBjb2woKSB7XG4gICAgICAgIGNvbnN0IHJldCA9IHdhc20uX193YmdfZ2V0X2Nvb3JkaW5hdGVfY29sKHRoaXMuX193YmdfcHRyKTtcbiAgICAgICAgcmV0dXJuIHJldCA+Pj4gMDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGFyZzBcbiAgICAgKi9cbiAgICBzZXQgY29sKGFyZzApIHtcbiAgICAgICAgd2FzbS5fX3diZ19zZXRfY29vcmRpbmF0ZV9jb2wodGhpcy5fX3diZ19wdHIsIGFyZzApO1xuICAgIH1cbn1cblxuY29uc3QgV29ybGRGaW5hbGl6YXRpb24gPSAodHlwZW9mIEZpbmFsaXphdGlvblJlZ2lzdHJ5ID09PSAndW5kZWZpbmVkJylcbiAgICA/IHsgcmVnaXN0ZXI6ICgpID0+IHt9LCB1bnJlZ2lzdGVyOiAoKSA9PiB7fSB9XG4gICAgOiBuZXcgRmluYWxpemF0aW9uUmVnaXN0cnkocHRyID0+IHdhc20uX193Ymdfd29ybGRfZnJlZShwdHIgPj4+IDAsIDEpKTtcblxuZXhwb3J0IGNsYXNzIFdvcmxkIHtcblxuICAgIHN0YXRpYyBfX3dyYXAocHRyKSB7XG4gICAgICAgIHB0ciA9IHB0ciA+Pj4gMDtcbiAgICAgICAgY29uc3Qgb2JqID0gT2JqZWN0LmNyZWF0ZShXb3JsZC5wcm90b3R5cGUpO1xuICAgICAgICBvYmouX193YmdfcHRyID0gcHRyO1xuICAgICAgICBXb3JsZEZpbmFsaXphdGlvbi5yZWdpc3RlcihvYmosIG9iai5fX3diZ19wdHIsIG9iaik7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuXG4gICAgX19kZXN0cm95X2ludG9fcmF3KCkge1xuICAgICAgICBjb25zdCBwdHIgPSB0aGlzLl9fd2JnX3B0cjtcbiAgICAgICAgdGhpcy5fX3diZ19wdHIgPSAwO1xuICAgICAgICBXb3JsZEZpbmFsaXphdGlvbi51bnJlZ2lzdGVyKHRoaXMpO1xuICAgICAgICByZXR1cm4gcHRyO1xuICAgIH1cblxuICAgIGZyZWUoKSB7XG4gICAgICAgIGNvbnN0IHB0ciA9IHRoaXMuX19kZXN0cm95X2ludG9fcmF3KCk7XG4gICAgICAgIHdhc20uX193Ymdfd29ybGRfZnJlZShwdHIsIDApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7R2FtZVN0YXR1cyB8IHVuZGVmaW5lZH1cbiAgICAgKi9cbiAgICBnZXQgc3RhdHVzKCkge1xuICAgICAgICBjb25zdCByZXQgPSB3YXNtLl9fd2JnX2dldF93b3JsZF9zdGF0dXModGhpcy5fX3diZ19wdHIpO1xuICAgICAgICByZXR1cm4gcmV0ID09PSAzID8gdW5kZWZpbmVkIDogcmV0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0dhbWVTdGF0dXMgfCBudWxsfSBbYXJnMF1cbiAgICAgKi9cbiAgICBzZXQgc3RhdHVzKGFyZzApIHtcbiAgICAgICAgd2FzbS5fX3diZ19zZXRfd29ybGRfc3RhdHVzKHRoaXMuX193YmdfcHRyLCBpc0xpa2VOb25lKGFyZzApID8gMyA6IGFyZzApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGdldCBwb2ludHMoKSB7XG4gICAgICAgIGNvbnN0IHJldCA9IHdhc20uX193YmdfZ2V0X3dvcmxkX3BvaW50cyh0aGlzLl9fd2JnX3B0cik7XG4gICAgICAgIHJldHVybiByZXQgPj4+IDA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhcmcwXG4gICAgICovXG4gICAgc2V0IHBvaW50cyhhcmcwKSB7XG4gICAgICAgIHdhc20uX193Ymdfc2V0X3dvcmxkX3BvaW50cyh0aGlzLl9fd2JnX3B0ciwgYXJnMCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgZ2FtZSB3b3JsZCB3aXRoIGRlZmF1bHQgZGltZW5zaW9ucyAoOHg4KSBhbmQgYSBzbmFrZSBzdGFydGluZyBhdCBwb3NpdGlvbiAoMSwyKS5cbiAgICAgKlxuICAgICAqICMgUmV0dXJuc1xuICAgICAqIEEgbmV3IFdvcmxkIGluc3RhbmNlIHdpdGggZGVmYXVsdCBzZXR0aW5nc1xuICAgICAqIEByZXR1cm5zIHtXb3JsZH1cbiAgICAgKi9cbiAgICBzdGF0aWMgbmV3KCkge1xuICAgICAgICBjb25zdCByZXQgPSB3YXNtLndvcmxkX25ldygpO1xuICAgICAgICByZXR1cm4gV29ybGQuX193cmFwKHJldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgZ2FtZSB3b3JsZCB3aXRoIGN1c3RvbSBkaW1lbnNpb25zIGFuZCBzbmFrZSBzdGFydGluZyBwb3NpdGlvbi5cbiAgICAgKlxuICAgICAqICMgQXJndW1lbnRzXG4gICAgICogKiBgd29ybGRfbnVtX3Jvd3NgIC0gTnVtYmVyIG9mIHJvd3MgaW4gdGhlIGdhbWUgd29ybGRcbiAgICAgKiAqIGB3b3JsZF9udW1fY29sc2AgLSBOdW1iZXIgb2YgY29sdW1ucyBpbiB0aGUgZ2FtZSB3b3JsZFxuICAgICAqICogYHNuYWtlX3Jvd2AgLSBJbml0aWFsIHJvdyBwb3NpdGlvbiBvZiB0aGUgc25ha2VcbiAgICAgKiAqIGBzbmFrZV9jb2xgIC0gSW5pdGlhbCBjb2x1bW4gcG9zaXRpb24gb2YgdGhlIHNuYWtlXG4gICAgICpcbiAgICAgKiAjIFJldHVybnNcbiAgICAgKiBBIG5ldyBXb3JsZCBpbnN0YW5jZSB3aXRoIHRoZSBzcGVjaWZpZWQgcGFyYW1ldGVyc1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3b3JsZF9udW1fcm93c1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3b3JsZF9udW1fY29sc1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzbmFrZV9yb3dcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc25ha2VfY29sXG4gICAgICogQHJldHVybnMge1dvcmxkfVxuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tKHdvcmxkX251bV9yb3dzLCB3b3JsZF9udW1fY29scywgc25ha2Vfcm93LCBzbmFrZV9jb2wpIHtcbiAgICAgICAgY29uc3QgcmV0ID0gd2FzbS53b3JsZF9mcm9tKHdvcmxkX251bV9yb3dzLCB3b3JsZF9udW1fY29scywgc25ha2Vfcm93LCBzbmFrZV9jb2wpO1xuICAgICAgICByZXR1cm4gV29ybGQuX193cmFwKHJldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyB0aGUgZ2FtZSBieSBzZXR0aW5nIHRoZSBnYW1lIHN0YXR1cyB0byBQbGF5ZWQuXG4gICAgICovXG4gICAgc3RhcnRfZ2FtZSgpIHtcbiAgICAgICAgd2FzbS53b3JsZF9zdGFydF9nYW1lKHRoaXMuX193YmdfcHRyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIHJvd3MgaW4gdGhlIGdhbWUgd29ybGQuXG4gICAgICpcbiAgICAgKiAjIFJldHVybnNcbiAgICAgKiBUaGUgbnVtYmVyIG9mIHJvd3MgYXMgYSB1c2l6ZVxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgZ2V0X251bV9yb3dzKCkge1xuICAgICAgICBjb25zdCByZXQgPSB3YXNtLndvcmxkX2dldF9udW1fcm93cyh0aGlzLl9fd2JnX3B0cik7XG4gICAgICAgIHJldHVybiByZXQgPj4+IDA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBjb2x1bW5zIGluIHRoZSBnYW1lIHdvcmxkLlxuICAgICAqXG4gICAgICogIyBSZXR1cm5zXG4gICAgICogVGhlIG51bWJlciBvZiBjb2x1bW5zIGFzIGEgdXNpemVcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGdldF9udW1fY29scygpIHtcbiAgICAgICAgY29uc3QgcmV0ID0gd2FzbS53b3JsZF9nZXRfbnVtX2NvbHModGhpcy5fX3diZ19wdHIpO1xuICAgICAgICByZXR1cm4gcmV0ID4+PiAwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IHBvc2l0aW9uIG9mIHRoZSBzbmFrZSdzIGhlYWQuXG4gICAgICpcbiAgICAgKiAjIFJldHVybnNcbiAgICAgKiBUaGUgQ29vcmRpbmF0ZSBvZiB0aGUgc25ha2UncyBoZWFkXG4gICAgICogQHJldHVybnMge0Nvb3JkaW5hdGV9XG4gICAgICovXG4gICAgZ2V0X3NuYWtlX2hlYWRfY29vcmQoKSB7XG4gICAgICAgIGNvbnN0IHJldCA9IHdhc20ud29ybGRfZ2V0X3NuYWtlX2hlYWRfY29vcmQodGhpcy5fX3diZ19wdHIpO1xuICAgICAgICByZXR1cm4gQ29vcmRpbmF0ZS5fX3dyYXAocmV0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY3VycmVudCBwb3NpdGlvbiBvZiB0aGUgcmV3YXJkIGNlbGwuXG4gICAgICpcbiAgICAgKiAjIFJldHVybnNcbiAgICAgKiBUaGUgQ29vcmRpbmF0ZSBvZiB0aGUgcmV3YXJkIGNlbGxcbiAgICAgKiBAcmV0dXJucyB7Q29vcmRpbmF0ZX1cbiAgICAgKi9cbiAgICBnZXRfcmV3YXJkX2NlbGwoKSB7XG4gICAgICAgIGNvbnN0IHJldCA9IHdhc20ud29ybGRfZ2V0X3Jld2FyZF9jZWxsKHRoaXMuX193YmdfcHRyKTtcbiAgICAgICAgcmV0dXJuIENvb3JkaW5hdGUuX193cmFwKHJldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoYW5nZXMgdGhlIGRpcmVjdGlvbiBvZiB0aGUgc25ha2UncyBtb3ZlbWVudC5cbiAgICAgKiBQcmV2ZW50cyAxODAtZGVncmVlIHR1cm5zIChzbmFrZSBjYW5ub3QgdHVybiBiYWNrIG9uIGl0c2VsZikuXG4gICAgICpcbiAgICAgKiAjIEFyZ3VtZW50c1xuICAgICAqICogYGRpcmVjdGlvbmAgLSBUaGUgbmV3IGRpcmVjdGlvbiB0byBtb3ZlXG4gICAgICogQHBhcmFtIHtEaXJlY3Rpb259IGRpcmVjdGlvblxuICAgICAqL1xuICAgIGNoYW5nZV9zbmFrZV9kaXIoZGlyZWN0aW9uKSB7XG4gICAgICAgIHdhc20ud29ybGRfY2hhbmdlX3NuYWtlX2Rpcih0aGlzLl9fd2JnX3B0ciwgZGlyZWN0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgZ2FtZSBzdGF0ZSBieSBtb3ZpbmcgdGhlIHNuYWtlIGFuZCBjaGVja2luZyBmb3IgY29sbGlzaW9ucyBvciByZXdhcmRzLlxuICAgICAqIFRoaXMgbWV0aG9kOlxuICAgICAqIC0gTW92ZXMgdGhlIHNuYWtlIGluIGl0cyBjdXJyZW50IGRpcmVjdGlvblxuICAgICAqIC0gQ2hlY2tzIGZvciBzZWxmLWNvbGxpc2lvblxuICAgICAqIC0gQ2hlY2tzIGlmIHRoZSBzbmFrZSBoYXMgZWF0ZW4gdGhlIHJld2FyZFxuICAgICAqIC0gVXBkYXRlcyBnYW1lIHN0YXR1cyBiYXNlZCBvbiB3aW4vbG9zZSBjb25kaXRpb25zXG4gICAgICovXG4gICAgc3RlcCgpIHtcbiAgICAgICAgd2FzbS53b3JsZF9zdGVwKHRoaXMuX193YmdfcHRyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHJhdyBwb2ludGVyIHRvIHRoZSBzbmFrZSdzIGJvZHkgY2VsbHMuXG4gICAgICogVGhpcyBpcyBhIHdvcmthcm91bmQgZm9yIFJ1c3QncyBib3Jyb3dpbmcgcnVsZXMgd2hlbiBpbnRlcmZhY2luZyB3aXRoIEphdmFTY3JpcHQuXG4gICAgICpcbiAgICAgKiAjIFJldHVybnNcbiAgICAgKiBBIHJhdyBwb2ludGVyIHRvIHRoZSBmaXJzdCBDb29yZGluYXRlIGluIHRoZSBzbmFrZSdzIGJvZHlcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGdldF9zbmFrZV9jZWxscygpIHtcbiAgICAgICAgY29uc3QgcmV0ID0gd2FzbS53b3JsZF9nZXRfc25ha2VfY2VsbHModGhpcy5fX3diZ19wdHIpO1xuICAgICAgICByZXR1cm4gcmV0ID4+PiAwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IGxlbmd0aCBvZiB0aGUgc25ha2UuXG4gICAgICpcbiAgICAgKiAjIFJldHVybnNcbiAgICAgKiBUaGUgbnVtYmVyIG9mIGNlbGxzIGluIHRoZSBzbmFrZSdzIGJvZHlcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIHNuYWtlX2xlbmd0aCgpIHtcbiAgICAgICAgY29uc3QgcmV0ID0gd2FzbS53b3JsZF9zbmFrZV9sZW5ndGgodGhpcy5fX3diZ19wdHIpO1xuICAgICAgICByZXR1cm4gcmV0ID4+PiAwO1xuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gX193YmdfbG9hZChtb2R1bGUsIGltcG9ydHMpIHtcbiAgICBpZiAodHlwZW9mIFJlc3BvbnNlID09PSAnZnVuY3Rpb24nICYmIG1vZHVsZSBpbnN0YW5jZW9mIFJlc3BvbnNlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgV2ViQXNzZW1ibHkuaW5zdGFudGlhdGVTdHJlYW1pbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlU3RyZWFtaW5nKG1vZHVsZSwgaW1wb3J0cyk7XG5cbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAobW9kdWxlLmhlYWRlcnMuZ2V0KCdDb250ZW50LVR5cGUnKSAhPSAnYXBwbGljYXRpb24vd2FzbScpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiYFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlU3RyZWFtaW5nYCBmYWlsZWQgYmVjYXVzZSB5b3VyIHNlcnZlciBkb2VzIG5vdCBzZXJ2ZSBXYXNtIHdpdGggYGFwcGxpY2F0aW9uL3dhc21gIE1JTUUgdHlwZS4gRmFsbGluZyBiYWNrIHRvIGBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZWAgd2hpY2ggaXMgc2xvd2VyLiBPcmlnaW5hbCBlcnJvcjpcXG5cIiwgZSk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGJ5dGVzID0gYXdhaXQgbW9kdWxlLmFycmF5QnVmZmVyKCk7XG4gICAgICAgIHJldHVybiBhd2FpdCBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZShieXRlcywgaW1wb3J0cyk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBpbnN0YW5jZSA9IGF3YWl0IFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlKG1vZHVsZSwgaW1wb3J0cyk7XG5cbiAgICAgICAgaWYgKGluc3RhbmNlIGluc3RhbmNlb2YgV2ViQXNzZW1ibHkuSW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGluc3RhbmNlLCBtb2R1bGUgfTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBfX3diZ19nZXRfaW1wb3J0cygpIHtcbiAgICBjb25zdCBpbXBvcnRzID0ge307XG4gICAgaW1wb3J0cy53YmcgPSB7fTtcbiAgICBpbXBvcnRzLndiZy5fX3diZ19nZXRSYW5kb21JblJhbmdlX2VkZTdkNDgyMzA0MzYyNzIgPSBmdW5jdGlvbihhcmcwLCBhcmcxKSB7XG4gICAgICAgIGNvbnN0IHJldCA9IGdldFJhbmRvbUluUmFuZ2UoYXJnMCA+Pj4gMCwgYXJnMSA+Pj4gMCk7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfTtcbiAgICBpbXBvcnRzLndiZy5fX3diaW5kZ2VuX2luaXRfZXh0ZXJucmVmX3RhYmxlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHRhYmxlID0gd2FzbS5fX3diaW5kZ2VuX2V4cG9ydF8wO1xuICAgICAgICBjb25zdCBvZmZzZXQgPSB0YWJsZS5ncm93KDQpO1xuICAgICAgICB0YWJsZS5zZXQoMCwgdW5kZWZpbmVkKTtcbiAgICAgICAgdGFibGUuc2V0KG9mZnNldCArIDAsIHVuZGVmaW5lZCk7XG4gICAgICAgIHRhYmxlLnNldChvZmZzZXQgKyAxLCBudWxsKTtcbiAgICAgICAgdGFibGUuc2V0KG9mZnNldCArIDIsIHRydWUpO1xuICAgICAgICB0YWJsZS5zZXQob2Zmc2V0ICsgMywgZmFsc2UpO1xuICAgICAgICA7XG4gICAgfTtcbiAgICBpbXBvcnRzLndiZy5fX3diaW5kZ2VuX3Rocm93ID0gZnVuY3Rpb24oYXJnMCwgYXJnMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZ2V0U3RyaW5nRnJvbVdhc20wKGFyZzAsIGFyZzEpKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGltcG9ydHM7XG59XG5cbmZ1bmN0aW9uIF9fd2JnX2luaXRfbWVtb3J5KGltcG9ydHMsIG1lbW9yeSkge1xuXG59XG5cbmZ1bmN0aW9uIF9fd2JnX2ZpbmFsaXplX2luaXQoaW5zdGFuY2UsIG1vZHVsZSkge1xuICAgIHdhc20gPSBpbnN0YW5jZS5leHBvcnRzO1xuICAgIF9fd2JnX2luaXQuX193YmluZGdlbl93YXNtX21vZHVsZSA9IG1vZHVsZTtcbiAgICBjYWNoZWRVaW50OEFycmF5TWVtb3J5MCA9IG51bGw7XG5cblxuICAgIHdhc20uX193YmluZGdlbl9zdGFydCgpO1xuICAgIHJldHVybiB3YXNtO1xufVxuXG5mdW5jdGlvbiBpbml0U3luYyhtb2R1bGUpIHtcbiAgICBpZiAod2FzbSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gd2FzbTtcblxuXG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmIChPYmplY3QuZ2V0UHJvdG90eXBlT2YobW9kdWxlKSA9PT0gT2JqZWN0LnByb3RvdHlwZSkge1xuICAgICAgICAgICAgKHttb2R1bGV9ID0gbW9kdWxlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCd1c2luZyBkZXByZWNhdGVkIHBhcmFtZXRlcnMgZm9yIGBpbml0U3luYygpYDsgcGFzcyBhIHNpbmdsZSBvYmplY3QgaW5zdGVhZCcpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBpbXBvcnRzID0gX193YmdfZ2V0X2ltcG9ydHMoKTtcblxuICAgIF9fd2JnX2luaXRfbWVtb3J5KGltcG9ydHMpO1xuXG4gICAgaWYgKCEobW9kdWxlIGluc3RhbmNlb2YgV2ViQXNzZW1ibHkuTW9kdWxlKSkge1xuICAgICAgICBtb2R1bGUgPSBuZXcgV2ViQXNzZW1ibHkuTW9kdWxlKG1vZHVsZSk7XG4gICAgfVxuXG4gICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgV2ViQXNzZW1ibHkuSW5zdGFuY2UobW9kdWxlLCBpbXBvcnRzKTtcblxuICAgIHJldHVybiBfX3diZ19maW5hbGl6ZV9pbml0KGluc3RhbmNlLCBtb2R1bGUpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBfX3diZ19pbml0KG1vZHVsZV9vcl9wYXRoKSB7XG4gICAgaWYgKHdhc20gIT09IHVuZGVmaW5lZCkgcmV0dXJuIHdhc207XG5cblxuICAgIGlmICh0eXBlb2YgbW9kdWxlX29yX3BhdGggIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmIChPYmplY3QuZ2V0UHJvdG90eXBlT2YobW9kdWxlX29yX3BhdGgpID09PSBPYmplY3QucHJvdG90eXBlKSB7XG4gICAgICAgICAgICAoe21vZHVsZV9vcl9wYXRofSA9IG1vZHVsZV9vcl9wYXRoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCd1c2luZyBkZXByZWNhdGVkIHBhcmFtZXRlcnMgZm9yIHRoZSBpbml0aWFsaXphdGlvbiBmdW5jdGlvbjsgcGFzcyBhIHNpbmdsZSBvYmplY3QgaW5zdGVhZCcpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG1vZHVsZV9vcl9wYXRoID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBtb2R1bGVfb3JfcGF0aCA9IG5ldyBVUkwoJ3NuYWtlX2dhbWVfYmcud2FzbScsIGltcG9ydC5tZXRhLnVybCk7XG4gICAgfVxuICAgIGNvbnN0IGltcG9ydHMgPSBfX3diZ19nZXRfaW1wb3J0cygpO1xuXG4gICAgaWYgKHR5cGVvZiBtb2R1bGVfb3JfcGF0aCA9PT0gJ3N0cmluZycgfHwgKHR5cGVvZiBSZXF1ZXN0ID09PSAnZnVuY3Rpb24nICYmIG1vZHVsZV9vcl9wYXRoIGluc3RhbmNlb2YgUmVxdWVzdCkgfHwgKHR5cGVvZiBVUkwgPT09ICdmdW5jdGlvbicgJiYgbW9kdWxlX29yX3BhdGggaW5zdGFuY2VvZiBVUkwpKSB7XG4gICAgICAgIG1vZHVsZV9vcl9wYXRoID0gZmV0Y2gobW9kdWxlX29yX3BhdGgpO1xuICAgIH1cblxuICAgIF9fd2JnX2luaXRfbWVtb3J5KGltcG9ydHMpO1xuXG4gICAgY29uc3QgeyBpbnN0YW5jZSwgbW9kdWxlIH0gPSBhd2FpdCBfX3diZ19sb2FkKGF3YWl0IG1vZHVsZV9vcl9wYXRoLCBpbXBvcnRzKTtcblxuICAgIHJldHVybiBfX3diZ19maW5hbGl6ZV9pbml0KGluc3RhbmNlLCBtb2R1bGUpO1xufVxuXG5leHBvcnQgeyBpbml0U3luYyB9O1xuZXhwb3J0IGRlZmF1bHQgX193YmdfaW5pdDtcbiIsIi8qKlxuICogUmFuZG9tIG51bWJlciBnZW5lcmF0b3IgYmFzZWQgb24gW21pbiwgbWF4KVxuICogQHBhcmFtIHtudW1iZXJ9IG1pblxuICogQHBhcmFtIHtudW1iZXJ9IG1heFxuICogQHJldHVybnMge251bWJlcn0gYSByYW5kb20gaW50ZWdlciBiZXR3ZWVuIG1pbiAoaW5jbHVzaXZlKSBhbmQgbWF4IChleGNsdXNpdmUpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRSYW5kb21JblJhbmdlKG1pbiwgbWF4KSB7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW47XG59XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZyA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSk7XG4gICAgcmV0dXJuIGcubmV4dCA9IHZlcmIoMCksIGdbXCJ0aHJvd1wiXSA9IHZlcmIoMSksIGdbXCJyZXR1cm5cIl0gPSB2ZXJiKDIpLCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuaW1wb3J0IGluaXQsIHsgRGlyZWN0aW9uLCBXb3JsZCwgR2FtZVN0YXR1cyB9IGZyb20gXCJzbmFrZV9nYW1lXCI7XG52YXIgQ0VMTF9TSVpFID0gMTA7XG52YXIgV09STERfUk9XUyA9IDQ7IC8vICMgb2Ygcm93c1xudmFyIFdPUkxEX0NPTFMgPSA0OyAvLyAjIG9mIGNvbHVtbnNcbnZhciBTTkFLRV9TUEFXTl9ST1cgPSBEYXRlLm5vdygpICUgV09STERfUk9XUzsgLy8gdmVydGljYWwgcG9zaXRpb24gaW4gZ3JpZFxudmFyIFNOQUtFX1NQQVdOX0NPTCA9IERhdGUubm93KCkgJSBXT1JMRF9DT0xTOyAvLyBob3Jpem9udGFsIHBvc2l0aW9uIGluIGdyaWRcbnZhciBxID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvci5iaW5kKGRvY3VtZW50KTtcbnZhciAkZ2FtZVN0YXR1cyA9IHEoXCIjZ2FtZS1zdGF0dXNcIik7XG52YXIgJGdhbWVDb250cm9sQnRuID0gcShcIiNnYW1lLWNvbnRyb2wtYnRuXCIpO1xudmFyICRnYW1lUG9pbnRzID0gcShcIiNnYW1lLXBvaW50c1wiKTtcbmlmICghJGdhbWVDb250cm9sQnRuIHx8ICEkZ2FtZVN0YXR1cylcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBmaW5kIEhUTUwgZWxlbWVudDogY29udHJvbCBidXR0b24gb3Igc3RhdHVzIGZpZWxkXCIpO1xudmFyIHN0YXR1c1RvVGV4dCA9IGZ1bmN0aW9uIChzdGF0dXMpIHtcbiAgICBzd2l0Y2ggKHN0YXR1cykge1xuICAgICAgICBjYXNlIEdhbWVTdGF0dXMuV29uOlxuICAgICAgICAgICAgcmV0dXJuIFwiWW91IGhhdmUgd29uISDwn46JXCI7XG4gICAgICAgIGNhc2UgR2FtZVN0YXR1cy5Mb3N0OlxuICAgICAgICAgICAgcmV0dXJuIFwiWW91IGhhdmUgbG9zdCEg8J+YolwiO1xuICAgICAgICBjYXNlIEdhbWVTdGF0dXMuUGxheWVkOlxuICAgICAgICAgICAgcmV0dXJuIFwiUGxheWluZy4uLlwiO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIFwiR2FtZSBub3Qgc3RhcnRlZFwiO1xuICAgIH1cbn07XG4vKipcbiAqIERyYXdzIHRoZSBnYW1lIHdvcmxkIG9uIGEgY2FudmFzIGVsZW1lbnQgYnkgc2V0dGluZyBpdHMgZGltZW5zaW9uc1xuICogYmFzZWQgb24gdGhlIHdvcmxkJ3Mgd2lkdGggYW5kIGhlaWdodCwgYW5kIGRyYXdpbmcgZ3JpZCBsaW5lcy5cbiAqIEF1dG9tYXRpY2FsbHkgYWRqdXN0IGJhc2VkIG9uIFJldGluYSBTY3JlZW4gRFBJXG4gKiBTZWU6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS83NDU1NjY0OFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgLSBUaGUgcGFyYW1ldGVycyBmb3IgZHJhd2luZyB0aGUgd29ybGQuXG4gKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fSBwYXJhbXMuY2FudmFzIC0gVGhlIGNhbnZhcyBlbGVtZW50IHRvIGRyYXcgb24uXG4gKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gcGFyYW1zLmNvbnRleHQgLSBUaGUgMkQgcmVuZGVyaW5nIGNvbnRleHQgZm9yIHRoZSBkcmF3aW5nIHN1cmZhY2Ugb2YgdGhlIGNhbnZhcy5cbiAqIEBwYXJhbSB7V29ybGR9IHBhcmFtcy53b3JsZCAtIFRoZSBnYW1lIHdvcmxkIGluc3RhbmNlIHByb3ZpZGluZyBkaW1lbnNpb25zLlxuICovXG5mdW5jdGlvbiBkcmF3V29ybGQoX2EpIHtcbiAgICB2YXIgY2FudmFzID0gX2EuY2FudmFzLCBjb250ZXh0ID0gX2EuY29udGV4dCwgd29ybGQgPSBfYS53b3JsZDtcbiAgICB2YXIgZHBpID0gd2luZG93LmRldmljZVBpeGVsUmF0aW87XG4gICAgdmFyIHdvcmxkUm93cyA9IHdvcmxkLmdldF9udW1fcm93cygpO1xuICAgIHZhciB3b3JsZENvbHMgPSB3b3JsZC5nZXRfbnVtX2NvbHMoKTtcbiAgICBjYW52YXMud2lkdGggPSB3b3JsZENvbHMgKiBDRUxMX1NJWkUgKiBkcGk7XG4gICAgY2FudmFzLmhlaWdodCA9IHdvcmxkUm93cyAqIENFTExfU0laRSAqIGRwaTtcbiAgICBjYW52YXMuc3R5bGUud2lkdGggPSBcIlwiLmNvbmNhdCh3b3JsZENvbHMgKiBDRUxMX1NJWkUsIFwicHhcIik7XG4gICAgY2FudmFzLnN0eWxlLmhlaWdodCA9IFwiXCIuY29uY2F0KHdvcmxkUm93cyAqIENFTExfU0laRSwgXCJweFwiKTtcbiAgICBjb250ZXh0LnNjYWxlKGRwaSwgZHBpKTtcbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIC8vIERyYXcgaG9yaXpvbnRhbCBsaW5lc1xuICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IHdvcmxkUm93cyArIDE7IHJvdysrKSB7XG4gICAgICAgIC8vIGRyYXdpbmcgKHgsIHkpIGlzIHRyYW5zcG9zZSBvZiAocm93LCBjb2wpXG4gICAgICAgIGNvbnRleHQubW92ZVRvKDAsIHJvdyAqIENFTExfU0laRSk7IC8veD0wIGF0IGxlZnQgZWRnZVxuICAgICAgICBjb250ZXh0LmxpbmVUbyhDRUxMX1NJWkUgKiB3b3JsZENvbHMsIHJvdyAqIENFTExfU0laRSk7IC8vIHk9d29ybGRXaWR0aCAqIENFTExfU0laRSBhdCByaWdodCBlZGdlXG4gICAgfVxuICAgIC8vIERyYXcgdmVydGljYWwgbGluZXNcbiAgICBmb3IgKHZhciBjb2wgPSAwOyBjb2wgPCB3b3JsZENvbHMgKyAxOyBjb2wrKykge1xuICAgICAgICBjb250ZXh0Lm1vdmVUbyhjb2wgKiBDRUxMX1NJWkUsIDApOyAvL3k9MCBhdCB0b3AgZWRnZVxuICAgICAgICBjb250ZXh0LmxpbmVUbyhjb2wgKiBDRUxMX1NJWkUsIENFTExfU0laRSAqIHdvcmxkUm93cyk7IC8vIHg9d29ybGRIZWlnaHQgKiBDRUxMX1NJWkUgYXQgYm90dG9tIGVkZ2VcbiAgICB9XG4gICAgY29udGV4dC5zdHJva2UoKTtcbn1cbmZ1bmN0aW9uIGRyYXdDZWxsKF9hKSB7XG4gICAgdmFyIGNvbnRleHQgPSBfYS5jb250ZXh0LCByb3cgPSBfYS5yb3csIGNvbCA9IF9hLmNvbDtcbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIGNvbnRleHQuZmlsbFJlY3QoQ0VMTF9TSVpFICogY29sLCBDRUxMX1NJWkUgKiByb3csIENFTExfU0laRSwgQ0VMTF9TSVpFKTtcbiAgICBjb250ZXh0LnN0cm9rZSgpO1xufVxuZnVuY3Rpb24gZHJhd0NlbGxzKF9hKSB7XG4gICAgdmFyIGNvbnRleHQgPSBfYS5jb250ZXh0LCBjZWxscyA9IF9hLmNlbGxzO1xuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgZm9yICh2YXIgX2kgPSAwLCBjZWxsc18xID0gY2VsbHM7IF9pIDwgY2VsbHNfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFyIF9iID0gY2VsbHNfMVtfaV0sIHJvdyA9IF9iWzBdLCBjb2wgPSBfYlsxXTtcbiAgICAgICAgY29udGV4dC5maWxsUmVjdChDRUxMX1NJWkUgKiBjb2wsIENFTExfU0laRSAqIHJvdywgQ0VMTF9TSVpFLCBDRUxMX1NJWkUpO1xuICAgIH1cbiAgICBjb250ZXh0LnN0cm9rZSgpO1xufVxuLyoqXG4gKiBEcmF3cyB0aGUgc25ha2UncyBoZWFkIG9uIHRoZSBjYW52YXMuXG4gKlxuICogVGhpcyBmdW5jdGlvbiB1c2VzIHRoZSBwcm92aWRlZCBjYW52YXMgYW5kIGNvbnRleHQgdG8gZHJhdyB0aGUgc25ha2UncyBoZWFkXG4gKiBhdCBpdHMgY3VycmVudCBwb3NpdGlvbiBpbiB0aGUgd29ybGQuIFRoZSBwb3NpdGlvbiBpcyBkZXRlcm1pbmVkIGJ5IHRoZVxuICogc25ha2UncyBoZWFkIGNvb3JkaW5hdGVzIHJldHJpZXZlZCBmcm9tIHRoZSB3b3JsZCBvYmplY3QuIFRoZSBzaXplIG9mIGVhY2hcbiAqIGNlbGwgaXMgZGVmaW5lZCBieSB0aGUgQ0VMTF9TSVpFIGNvbnN0YW50LlxuICpcbiAqIEBwYXJhbSB7RHJhd2luZ0ZuUGFyYW1zfSBwYXJhbXMgLSBUaGUgcGFyYW1ldGVycyByZXF1aXJlZCBmb3IgZHJhd2luZyxcbiAqIGluY2x1ZGluZyB0aGUgY2FudmFzIGVsZW1lbnQsIGl0cyByZW5kZXJpbmcgY29udGV4dCwgYW5kIHRoZSB3b3JsZCBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGRyYXdTbmFrZShfYSkge1xuICAgIHZhciB3YXNtID0gX2Eud2FzbSwgY29udGV4dCA9IF9hLmNvbnRleHQsIHdvcmxkID0gX2Eud29ybGQ7XG4gICAgdmFyIHNuYWtlQ2VsbFB0ciA9IHdvcmxkLmdldF9zbmFrZV9jZWxscygpOyAvLyBlLmcuIDExNzk2MzIgYSBgTnVtYmVyYCB0eXBlXG4gICAgdmFyIHNuYWtlTGVuZ3RoID0gd29ybGQuc25ha2VfbGVuZ3RoKCk7XG4gICAgdmFyIHNuYWtlQ2VsbHNSYXcgPSBuZXcgVWludDMyQXJyYXkoLy8gYWNjZXNzIFdBU00gbWVtb3J5IGluIEpTIGRpcmVjdGx5XG4gICAgd2FzbS5tZW1vcnkuYnVmZmVyLCAvLyBgd2FzbWAgaXMgcmV0dXJuZWQgYnkgaW5pdCwgdHlwZSBgSW5pdElucHV0YCBvciBgSW5pdE91dHB1dGBcbiAgICBzbmFrZUNlbGxQdHIsIC8vIHB0ciByZXR1cm5lZCBieSBSdXN0XG4gICAgc25ha2VMZW5ndGggKiAyIC8vIGVhY2ggc25ha2UgY2VsbCBvY2N1cGllcyAyIGJ5dGVzOiAocm93LCBjb2wpXG4gICAgKTsgLy8gZXh0cmFjdCBgc25ha2VMZW5ndGhgIGJ5dGVzIGZyb20gbWVtb3J5IGJ1ZmZlciBhdCB0aGUgYWRkcmVzcyBvZiBgc25ha2VDZWxsUHRyYFxuICAgIGZvciAodmFyIGkgPSBzbmFrZUxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gaSA9PSAwID8gXCIjMzQ0ZTQxXCIgOiBcIiNhM2IxOGFcIjsgLy8gaGVhZDogZGFyayB0b25lLCBib2R5OiBsaWdodCB0b25lXG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIHZhciByb3cgPSBzbmFrZUNlbGxzUmF3W2kgKiAyXTtcbiAgICAgICAgdmFyIGNvbCA9IHNuYWtlQ2VsbHNSYXdbaSAqIDIgKyAxXTtcbiAgICAgICAgY29udGV4dC5maWxsUmVjdChDRUxMX1NJWkUgKiBjb2wsIENFTExfU0laRSAqIHJvdywgQ0VMTF9TSVpFLCBDRUxMX1NJWkUpO1xuICAgIH1cbiAgICBjb250ZXh0LnN0cm9rZSgpO1xufVxuZnVuY3Rpb24gZHJhd1Jld2FyZENlbGwoX2EpIHtcbiAgICB2YXIgY29udGV4dCA9IF9hLmNvbnRleHQsIHdvcmxkID0gX2Eud29ybGQ7XG4gICAgdmFyIF9iID0gd29ybGQuZ2V0X3Jld2FyZF9jZWxsKCksIHJvdyA9IF9iLnJvdywgY29sID0gX2IuY29sO1xuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCIjZjViNzAwXCI7XG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICBjb250ZXh0LmZpbGxSZWN0KENFTExfU0laRSAqIGNvbCwgQ0VMTF9TSVpFICogcm93LCBDRUxMX1NJWkUsIENFTExfU0laRSk7XG4gICAgY29udGV4dC5zdHJva2UoKTtcbn1cbmZ1bmN0aW9uIGRyYXdHYW1lU3RhdHVzKHdvcmxkKSB7XG4gICAgJGdhbWVTdGF0dXMudGV4dENvbnRlbnQgPSBzdGF0dXNUb1RleHQod29ybGQuc3RhdHVzKTtcbiAgICAkZ2FtZVBvaW50cy50ZXh0Q29udGVudCA9IFN0cmluZyh3b3JsZC5wb2ludHMpO1xuICAgIHN3aXRjaCAod29ybGQuc3RhdHVzKSB7XG4gICAgICAgIGNhc2UgR2FtZVN0YXR1cy5Xb246XG4gICAgICAgIGNhc2UgR2FtZVN0YXR1cy5Mb3N0OlxuICAgICAgICAgICAgJGdhbWVTdGF0dXMudGV4dENvbnRlbnQgPSBzdGF0dXNUb1RleHQod29ybGQuc3RhdHVzKTtcbiAgICAgICAgICAgICRnYW1lQ29udHJvbEJ0bi50ZXh0Q29udGVudCA9IFwiUmVzZXRcIjtcbiAgICB9XG59XG4vKipcbiAqIFBhaW50cyB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgd29ybGQgYW5kIHRoZSBzbmFrZSBvbnRvIHRoZSBjYW52YXMuXG4gKlxuICogVGhpcyBmdW5jdGlvbiBmaXJzdCBjbGVhcnMgdGhlIGVudGlyZSBjYW52YXMsIHRoZW4gZHJhd3MgdGhlIGdyaWRcbiAqIHJlcHJlc2VudGluZyB0aGUgd29ybGQgYW5kIGZpbmFsbHkgZHJhd3MgdGhlIHNuYWtlIG9uIHRvcCBvZiBpdC5cbiAqXG4gKiBAcGFyYW0ge0RyYXdpbmdGblBhcmFtc30gcGFyYW1zIC0gVGhlIHBhcmFtZXRlcnMgY29udGFpbmluZyB0aGUgY2FudmFzLFxuICogY29udGV4dCwgYW5kIHdvcmxkIHRvIGJlIGRyYXduLlxuICovXG5mdW5jdGlvbiBwYWludChfYSkge1xuICAgIHZhciBjYW52YXMgPSBfYS5jYW52YXMsIGNvbnRleHQgPSBfYS5jb250ZXh0LCB3b3JsZCA9IF9hLndvcmxkLCB3YXNtID0gX2Eud2FzbTtcbiAgICBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIGRyYXdXb3JsZCh7IGNhbnZhczogY2FudmFzLCBjb250ZXh0OiBjb250ZXh0LCB3b3JsZDogd29ybGQgfSk7XG4gICAgZHJhd1Jld2FyZENlbGwoeyBjYW52YXM6IGNhbnZhcywgY29udGV4dDogY29udGV4dCwgd29ybGQ6IHdvcmxkLCB3YXNtOiB3YXNtIH0pO1xuICAgIGRyYXdTbmFrZSh7IGNhbnZhczogY2FudmFzLCBjb250ZXh0OiBjb250ZXh0LCB3b3JsZDogd29ybGQsIHdhc206IHdhc20gfSk7XG4gICAgZHJhd0dhbWVTdGF0dXMod29ybGQpO1xufVxuLyoqXG4gKiBJbml0aWFsaXplcyB0aGUgbWFpbiBhcHBsaWNhdGlvbiBieSBzZXR0aW5nIHVwIHRoZSBXZWJBc3NlbWJseSBtb2R1bGUsXG4gKiBjcmVhdGluZyB0aGUgZ2FtZSB3b3JsZCwgYW5kIHN0YXJ0aW5nIHRoZSBnYW1lIGxvb3AuIFRoZSBmdW5jdGlvbiByZXRyaWV2ZXNcbiAqIHRoZSBjYW52YXMgZWxlbWVudCwgaW5pdGlhbGl6ZXMgdGhlIGdhbWUgd29ybGQgd2l0aCBzcGVjaWZpZWQgZGltZW5zaW9uc1xuICogYW5kIHNuYWtlIHN0YXJ0aW5nIHBvc2l0aW9uLCBhbmQgc2V0cyB1cCB0aGUgMkQgcmVuZGVyaW5nIGNvbnRleHQuIEl0XG4gKiBiZWdpbnMgdGhlIGdhbWUgbG9vcCB3aXRoIGEgc3BlY2lmaWVkIGZyYW1lcyBwZXIgc2Vjb25kIChGUFMpIHJhdGUsIHVwZGF0aW5nXG4gKiB0aGUgZ2FtZSBzdGF0ZSBhbmQgcmVuZGVyaW5nIHRoZSB3b3JsZCBhbmQgc25ha2Ugb24gZWFjaCBmcmFtZS5cbiAqL1xuZnVuY3Rpb24gaW5pdF9tYWluKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gbG9vcF9wbGF5KCkge1xuICAgICAgICAgICAgaWYgKHdvcmxkLnN0YXR1cyA9PT0gR2FtZVN0YXR1cy5Xb24gfHwgd29ybGQuc3RhdHVzID09PSBHYW1lU3RhdHVzLkxvc3QpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIElNUE9SVEFOVDogZXhpdCBnYW1lIGxvb3AgaWYgd2luIG9yIGxvc3NcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBGUFMgPSA0O1xuICAgICAgICAgICAgdGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB3b3JsZC5zdGVwKCk7XG4gICAgICAgICAgICAgICAgcGFpbnQoeyBjYW52YXM6IGNhbnZhcywgY29udGV4dDogY29udGV4dCwgd29ybGQ6IHdvcmxkLCB3YXNtOiB3YXNtIH0pO1xuICAgICAgICAgICAgICAgIC8vIG1ldGhvZCB0YWtlcyBjYWxsYmFjayB0byBpbnZva2VkIGJlZm9yZSBuZXh0IGJyb3dzZXIgcmVwYWludFxuICAgICAgICAgICAgICAgIHJhZiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcF9wbGF5KTtcbiAgICAgICAgICAgIH0sIDEwMDAgLyBGUFMpO1xuICAgICAgICB9XG4gICAgICAgIHZhciB3YXNtLCBjYW52YXMsIHdvcmxkLCBjb250ZXh0LCB0aW1lb3V0LCByYWY7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIGluaXQoKV07XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICB3YXNtID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICBjYW52YXMgPSBxKFwiI2NhbnZhc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgd29ybGQgPSBXb3JsZC5mcm9tKFdPUkxEX1JPV1MsIFdPUkxEX0NPTFMsIFNOQUtFX1NQQVdOX1JPVywgU05BS0VfU1BBV05fQ09MKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHdvcmxkLm51bV9yb3dzKTsgLy8gd2lsbCBwcmludCBgdW5kZWZpbmVkYCBzaW5jZSBgbnVtX3Jvd3NgIGlzIGEgcHJpdmF0ZSBmaWVsZFxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChlLmNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiQXJyb3dMZWZ0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmxkLmNoYW5nZV9zbmFrZV9kaXIoRGlyZWN0aW9uLkxlZnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiQXJyb3dSaWdodFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JsZC5jaGFuZ2Vfc25ha2VfZGlyKERpcmVjdGlvbi5SaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJBcnJvd1VwXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmxkLmNoYW5nZV9zbmFrZV9kaXIoRGlyZWN0aW9uLlVwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkFycm93RG93blwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JsZC5jaGFuZ2Vfc25ha2VfZGlyKERpcmVjdGlvbi5Eb3duKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAkZ2FtZUNvbnRyb2xCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChfKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHdvcmxkLnN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR2FtZVN0YXR1cy5QbGF5ZWQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBHYW1lU3RhdHVzLldvbjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdhbWVTdGF0dXMuTG9zdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUocmFmKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGdhbWVTdGF0dXMudGV4dENvbnRlbnQgPSBzdGF0dXNUb1RleHQobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmxkID0gV29ybGQuZnJvbShXT1JMRF9ST1dTLCBXT1JMRF9DT0xTLCBTTkFLRV9TUEFXTl9ST1csIFNOQUtFX1NQQVdOX0NPTCk7IC8vIHJlc2V0IHdvcmxkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRnYW1lQ29udHJvbEJ0bi50ZXh0Q29udGVudCA9IFwiUGxheVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWludCh7IGNhbnZhczogY2FudmFzLCB3b3JsZDogd29ybGQsIGNvbnRleHQ6IGNvbnRleHQsIHdhc206IHdhc20gfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZ2FtZVN0YXR1cy50ZXh0Q29udGVudCA9IHN0YXR1c1RvVGV4dChHYW1lU3RhdHVzLlBsYXllZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRnYW1lQ29udHJvbEJ0bi50ZXh0Q29udGVudCA9IFwiUmVzZXRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd29ybGQuc3RhcnRfZ2FtZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb29wX3BsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgJGdhbWVTdGF0dXMudGV4dENvbnRlbnQgPSBzdGF0dXNUb1RleHQobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIHBhaW50KHsgY2FudmFzOiBjYW52YXMsIHdvcmxkOiB3b3JsZCwgY29udGV4dDogY29udGV4dCwgd2FzbTogd2FzbSB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmluaXRfbWFpbigpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9