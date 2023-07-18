"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("middleware",{

/***/ "(middleware)/./middleware.ts":
/*!***********************!*\
  !*** ./middleware.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   middleware: () => (/* binding */ middleware)\n/* harmony export */ });\n/* harmony import */ var _supabase_auth_helpers_nextjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/auth-helpers-nextjs */ \"(middleware)/./node_modules/@supabase/auth-helpers-nextjs/dist/index.js\");\n/* harmony import */ var _supabase_auth_helpers_nextjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_supabase_auth_helpers_nextjs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/web/exports/next-response */ \"(middleware)/./node_modules/next/dist/esm/server/web/exports/next-response.js\");\n\n\nasync function middleware(req) {\n    const res = next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_1__[\"default\"].next();\n    const supabase = (0,_supabase_auth_helpers_nextjs__WEBPACK_IMPORTED_MODULE_0__.createMiddlewareClient)({\n        req,\n        res\n    });\n    const session = await supabase.auth.getSession();\n    return res;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vbWlkZGxld2FyZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQXNFO0FBQzVCO0FBS25DLGVBQWVFLFdBQVdDLEdBQWdCO0lBQy9DLE1BQU1DLE1BQU1ILGtGQUFZQSxDQUFDSSxJQUFJO0lBQzdCLE1BQU1DLFdBQVdOLHFGQUFzQkEsQ0FBVztRQUFFRztRQUFLQztJQUFJO0lBQzdELE1BQU1HLFVBQVUsTUFBTUQsU0FBU0UsSUFBSSxDQUFDQyxVQUFVO0lBQzlDLE9BQU9MO0FBQ1QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbWlkZGxld2FyZS50cz80MjJkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZU1pZGRsZXdhcmVDbGllbnQgfSBmcm9tICdAc3VwYWJhc2UvYXV0aC1oZWxwZXJzLW5leHRqcydcbmltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJ1xuXG5pbXBvcnQgdHlwZSB7IE5leHRSZXF1ZXN0IH0gZnJvbSAnbmV4dC9zZXJ2ZXInXG5pbXBvcnQgdHlwZSB7IERhdGFiYXNlIH0gZnJvbSAnLi4vdHlwZXMvc3VwYWJhc2UnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbWlkZGxld2FyZShyZXE6IE5leHRSZXF1ZXN0KSB7XG4gIGNvbnN0IHJlcyA9IE5leHRSZXNwb25zZS5uZXh0KClcbiAgY29uc3Qgc3VwYWJhc2UgPSBjcmVhdGVNaWRkbGV3YXJlQ2xpZW50PERhdGFiYXNlPih7IHJlcSwgcmVzIH0pXG4gIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFNlc3Npb24oKVxuICByZXR1cm4gcmVzXG59Il0sIm5hbWVzIjpbImNyZWF0ZU1pZGRsZXdhcmVDbGllbnQiLCJOZXh0UmVzcG9uc2UiLCJtaWRkbGV3YXJlIiwicmVxIiwicmVzIiwibmV4dCIsInN1cGFiYXNlIiwic2Vzc2lvbiIsImF1dGgiLCJnZXRTZXNzaW9uIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(middleware)/./middleware.ts\n");

/***/ })

});