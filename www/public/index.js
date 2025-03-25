/******/ (() => { // webpackBootstrap
/*!******************!*\
  !*** ./index.js ***!
  \******************/
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLFNBQVM7QUFDbkIsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxTQUFTO0FBQ25CLHdEQUF3RDtBQUN4RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBDQUEwQyxZQUFZLEdBQUc7QUFDekQ7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdEO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd3d3Ly4vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gYnVmMmhleChidWZmZXIpIHtcbiAgLy8gYnVmZmVyIGlzIGFuIEFycmF5QnVmZmVyXG4gIHJldHVybiBbLi4ubmV3IFVpbnQ4QXJyYXkoYnVmZmVyKV1cbiAgICAubWFwKCh4KSA9PiB4LnRvU3RyaW5nKDE2KS5wYWRTdGFydCgyLCBcIjBcIikpXG4gICAgLmpvaW4oXCJcIik7XG59XG4vKipcbiAqIEluaXRpYWxpemVzIHRoZSBXZWJBc3NlbWJseSBtb2R1bGUgYW5kIGV4ZWN1dGVzIHRoZSAnc3VtJyBmdW5jdGlvbi5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIGZldGNoZXMgYSBXZWJBc3NlbWJseSBiaW5hcnkgZmlsZSBuYW1lZCAnc3VtLndhc20nLFxuICogY29udmVydHMgaXQgaW50byBhbiBBcnJheUJ1ZmZlciwgYW5kIGluc3RhbnRpYXRlcyBpdC4gSXQgdGhlblxuICogcmV0cmlldmVzIHRoZSAnc3VtJyBmdW5jdGlvbiBleHBvcnRlZCBieSB0aGUgV2ViQXNzZW1ibHkgbW9kdWxlLFxuICogY2FsbHMgaXQgd2l0aCB0d28gYXJndW1lbnRzICgxNSBhbmQgMjcpLCBhbmQgbG9ncyB0aGUgcmVzdWx0IHRvXG4gKiB0aGUgY29uc29sZS5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gY2FsbFdhc21GbigpIHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcInN1bS53YXNtXCIpO1xuICBjb25zdCBidWZmZXIgPSBhd2FpdCByZXNwb25zZS5hcnJheUJ1ZmZlcigpO1xuICBjb25zdCB3YXNtID0gYXdhaXQgV2ViQXNzZW1ibHkuaW5zdGFudGlhdGUoYnVmZmVyKTtcbiAgY29uc3Qgc3VtRnVuY3Rpb24gPSB3YXNtLmluc3RhbmNlLmV4cG9ydHMuc3VtO1xuICBsZXQgYXJncyA9IFsxNSwgMjddO1xuICBjb25zdCByZXN1bHQgPSBzdW1GdW5jdGlvbihhcmdzWzBdLCBhcmdzWzFdKTtcbiAgY29uc29sZS5sb2coXCJ3YXNtIHN1bSglZCwgJWQpID0gJWRcIiwgYXJnc1swXSwgYXJnc1sxXSwgcmVzdWx0KTtcbn1cblxuLyoqXG4gKiBJbXBvcnRzIGEgV2ViQXNzZW1ibHkgbW9kdWxlIGFuZCBleGVjdXRlcyBpdHMgZHJpdmVyIGZ1bmN0aW9uLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gZmV0Y2hlcyBhIFdBU00gZmlsZSwgaW5zdGFudGlhdGVzIGl0IHdpdGggYSBjdXN0b20gaW1wb3J0IG9iamVjdFxuICogdGhhdCBpbmNsdWRlcyBjb25zb2xlIGxvZ2dpbmcgZnVuY3Rpb25zLCBhbmQgY2FsbHMgdGhlIGRyaXZlciBmdW5jdGlvbiBleHBvcnRlZFxuICogYnkgdGhlIFdBU00gbW9kdWxlLlxuICpcbiAqIEBhc3luY1xuICogQGZ1bmN0aW9uXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIHdhc21DYWxsSlNGbigpIHtcbiAgY29uc3QgaW1wb3J0T2JqID0ge1xuICAgIGNvbnNvbGU6IHtcbiAgICAgIGxvZzogKCkgPT4gY29uc29sZS5sb2coXCJUaGlzIGlzIGltcG9ydGVkIGZyb20gSlMgPT4gV0FTTVwiKSxcbiAgICAgIGVycm9yOiAoKSA9PiBjb25zb2xlLmxvZyhcIlRoaXMgaXMgZXJyb3IgbXNnIGZyb20gSlNcIiksXG4gICAgfSxcbiAgfTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcImltcG9ydF9leGFtcGxlLndhc21cIik7XG4gIGNvbnN0IGJ1ZmZlciA9IGF3YWl0IHJlc3BvbnNlLmFycmF5QnVmZmVyKCk7XG4gIGNvbnN0IHdhc20gPSBhd2FpdCBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZShidWZmZXIsIGltcG9ydE9iaik7XG4gIGNvbnN0IHsgZHJpdmVyIH0gPSB3YXNtLmluc3RhbmNlLmV4cG9ydHM7XG4gIGRyaXZlcigpOyAvLyBUaGlzIHdpbGwgY2FsbCB0aGUgZHJpdmVyIGZ1bmN0aW9uIGluc2lkZSB0aGUgV0FTTSBtb2R1bGVcbn1cblxuYXN5bmMgZnVuY3Rpb24gaW1wb3J0TWVtb3J5RnJvbVdBU00oKSB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCJtZW1fZXhwb3J0Lndhc21cIik7XG4gIGNvbnN0IGJ1ZmZlciA9IGF3YWl0IHJlc3BvbnNlLmFycmF5QnVmZmVyKCk7XG4gIGNvbnN0IHdhc20gPSBhd2FpdCBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZShidWZmZXIpO1xuICBjb25zdCB7IG1lbVZhciB9ID0gd2FzbS5pbnN0YW5jZS5leHBvcnRzO1xuICBjb25zdCB1SW50OEFyciA9IG5ldyBVaW50OEFycmF5KG1lbVZhci5idWZmZXIsIDAsIDUpOyAvLyBvbmx5IGVub3VnaCB0byBob2xkIFwiSGVsbG9cIlxuICAvLyBeIGlmIHdlIHVzZSBsb25nZXIgdGhhbiA1IGJ5dGVzLCBhbGwgcmVtYWluaW5nIGJ5dGVzIGFyZSBcXDAgYW5kIHdpbGwgbm90IGJlIGRlY29kZWRcbiAgY29uc3QgSGlUZXh0ID0gbmV3IFRleHREZWNvZGVyKCkuZGVjb2RlKHVJbnQ4QXJyKTtcbiAgY29uc29sZS5sb2coXCJUZXh0IGZvcm1hdCA9ICVzXCIsIEhpVGV4dCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGV4cG9ydE1lbW9yeVRvV0FTTSgpIHtcbiAgY29uc3QgbWVtb3J5ID0gbmV3IFdlYkFzc2VtYmx5Lk1lbW9yeSh7IGluaXRpYWw6IDEgfSk7IC8vIGFsbG9jYXRlIDEgcGFnZSBzaXplZCBtZW1vcnlcbiAgY29uc3QgaW1wb3J0T2JqID0ge1xuICAgIGpzOiB7XG4gICAgICBtZW06IG1lbW9yeSxcbiAgICB9LFxuICB9O1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwibWVtX2ltcG9ydC53YXNtXCIpO1xuICBjb25zdCBidWZmZXIgPSBhd2FpdCByZXNwb25zZS5hcnJheUJ1ZmZlcigpO1xuICBhd2FpdCBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZShidWZmZXIsIGltcG9ydE9iaik7XG4gIGNvbnN0IHVJbnQ4QXJyID0gbmV3IFVpbnQ4QXJyYXkobWVtb3J5LmJ1ZmZlciwgMCwgNSk7IC8vIG9ubHkgZW5vdWdoIHRvIGhvbGQgXCJIZWxsb1wiXG4gIC8vIF4gaWYgd2UgdXNlIGxvbmdlciB0aGFuIDUgYnl0ZXMsIGFsbCByZW1haW5pbmcgYnl0ZXMgYXJlIFxcMCBhbmQgd2lsbCBub3QgYmUgZGVjb2RlZFxuICBjb25zdCBIaVRleHQgPSBuZXcgVGV4dERlY29kZXIoKS5kZWNvZGUodUludDhBcnIpO1xuICBjb25zb2xlLmxvZyhcIkhpVGV4dCA9ICVzXCIsIEhpVGV4dCk7XG59XG5cbmNhbGxXYXNtRm4oKTtcbndhc21DYWxsSlNGbigpO1xuaW1wb3J0TWVtb3J5RnJvbVdBU00oKTtcbmV4cG9ydE1lbW9yeVRvV0FTTSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9