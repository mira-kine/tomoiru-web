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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Chat; }\n/* harmony export */ });\n/* harmony import */ var _swc_helpers_async_to_generator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swc/helpers/_/_async_to_generator */ \"(app-client)/./node_modules/@swc/helpers/esm/_async_to_generator.js\");\n/* harmony import */ var _swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @swc/helpers/_/_sliced_to_array */ \"(app-client)/./node_modules/@swc/helpers/esm/_sliced_to_array.js\");\n/* harmony import */ var _swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swc/helpers/_/_ts_values */ \"(app-client)/./node_modules/tslib/tslib.es6.mjs\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-client)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-client)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-client)/./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \n\n\n\n\nvar _s = $RefreshSig$();\n\n\nfunction Chat() {\n    _s();\n    var _useState = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_3__._)((0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\"), 2), message = _useState[0], setMessage = _useState[1];\n    var _useState1 = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_3__._)((0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]), 2), response = _useState1[0], setResponse = _useState1[1];\n    var router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    // const prompt = `You are a kind, gentle and sweet friend who lives in Japan. Answer the question based on the context below to the best of your ability, and if the question cannot be answered based on the context, say \"Ah, sorry. I am not sure about that one, I will have to check it out!\"\\n\\nQuestion: ${query}\\nAnswer:`;\n    var handleBack = function() {\n        setLoading(true);\n        router.push(\"/dashboard\");\n    };\n    var handleChat = function() {\n        var _ref = (0,_swc_helpers_async_to_generator__WEBPACK_IMPORTED_MODULE_4__._)(function(e) {\n            var _loop, promptResp, promptData, chatResp, data, reader, decoder, done;\n            return (0,_swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_5__.__generator)(this, function(_state) {\n                switch(_state.label){\n                    case 0:\n                        _loop = function() {\n                            var _ref, value, doneReading, chunkValue;\n                            return (0,_swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_5__.__generator)(this, function(_state) {\n                                switch(_state.label){\n                                    case 0:\n                                        return [\n                                            4,\n                                            reader.read()\n                                        ];\n                                    case 1:\n                                        _ref = _state.sent(), value = _ref.value, doneReading = _ref.done;\n                                        done = doneReading;\n                                        chunkValue = decoder.decode(value);\n                                        // update interface with answer in responses\n                                        setResponse(function(prev) {\n                                            return prev + chunkValue;\n                                        });\n                                        return [\n                                            2\n                                        ];\n                                }\n                            });\n                        };\n                        e.preventDefault();\n                        // set response with whatever previous answers were\n                        if (response.length < 1) {\n                            setResponse(\"\");\n                        }\n                        return [\n                            4,\n                            fetch(\"/prompt/api\", {\n                                method: \"POST\",\n                                headers: {\n                                    \"Content-Type\": \"application/json\"\n                                },\n                                body: JSON.stringify({\n                                    prompt: message\n                                })\n                            })\n                        ];\n                    case 1:\n                        promptResp = _state.sent();\n                        return [\n                            4,\n                            promptResp.json()\n                        ];\n                    case 2:\n                        promptData = _state.sent();\n                        // send this prompt to chatGPT\n                        console.log(\"promptData\", promptData);\n                        return [\n                            4,\n                            fetch(\"/chat/api\", {\n                                method: \"POST\",\n                                headers: {\n                                    \"Content-Type\": \"application.json\"\n                                },\n                                body: JSON.stringify({\n                                    prompt: promptData.prompt\n                                })\n                            })\n                        ];\n                    case 3:\n                        chatResp = _state.sent();\n                        if (!chatResp.ok) {\n                            throw new Error(chatResp.statusText);\n                        }\n                        data = chatResp.body;\n                        reader = data.getReader();\n                        decoder = new TextDecoder();\n                        done = false;\n                        _state.label = 4;\n                    case 4:\n                        if (!!done) return [\n                            3,\n                            6\n                        ];\n                        return [\n                            5,\n                            (0,_swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_5__.__values)(_loop())\n                        ];\n                    case 5:\n                        _state.sent();\n                        return [\n                            3,\n                            4\n                        ];\n                    case 6:\n                        return [\n                            2\n                        ];\n                }\n            });\n        });\n        return function handleChat(e) {\n            return _ref.apply(this, arguments);\n        };\n    }();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex justify-center items-center content-center w-full h-full bg-periwinkle\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"flex justify-center items-center w-4/5 h-4/5 absolute top-24 bg-licorice opacity-70 rounded-3xl shadow-xl shadow-black\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex flex-col justify-start items-center relative w-11/12 h-5/6 min-w-[75%] shadow-white bg-black rounded-3xl pb-8\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: handleBack,\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                            className: \"text-white\",\n                            children: \"<\"\n                        }, void 0, false, {\n                            fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                            lineNumber: 71,\n                            columnNumber: 13\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                        lineNumber: 70,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"w-10/12 h-4/5 bg-white relative rounded-xl p-12 font-sans overflow-y-auto\",\n                        children: [\n                            \"Chats go here\",\n                            response !== null && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                children: response\n                            }, void 0, false, {\n                                fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                                lineNumber: 76,\n                                columnNumber: 35\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                        lineNumber: 73,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                        className: \"w-10/12 bg-pink flex justify-start mt-8\",\n                        onSubmit: handleChat,\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"w-full\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                    type: \"text\",\n                                    value: message,\n                                    onChange: function(e) {\n                                        setMessage(e.target.value);\n                                    },\n                                    \"aria-label\": \"user chat input\",\n                                    name: \"query\",\n                                    placeholder: \"write your message here\",\n                                    className: \"rounded-xl w-full p-4 truncate overflow-y-scroll\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                                    lineNumber: 84,\n                                    columnNumber: 15\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                                lineNumber: 82,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                className: \"text-white p-2\",\n                                onClick: handleChat,\n                                children: \"Ask\"\n                            }, void 0, false, {\n                                fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                                lineNumber: 96,\n                                columnNumber: 13\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                        lineNumber: 78,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                lineNumber: 69,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n            lineNumber: 68,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n        lineNumber: 67,\n        columnNumber: 5\n    }, this);\n} // starting chat openai api here\n_s(Chat, \"9E5yEX1qiBDvxUv/A1uGGuVYo3c=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = Chat;\nvar _c;\n$RefreshReg$(_c, \"Chat\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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T0QsV0FBVTtnQ0FBaUJFLFNBQVNuQzswQ0FBWTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVFwRSxFQUVBLGdDQUFnQztHQXJHUlQ7O1FBR1BELHNEQUFTQTs7O0tBSEZDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2FwcC9jaGF0L3BhZ2UudHN4PzhmNTkiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9uYXZpZ2F0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2hhdCgpIHtcbiAgY29uc3QgW21lc3NhZ2UsIHNldE1lc3NhZ2VdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbcmVzcG9uc2UsIHNldFJlc3BvbnNlXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG4gIC8vIGNvbnN0IHByb21wdCA9IGBZb3UgYXJlIGEga2luZCwgZ2VudGxlIGFuZCBzd2VldCBmcmllbmQgd2hvIGxpdmVzIGluIEphcGFuLiBBbnN3ZXIgdGhlIHF1ZXN0aW9uIGJhc2VkIG9uIHRoZSBjb250ZXh0IGJlbG93IHRvIHRoZSBiZXN0IG9mIHlvdXIgYWJpbGl0eSwgYW5kIGlmIHRoZSBxdWVzdGlvbiBjYW5ub3QgYmUgYW5zd2VyZWQgYmFzZWQgb24gdGhlIGNvbnRleHQsIHNheSBcIkFoLCBzb3JyeS4gSSBhbSBub3Qgc3VyZSBhYm91dCB0aGF0IG9uZSwgSSB3aWxsIGhhdmUgdG8gY2hlY2sgaXQgb3V0IVwiXFxuXFxuUXVlc3Rpb246ICR7cXVlcnl9XFxuQW5zd2VyOmA7XG5cbiAgY29uc3QgaGFuZGxlQmFjayA9ICgpID0+IHtcbiAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgIHJvdXRlci5wdXNoKCcvZGFzaGJvYXJkJyk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ2hhdCA9IGFzeW5jIChlOiBhbnkpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gc2V0IHJlc3BvbnNlIHdpdGggd2hhdGV2ZXIgcHJldmlvdXMgYW5zd2VycyB3ZXJlXG4gICAgaWYgKHJlc3BvbnNlLmxlbmd0aCA8IDEpIHtcbiAgICAgIHNldFJlc3BvbnNlKCcnKTtcbiAgICB9XG4gICAgLy8gYnVpbGQgY29udGV4dHVhbGl6ZWQgcHJvbXB0XG4gICAgY29uc3QgcHJvbXB0UmVzcCA9IGF3YWl0IGZldGNoKCcvcHJvbXB0L2FwaScsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBwcm9tcHQ6IG1lc3NhZ2VcbiAgICAgIH0pXG4gICAgfSk7XG5cbiAgICBjb25zdCBwcm9tcHREYXRhID0gYXdhaXQgcHJvbXB0UmVzcC5qc29uKCk7XG4gICAgLy8gc2VuZCB0aGlzIHByb21wdCB0byBjaGF0R1BUXG4gICAgY29uc29sZS5sb2coJ3Byb21wdERhdGEnLCBwcm9tcHREYXRhKTtcbiAgICBjb25zdCBjaGF0UmVzcCA9IGF3YWl0IGZldGNoKCcvY2hhdC9hcGknLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi5qc29uJ1xuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgcHJvbXB0OiBwcm9tcHREYXRhLnByb21wdFxuICAgICAgfSlcbiAgICB9KTtcbiAgICBpZiAoIWNoYXRSZXNwLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoY2hhdFJlc3Auc3RhdHVzVGV4dCk7XG4gICAgfVxuXG4gICAgY29uc3QgZGF0YSA9IGNoYXRSZXNwLmJvZHk7XG5cbiAgICAvLyB0dXJuaW5nIGludG8gcmVhZGFibGUgc3RyZWFtXG4gICAgY29uc3QgcmVhZGVyID0gZGF0YS5nZXRSZWFkZXIoKTtcbiAgICBjb25zdCBkZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCk7XG4gICAgbGV0IGRvbmUgPSBmYWxzZTtcblxuICAgIC8vIHJlYWQgdGhlIHN0cmVhbWluZyBjaGF0R1BUIGFuc3dlclxuICAgIHdoaWxlICghZG9uZSkge1xuICAgICAgY29uc3QgeyB2YWx1ZSwgZG9uZTogZG9uZVJlYWRpbmcgfSA9IGF3YWl0IHJlYWRlci5yZWFkKCk7XG4gICAgICBkb25lID0gZG9uZVJlYWRpbmc7XG4gICAgICAvLyBnZXR0aW5nIHJlYWQgaW4gY2h1bmtzXG4gICAgICBjb25zdCBjaHVua1ZhbHVlID0gZGVjb2Rlci5kZWNvZGUodmFsdWUpO1xuICAgICAgLy8gdXBkYXRlIGludGVyZmFjZSB3aXRoIGFuc3dlciBpbiByZXNwb25zZXNcbiAgICAgIHNldFJlc3BvbnNlKChwcmV2KSA9PiBwcmV2ICsgY2h1bmtWYWx1ZSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXIgY29udGVudC1jZW50ZXIgdy1mdWxsIGgtZnVsbCBiZy1wZXJpd2lua2xlXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1jZW50ZXIgaXRlbXMtY2VudGVyIHctNC81IGgtNC81IGFic29sdXRlIHRvcC0yNCBiZy1saWNvcmljZSBvcGFjaXR5LTcwIHJvdW5kZWQtM3hsIHNoYWRvdy14bCBzaGFkb3ctYmxhY2tcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGp1c3RpZnktc3RhcnQgaXRlbXMtY2VudGVyIHJlbGF0aXZlIHctMTEvMTIgaC01LzYgbWluLXctWzc1JV0gc2hhZG93LXdoaXRlIGJnLWJsYWNrIHJvdW5kZWQtM3hsIHBiLThcIj5cbiAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2hhbmRsZUJhY2t9PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC13aGl0ZVwiPnsnPCd9PC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xMC8xMiBoLTQvNSBiZy13aGl0ZSByZWxhdGl2ZSByb3VuZGVkLXhsIHAtMTIgZm9udC1zYW5zIG92ZXJmbG93LXktYXV0b1wiPlxuICAgICAgICAgICAgQ2hhdHMgZ28gaGVyZVxuICAgICAgICAgICAgey8qIG1hcCB0aHJvdWdoIHJlc3BvbnNlcyBoZXJlICovfVxuICAgICAgICAgICAge3Jlc3BvbnNlICE9PSBudWxsICYmIDxkaXY+e3Jlc3BvbnNlfTwvZGl2Pn1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8Zm9ybVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0xMC8xMiBiZy1waW5rIGZsZXgganVzdGlmeS1zdGFydCBtdC04XCJcbiAgICAgICAgICAgIG9uU3VibWl0PXtoYW5kbGVDaGF0fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsXCI+XG4gICAgICAgICAgICAgIHsvKiA8bGFiZWwgY2xhc3NOYW1lPVwiZm9udC1zYW5zIHRleHQtd2hpdGVcIj5Zb3U6PC9sYWJlbD4gKi99XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17bWVzc2FnZX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgIHNldE1lc3NhZ2UoZS50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cInVzZXIgY2hhdCBpbnB1dFwiXG4gICAgICAgICAgICAgICAgbmFtZT1cInF1ZXJ5XCJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIndyaXRlIHlvdXIgbWVzc2FnZSBoZXJlXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyb3VuZGVkLXhsIHctZnVsbCBwLTQgdHJ1bmNhdGUgb3ZlcmZsb3cteS1zY3JvbGxcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInRleHQtd2hpdGUgcC0yXCIgb25DbGljaz17aGFuZGxlQ2hhdH0+XG4gICAgICAgICAgICAgIEFza1xuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuXG4vLyBzdGFydGluZyBjaGF0IG9wZW5haSBhcGkgaGVyZVxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VSb3V0ZXIiLCJDaGF0IiwibWVzc2FnZSIsInNldE1lc3NhZ2UiLCJyZXNwb25zZSIsInNldFJlc3BvbnNlIiwicm91dGVyIiwiaGFuZGxlQmFjayIsInNldExvYWRpbmciLCJwdXNoIiwiaGFuZGxlQ2hhdCIsImUiLCJwcm9tcHRSZXNwIiwicHJvbXB0RGF0YSIsImNoYXRSZXNwIiwiZGF0YSIsInJlYWRlciIsImRlY29kZXIiLCJkb25lIiwidmFsdWUiLCJkb25lUmVhZGluZyIsImNodW5rVmFsdWUiLCJyZWFkIiwiZGVjb2RlIiwicHJldiIsInByZXZlbnREZWZhdWx0IiwibGVuZ3RoIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJwcm9tcHQiLCJqc29uIiwiY29uc29sZSIsImxvZyIsIm9rIiwiRXJyb3IiLCJzdGF0dXNUZXh0IiwiZ2V0UmVhZGVyIiwiVGV4dERlY29kZXIiLCJkaXYiLCJjbGFzc05hbWUiLCJidXR0b24iLCJvbkNsaWNrIiwic3BhbiIsImZvcm0iLCJvblN1Ym1pdCIsImlucHV0IiwidHlwZSIsIm9uQ2hhbmdlIiwidGFyZ2V0IiwiYXJpYS1sYWJlbCIsIm5hbWUiLCJwbGFjZWhvbGRlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-client)/./app/chat/page.tsx\n"));

/***/ })

});