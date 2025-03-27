function buf2hex(buffer) {
  // buffer is an ArrayBuffer
  return [...new Uint8Array(buffer)]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}
/**
 * Initializes the WebAssembly module and executes the 'sum' function.
 *
 * This function fetches a WebAssembly binary file named 'sum.wasm',
 * converts it into an ArrayBuffer, and instantiates it. It then
 * retrieves the 'sum' function exported by the WebAssembly module,
 * calls it with two arguments (15 and 27), and logs the result to
 * the console.
 */
async function callWasmFn() {
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
async function wasmCallJSFn() {
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

async function importMemoryFromWASM() {
  const response = await fetch("mem_export.wasm");
  const buffer = await response.arrayBuffer();
  const wasm = await WebAssembly.instantiate(buffer);
  const { memVar } = wasm.instance.exports;
  const uInt8Arr = new Uint8Array(memVar.buffer, 0, 5); // only enough to hold "Hello"
  // ^ if we use longer than 5 bytes, all remaining bytes are \0 and will not be decoded
  const HiText = new TextDecoder().decode(uInt8Arr);
  console.log("Text format = %s", HiText);
}

async function exportMemoryToWASM() {
  const memory = new WebAssembly.Memory({ initial: 1 }); // allocate 1 page sized memory
  const importObj = {
    js: {
      mem: memory,
    },
  };
  const response = await fetch("mem_import.wasm");
  const buffer = await response.arrayBuffer();
  await WebAssembly.instantiate(buffer, importObj);
  const uInt8Arr = new Uint8Array(memory.buffer, 0, 5); // only enough to hold "Hello"
  // ^ if we use longer than 5 bytes, all remaining bytes are \0 and will not be decoded
  const HiText = new TextDecoder().decode(uInt8Arr);
  console.log("HiText = %s", HiText);
}

callWasmFn();
wasmCallJSFn();
importMemoryFromWASM();
exportMemoryToWASM();
