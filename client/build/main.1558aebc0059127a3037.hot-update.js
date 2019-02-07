exports.id = "main";
exports.modules = {

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_0__);


var app = __webpack_require__(/*! ./server */ "./src/server.js").default;

// Use `app#callback()` method here instead of directly
// passing `app` as an argument to `createServer` (or use `app#listen()` instead)
// @see https://github.com/koajs/koa/blob/master/docs/api/index.md#appcallback
var currentHandler = app.callback();
var server = http__WEBPACK_IMPORTED_MODULE_0___default.a.createServer(currentHandler);

server.listen("5000" || false, function (error) {
  if (error) {
    console.log(error);
  }

  console.log('\uD83D\uDE80 started on ' + "0.0.0.0" + "5000");
});

if (true) {
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept(/*! ./server */ "./src/server.js", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function () {
    console.log('🔁  HMR Reloading `./server`...');

    try {
      var newHandler = __webpack_require__(/*! ./server */ "./src/server.js").default.callback();
      server.removeListener('request', currentHandler);
      server.on('request', newHandler);
      currentHandler = newHandler;
    } catch (error) {
      console.error(error);
    }
  })(__WEBPACK_OUTDATED_DEPENDENCIES__); });
}

/***/ })

};
//# sourceMappingURL=main.1558aebc0059127a3037.hot-update.js.map