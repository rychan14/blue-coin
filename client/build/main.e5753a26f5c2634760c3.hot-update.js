exports.id = "main";
exports.modules = {

/***/ "./src/server.js":
/*!***********************!*\
  !*** ./src/server.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App */ "./src/App.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! koa */ "koa");
/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(koa__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var koa_static__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! koa-static */ "koa-static");
/* harmony import */ var koa_static__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(koa_static__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var koa_helmet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! koa-helmet */ "koa-helmet");
/* harmony import */ var koa_helmet__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(koa_helmet__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! koa-router */ "koa-router");
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-dom/server */ "react-dom/server");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_7__);
var _jsxFileName = 'C:\\Users\\rycha\\Documents\\nodejsplayground\\blue-coin\\client\\src\\server.js';









var assets = __webpack_require__(/*! ./build/assets.json */ "./build/assets.json");

var router = new koa_router__WEBPACK_IMPORTED_MODULE_6___default.a();
router.get('/*', function (ctx, next) {
  var context = {};
  var markup = Object(react_dom_server__WEBPACK_IMPORTED_MODULE_7__["renderToString"])(react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
    react_router_dom__WEBPACK_IMPORTED_MODULE_2__["StaticRouter"],
    { context: context, location: ctx.url, __source: {
        fileName: _jsxFileName,
        lineNumber: 18
      }
    },
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_App__WEBPACK_IMPORTED_MODULE_0__["default"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 19
      }
    })
  ));
  ctx.state.markup = markup;
  return context.url ? ctx.redirect(context.url) : next();
}, function (ctx) {
  ctx.status = 200;
  ctx.body = '\n    <!doctype html>\n      <html lang="">\n      <head>\n          <meta http-equiv="X-UA-Compatible" content="IE=edge" />\n          <meta charset="utf-8" />\n          <title>Welcome to Razzle + Koa</title>\n          <meta name="viewport" content="width=device-width, initial-scale=1">\n          ' + (assets.client.css ? '<link rel="stylesheet" href="' + assets.client.css + '">' : '') + '\n          ' + ( false ? undefined : '<script src="' + assets.client.js + '" defer crossorigin></script>') + '\n      </head>\n      <body>\n          <div id="root">' + ctx.state.markup + '</div>\n      </body>\n    </html>';
});

var server = new koa__WEBPACK_IMPORTED_MODULE_3___default.a();
server.use(koa_helmet__WEBPACK_IMPORTED_MODULE_5___default()()).use(koa_static__WEBPACK_IMPORTED_MODULE_4___default()("C:\\Users\\rycha\\Documents\\nodejsplayground\\blue-coin\\client\\public")).use(router.routes()).use(router.allowedMethods());

/* harmony default export */ __webpack_exports__["default"] = (server);

/***/ })

};
//# sourceMappingURL=main.e5753a26f5c2634760c3.hot-update.js.map