/**
 * Initializes the WebAssembly module and executes the 'sum' function.
 *
 * This function fetches a WebAssembly binary file named 'sum.wasm',
 * converts it into an ArrayBuffer, and instantiates it. It then
 * retrieves the 'sum' function exported by the WebAssembly module,
 * calls it with two arguments (15 and 27), and logs the result to
 * the console.
 */
async function init() {
  const response = await fetch("sum.wasm");
  const buffer = await response.arrayBuffer();
  const wasm = await WebAssembly.instantiate(buffer);
  const sumFunction = wasm.instance.exports.sum;
  let args = [15, 27];
  const result = sumFunction(args[0], args[1]);
  console.log("wasm sum(%d, %d) = %d", args[0], args[1], result);
}

/**
 * Imports a WebAssembly module and executes its driver function.
 *
 * This function fetches a WASM file, instantiates it with a custom import object
 * that includes console logging functions, and calls the driver function exported
 * by the WASM module.
 *
 * @async
 * @function
 */
async function importLog() {
  const importObj = {
    console: {
      log: () => console.log("This is imported from JS => WASM"),
      error: () => console.log("This is error msg from JS"),
    },
  };
  const response = await fetch("import_example.wasm");
  const buffer = await response.arrayBuffer();
  const wasm = await WebAssembly.instantiate(buffer, importObj);
  const { driver } = wasm.instance.exports;
  driver(); // This will call the driver function inside the WASM module
}

init();
importLog();
