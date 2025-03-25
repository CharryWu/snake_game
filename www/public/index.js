/******/ (() => { // webpackBootstrap
/*!******************!*\
  !*** ./index.js ***!
  \******************/
async function init() {
    const byteArray = new Int8Array([0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00, 0x01, 0x07, 0x01, 0x60, 0x02, 0x7f, 0x7f, 0x01, 0x7f, 0x03, 0x02, 0x01, 0x00, 0x07, 0x07, 0x01, 0x03, 0x73, 0x75, 0x6d, 0x00, 0x00, 0x0a, 0x09, 0x01, 0x07, 0x00, 0x20, 0x00, 0x20, 0x01, 0x6a, 0x0b, 0x00, 0x18, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x01, 0x06, 0x01, 0x00, 0x03, 0x73, 0x75, 0x6d, 0x02, 0x09, 0x01, 0x00, 0x02, 0x00, 0x01, 0x61, 0x01, 0x01, 0x62]);
    const wasm = await WebAssembly.instantiate(byteArray.buffer);
    const sumFunction = wasm.instance.exports.sum;
    let args = [15, 27];
    const result = sumFunction(args[0], args[1]);
    console.log('wasm sum(%d, %d) = %d', args[0], args[1], result);
}

init();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93d3cvLi9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJhc3luYyBmdW5jdGlvbiBpbml0KCkge1xuICAgIGNvbnN0IGJ5dGVBcnJheSA9IG5ldyBJbnQ4QXJyYXkoWzB4MDAsIDB4NjEsIDB4NzMsIDB4NmQsIDB4MDEsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDEsIDB4MDcsIDB4MDEsIDB4NjAsIDB4MDIsIDB4N2YsIDB4N2YsIDB4MDEsIDB4N2YsIDB4MDMsIDB4MDIsIDB4MDEsIDB4MDAsIDB4MDcsIDB4MDcsIDB4MDEsIDB4MDMsIDB4NzMsIDB4NzUsIDB4NmQsIDB4MDAsIDB4MDAsIDB4MGEsIDB4MDksIDB4MDEsIDB4MDcsIDB4MDAsIDB4MjAsIDB4MDAsIDB4MjAsIDB4MDEsIDB4NmEsIDB4MGIsIDB4MDAsIDB4MTgsIDB4MDQsIDB4NmUsIDB4NjEsIDB4NmQsIDB4NjUsIDB4MDEsIDB4MDYsIDB4MDEsIDB4MDAsIDB4MDMsIDB4NzMsIDB4NzUsIDB4NmQsIDB4MDIsIDB4MDksIDB4MDEsIDB4MDAsIDB4MDIsIDB4MDAsIDB4MDEsIDB4NjEsIDB4MDEsIDB4MDEsIDB4NjJdKTtcbiAgICBjb25zdCB3YXNtID0gYXdhaXQgV2ViQXNzZW1ibHkuaW5zdGFudGlhdGUoYnl0ZUFycmF5LmJ1ZmZlcik7XG4gICAgY29uc3Qgc3VtRnVuY3Rpb24gPSB3YXNtLmluc3RhbmNlLmV4cG9ydHMuc3VtO1xuICAgIGxldCBhcmdzID0gWzE1LCAyN107XG4gICAgY29uc3QgcmVzdWx0ID0gc3VtRnVuY3Rpb24oYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY29uc29sZS5sb2coJ3dhc20gc3VtKCVkLCAlZCkgPSAlZCcsIGFyZ3NbMF0sIGFyZ3NbMV0sIHJlc3VsdCk7XG59XG5cbmluaXQoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==