"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/chat/page",{

/***/ "(app-client)/./app/chat/page.tsx":
/*!***************************!*\
  !*** ./app/chat/page.tsx ***!
  \***************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Chat; }\n/* harmony export */ });\n/* harmony import */ var _swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @swc/helpers/_/_sliced_to_array */ \"(app-client)/./node_modules/@swc/helpers/esm/_sliced_to_array.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-client)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-client)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-client)/./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \n\nvar _s = $RefreshSig$();\n\n\nfunction Chat() {\n    _s();\n    var _useState = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_3__._)((0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\"), 2), query = _useState[0], setQuery = _useState[1];\n    var _useState1 = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_3__._)((0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]), 2), response = _useState1[0], setResponse = _useState1[1];\n    var router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    // const prompt = `You are a kind, gentle and sweet friend who lives in Japan. Answer the question based on the context below to the best of your ability, and if the question cannot be answered based on the context, say \"Ah, sorry. I am not sure about that one, I will have to check it out!\"\\n\\nQuestion: ${query}\\nAnswer:`;\n    var handleBack = function() {\n        setLoading(true);\n        router.push(\"/dashboard\");\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"chat-container\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"computer\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"chat-bg\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: handleBack,\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            children: \"<\"\n                        }, void 0, false, {\n                            fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                            lineNumber: 22,\n                            columnNumber: 13\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                        lineNumber: 21,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"chat-box\",\n                        children: \"Chats go here\"\n                    }, void 0, false, {\n                        fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                        lineNumber: 24,\n                        columnNumber: 11\n                    }, this),\n                    response !== null && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        children: [\n                            \"Temp \",\n                            response\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                        lineNumber: 25,\n                        columnNumber: 33\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                        className: \"chat-form\",\n                        onSubmit: handleSubmit,\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"chat-input\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                    children: \"You:\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                                    lineNumber: 28,\n                                    columnNumber: 15\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                    type: \"text\",\n                                    value: query,\n                                    onChange: function(e) {\n                                        setQuery(e.target.value);\n                                    },\n                                    \"aria-label\": \"user chat input\",\n                                    name: \"query\",\n                                    placeholder: \"write your message here\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                                    lineNumber: 29,\n                                    columnNumber: 15\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                            lineNumber: 27,\n                            columnNumber: 13\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                        lineNumber: 26,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                lineNumber: 20,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n            lineNumber: 19,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n        lineNumber: 18,\n        columnNumber: 5\n    }, this);\n} // starting chat openai api here\n_s(Chat, \"mF6Qm5c+duSnHWmXIMUEW+aTgGA=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = Chat;\nvar _c;\n$RefreshReg$(_c, \"Chat\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1jbGllbnQpLy4vYXBwL2NoYXQvcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUN3QztBQUNJO0FBRTdCLFNBQVNHOztJQUN0QixJQUEwQkYsWUFBQUEsK0RBQUFBLENBQUFBLCtDQUFRQSxDQUFTLFNBQXBDRyxRQUFtQkgsY0FBWkksV0FBWUo7SUFDMUIsSUFBZ0NBLGFBQUFBLCtEQUFBQSxDQUFBQSwrQ0FBUUEsQ0FBQyxFQUFFLE9BQXBDSyxXQUF5QkwsZUFBZk0sY0FBZU47SUFDaEMsSUFBTU8sU0FBU04sMERBQVNBO0lBRXhCLG9VQUFvVTtJQUVwVSxJQUFNTyxhQUFhO1FBQ2pCQyxXQUFXO1FBQ1hGLE9BQU9HLElBQUksQ0FBQztJQUNkO0lBRUEscUJBQ0UsOERBQUNDO1FBQUlDLFdBQVU7a0JBQ2IsNEVBQUNEO1lBQUlDLFdBQVU7c0JBQ2IsNEVBQUNEO2dCQUFJQyxXQUFVOztrQ0FDYiw4REFBQ0M7d0JBQU9DLFNBQVNOO2tDQUNmLDRFQUFDRztzQ0FBSzs7Ozs7Ozs7Ozs7a0NBRVIsOERBQUNBO3dCQUFJQyxXQUFVO2tDQUFXOzs7Ozs7b0JBQ3pCUCxhQUFhLHNCQUFRLDhEQUFDTTs7NEJBQUk7NEJBQU1OOzs7Ozs7O2tDQUNqQyw4REFBQ1U7d0JBQUtILFdBQVU7d0JBQVlJLFVBQVVDO2tDQUNwQyw0RUFBQ047NEJBQUlDLFdBQVU7OzhDQUNiLDhEQUFDTTs4Q0FBTTs7Ozs7OzhDQUNQLDhEQUFDQztvQ0FDQ0MsTUFBSztvQ0FDTEMsT0FBT2xCO29DQUNQbUIsVUFBVSxTQUFDQzt3Q0FDVG5CLFNBQVNtQixFQUFFQyxNQUFNLENBQUNILEtBQUs7b0NBQ3pCO29DQUNBSSxjQUFXO29DQUNYQyxNQUFLO29DQUNMQyxhQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRNUIsRUFFQSxnQ0FBZ0M7R0ExQ1J6Qjs7UUFHUEQsc0RBQVNBOzs7S0FIRkMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwL2NoYXQvcGFnZS50c3g/OGY1OSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L25hdmlnYXRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDaGF0KCkge1xuICBjb25zdCBbcXVlcnksIHNldFF1ZXJ5XSA9IHVzZVN0YXRlPHN0cmluZz4oJycpO1xuICBjb25zdCBbcmVzcG9uc2UsIHNldFJlc3BvbnNlXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5cbiAgLy8gY29uc3QgcHJvbXB0ID0gYFlvdSBhcmUgYSBraW5kLCBnZW50bGUgYW5kIHN3ZWV0IGZyaWVuZCB3aG8gbGl2ZXMgaW4gSmFwYW4uIEFuc3dlciB0aGUgcXVlc3Rpb24gYmFzZWQgb24gdGhlIGNvbnRleHQgYmVsb3cgdG8gdGhlIGJlc3Qgb2YgeW91ciBhYmlsaXR5LCBhbmQgaWYgdGhlIHF1ZXN0aW9uIGNhbm5vdCBiZSBhbnN3ZXJlZCBiYXNlZCBvbiB0aGUgY29udGV4dCwgc2F5IFwiQWgsIHNvcnJ5LiBJIGFtIG5vdCBzdXJlIGFib3V0IHRoYXQgb25lLCBJIHdpbGwgaGF2ZSB0byBjaGVjayBpdCBvdXQhXCJcXG5cXG5RdWVzdGlvbjogJHtxdWVyeX1cXG5BbnN3ZXI6YDtcblxuICBjb25zdCBoYW5kbGVCYWNrID0gKCkgPT4ge1xuICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgcm91dGVyLnB1c2goJy9kYXNoYm9hcmQnKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hhdC1jb250YWluZXJcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tcHV0ZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGF0LWJnXCI+XG4gICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVCYWNrfT5cbiAgICAgICAgICAgIDxkaXY+eyc8J308L2Rpdj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoYXQtYm94XCI+Q2hhdHMgZ28gaGVyZTwvZGl2PlxuICAgICAgICAgIHtyZXNwb25zZSAhPT0gbnVsbCAmJiA8ZGl2PlRlbXAge3Jlc3BvbnNlfTwvZGl2Pn1cbiAgICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJjaGF0LWZvcm1cIiBvblN1Ym1pdD17aGFuZGxlU3VibWl0fT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hhdC1pbnB1dFwiPlxuICAgICAgICAgICAgICA8bGFiZWw+WW91OjwvbGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17cXVlcnl9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICBzZXRRdWVyeShlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwidXNlciBjaGF0IGlucHV0XCJcbiAgICAgICAgICAgICAgICBuYW1lPVwicXVlcnlcIlxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwid3JpdGUgeW91ciBtZXNzYWdlIGhlcmVcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuXG4vLyBzdGFydGluZyBjaGF0IG9wZW5haSBhcGkgaGVyZVxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VSb3V0ZXIiLCJDaGF0IiwicXVlcnkiLCJzZXRRdWVyeSIsInJlc3BvbnNlIiwic2V0UmVzcG9uc2UiLCJyb3V0ZXIiLCJoYW5kbGVCYWNrIiwic2V0TG9hZGluZyIsInB1c2giLCJkaXYiLCJjbGFzc05hbWUiLCJidXR0b24iLCJvbkNsaWNrIiwiZm9ybSIsIm9uU3VibWl0IiwiaGFuZGxlU3VibWl0IiwibGFiZWwiLCJpbnB1dCIsInR5cGUiLCJ2YWx1ZSIsIm9uQ2hhbmdlIiwiZSIsInRhcmdldCIsImFyaWEtbGFiZWwiLCJuYW1lIiwicGxhY2Vob2xkZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-client)/./app/chat/page.tsx\n"));

/***/ })

});