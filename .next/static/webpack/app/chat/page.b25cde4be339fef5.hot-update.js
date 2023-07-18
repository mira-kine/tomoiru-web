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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Chat; }\n/* harmony export */ });\n/* harmony import */ var _swc_helpers_async_to_generator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swc/helpers/_/_async_to_generator */ \"(app-client)/./node_modules/@swc/helpers/esm/_async_to_generator.js\");\n/* harmony import */ var _swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @swc/helpers/_/_sliced_to_array */ \"(app-client)/./node_modules/@swc/helpers/esm/_sliced_to_array.js\");\n/* harmony import */ var _swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swc/helpers/_/_ts_values */ \"(app-client)/./node_modules/tslib/tslib.es6.mjs\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-client)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-client)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-client)/./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \n\n\n\n\nvar _s = $RefreshSig$();\n\n\nfunction Chat() {\n    _s();\n    var _useState = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_3__._)((0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\"), 2), query = _useState[0], setQuery = _useState[1];\n    var _useState1 = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_3__._)((0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]), 2), response = _useState1[0], setResponse = _useState1[1];\n    var router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    // const prompt = `You are a kind, gentle and sweet friend who lives in Japan. Answer the question based on the context below to the best of your ability, and if the question cannot be answered based on the context, say \"Ah, sorry. I am not sure about that one, I will have to check it out!\"\\n\\nQuestion: ${query}\\nAnswer:`;\n    var handleBack = function() {\n        setLoading(true);\n        router.push(\"/dashboard\");\n    };\n    var handleChat = function() {\n        var _ref = (0,_swc_helpers_async_to_generator__WEBPACK_IMPORTED_MODULE_4__._)(function(e) {\n            var _loop, promptResp, promptData, chatResp, data, reader, decoder, done;\n            return (0,_swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_5__.__generator)(this, function(_state) {\n                switch(_state.label){\n                    case 0:\n                        _loop = function() {\n                            var _ref, value, doneReading, chunkValue;\n                            return (0,_swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_5__.__generator)(this, function(_state) {\n                                switch(_state.label){\n                                    case 0:\n                                        return [\n                                            4,\n                                            reader.read()\n                                        ];\n                                    case 1:\n                                        _ref = _state.sent(), value = _ref.value, doneReading = _ref.done;\n                                        done = doneReading;\n                                        chunkValue = decoder.decode(value);\n                                        // update interface with answer in responses\n                                        setResponse(function(prev) {\n                                            return prev + chunkValue;\n                                        });\n                                        return [\n                                            2\n                                        ];\n                                }\n                            });\n                        };\n                        e.preventDefault();\n                        // set response with whatever previous answers were\n                        if (response.length < 1) {\n                            setResponse(\"\");\n                        }\n                        return [\n                            4,\n                            fetch(\"/api/buildPrompt\", {\n                                method: \"POST\",\n                                headers: {\n                                    \"Content-Type\": \"application/json\"\n                                },\n                                body: JSON.stringify({\n                                    prompt: query\n                                })\n                            })\n                        ];\n                    case 1:\n                        promptResp = _state.sent();\n                        return [\n                            4,\n                            promptResp.json()\n                        ];\n                    case 2:\n                        promptData = _state.sent();\n                        return [\n                            4,\n                            fetch(\"/api/chat\", {\n                                method: \"POST\",\n                                headers: {\n                                    \"Content-Type\": \"application.json\"\n                                },\n                                body: JSON.stringify({\n                                    prompt: promptData.prompt\n                                })\n                            })\n                        ];\n                    case 3:\n                        chatResp = _state.sent();\n                        if (!chatResp.ok) {\n                            throw new Error(chatResp.statusText);\n                        }\n                        data = chatResp.body;\n                        reader = data.getReader();\n                        decoder = new TextDecoder();\n                        done = false;\n                        _state.label = 4;\n                    case 4:\n                        if (!!done) return [\n                            3,\n                            6\n                        ];\n                        return [\n                            5,\n                            (0,_swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_5__.__values)(_loop())\n                        ];\n                    case 5:\n                        _state.sent();\n                        return [\n                            3,\n                            4\n                        ];\n                    case 6:\n                        return [\n                            2\n                        ];\n                }\n            });\n        });\n        return function handleChat(e) {\n            return _ref.apply(this, arguments);\n        };\n    }();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex justify-center items-center content-center w-full h-full bg-periwinkle\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"flex justify-center items-center w-4/5 h-4/5 absolute top-24 bg-licorice opacity-70 rounded-3xl shadow-xl shadow-black\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex flex-col justify-start items-center relative w-11/12 h-4/5 min-w-[75%] shadow-white bg-black rounded-3xl\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: handleBack,\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                            className: \"text-white\",\n                            children: \"<\"\n                        }, void 0, false, {\n                            fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                            lineNumber: 72,\n                            columnNumber: 13\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                        lineNumber: 71,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"w-10/12 h-4/5 bg-white relative rounded-xl p-12 font-sans\",\n                        children: [\n                            \"Chats go here\",\n                            response !== null && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                children: [\n                                    \"Temp \",\n                                    response\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                                lineNumber: 76,\n                                columnNumber: 35\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                        lineNumber: 74,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                        className: \"w-10/12 bg-pink flex justify-start pt-4\",\n                        onSubmit: handleChat,\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"w-full\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                type: \"text\",\n                                value: query,\n                                onChange: function(e) {\n                                    setQuery(e.target.value);\n                                },\n                                \"aria-label\": \"user chat input\",\n                                name: \"query\",\n                                placeholder: \"write your message here\",\n                                className: \"rounded-xl w-full overflow-x scroll\"\n                            }, void 0, false, {\n                                fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                                lineNumber: 84,\n                                columnNumber: 15\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                            lineNumber: 82,\n                            columnNumber: 13\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                        lineNumber: 78,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                lineNumber: 70,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n            lineNumber: 69,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n        lineNumber: 68,\n        columnNumber: 5\n    }, this);\n} // starting chat openai api here\n_s(Chat, \"mF6Qm5c+duSnHWmXIMUEW+aTgGA=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = Chat;\nvar _c;\n$RefreshReg$(_c, \"Chat\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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c0RBQVNBOzs7S0FIRkMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwL2NoYXQvcGFnZS50c3g/OGY1OSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L25hdmlnYXRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDaGF0KCkge1xuICBjb25zdCBbcXVlcnksIHNldFF1ZXJ5XSA9IHVzZVN0YXRlPHN0cmluZz4oJycpO1xuICBjb25zdCBbcmVzcG9uc2UsIHNldFJlc3BvbnNlXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5cbiAgLy8gY29uc3QgcHJvbXB0ID0gYFlvdSBhcmUgYSBraW5kLCBnZW50bGUgYW5kIHN3ZWV0IGZyaWVuZCB3aG8gbGl2ZXMgaW4gSmFwYW4uIEFuc3dlciB0aGUgcXVlc3Rpb24gYmFzZWQgb24gdGhlIGNvbnRleHQgYmVsb3cgdG8gdGhlIGJlc3Qgb2YgeW91ciBhYmlsaXR5LCBhbmQgaWYgdGhlIHF1ZXN0aW9uIGNhbm5vdCBiZSBhbnN3ZXJlZCBiYXNlZCBvbiB0aGUgY29udGV4dCwgc2F5IFwiQWgsIHNvcnJ5LiBJIGFtIG5vdCBzdXJlIGFib3V0IHRoYXQgb25lLCBJIHdpbGwgaGF2ZSB0byBjaGVjayBpdCBvdXQhXCJcXG5cXG5RdWVzdGlvbjogJHtxdWVyeX1cXG5BbnN3ZXI6YDtcblxuICBjb25zdCBoYW5kbGVCYWNrID0gKCkgPT4ge1xuICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgcm91dGVyLnB1c2goJy9kYXNoYm9hcmQnKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVDaGF0ID0gYXN5bmMgKGU6IGFueSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAvLyBzZXQgcmVzcG9uc2Ugd2l0aCB3aGF0ZXZlciBwcmV2aW91cyBhbnN3ZXJzIHdlcmVcbiAgICBpZiAocmVzcG9uc2UubGVuZ3RoIDwgMSkge1xuICAgICAgc2V0UmVzcG9uc2UoJycpO1xuICAgIH1cbiAgICAvLyBidWlsZCBjb250ZXh0dWFsaXplZCBwcm9tcHRcbiAgICBjb25zdCBwcm9tcHRSZXNwID0gYXdhaXQgZmV0Y2goJy9hcGkvYnVpbGRQcm9tcHQnLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgcHJvbXB0OiBxdWVyeVxuICAgICAgfSlcbiAgICB9KTtcblxuICAgIGNvbnN0IHByb21wdERhdGEgPSBhd2FpdCBwcm9tcHRSZXNwLmpzb24oKTtcbiAgICAvLyBzZW5kIHRoaXMgcHJvbXB0IHRvIGNoYXRHUFRcblxuICAgIGNvbnN0IGNoYXRSZXNwID0gYXdhaXQgZmV0Y2goJy9hcGkvY2hhdCcsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uLmpzb24nXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBwcm9tcHQ6IHByb21wdERhdGEucHJvbXB0XG4gICAgICB9KVxuICAgIH0pO1xuICAgIGlmICghY2hhdFJlc3Aub2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihjaGF0UmVzcC5zdGF0dXNUZXh0KTtcbiAgICB9XG4gICAgY29uc3QgZGF0YSA9IGNoYXRSZXNwLmJvZHk7XG5cbiAgICAvLyB0dXJuaW5nIGludG8gcmVhZGFibGUgc3RyZWFtXG4gICAgY29uc3QgcmVhZGVyID0gZGF0YS5nZXRSZWFkZXIoKTtcbiAgICBjb25zdCBkZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCk7XG4gICAgbGV0IGRvbmUgPSBmYWxzZTtcblxuICAgIC8vIHJlYWQgdGhlIHN0cmVhbWluZyBjaGF0R1BUIGFuc3dlclxuICAgIHdoaWxlICghZG9uZSkge1xuICAgICAgY29uc3QgeyB2YWx1ZSwgZG9uZTogZG9uZVJlYWRpbmcgfSA9IGF3YWl0IHJlYWRlci5yZWFkKCk7XG4gICAgICBkb25lID0gZG9uZVJlYWRpbmc7XG4gICAgICAvLyBnZXR0aW5nIHJlYWQgaW4gY2h1bmtzXG4gICAgICBjb25zdCBjaHVua1ZhbHVlID0gZGVjb2Rlci5kZWNvZGUodmFsdWUpO1xuICAgICAgLy8gdXBkYXRlIGludGVyZmFjZSB3aXRoIGFuc3dlciBpbiByZXNwb25zZXNcbiAgICAgIHNldFJlc3BvbnNlKChwcmV2KSA9PiBwcmV2ICsgY2h1bmtWYWx1ZSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlciBjb250ZW50LWNlbnRlciB3LWZ1bGwgaC1mdWxsIGJnLXBlcml3aW5rbGVcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXIgdy00LzUgaC00LzUgYWJzb2x1dGUgdG9wLTI0IGJnLWxpY29yaWNlIG9wYWNpdHktNzAgcm91bmRlZC0zeGwgc2hhZG93LXhsIHNoYWRvdy1ibGFja1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wganVzdGlmeS1zdGFydCBpdGVtcy1jZW50ZXIgcmVsYXRpdmUgdy0xMS8xMiBoLTQvNSBtaW4tdy1bNzUlXSBzaGFkb3ctd2hpdGUgYmctYmxhY2sgcm91bmRlZC0zeGxcIj5cbiAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2hhbmRsZUJhY2t9PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC13aGl0ZVwiPnsnPCd9PC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xMC8xMiBoLTQvNSBiZy13aGl0ZSByZWxhdGl2ZSByb3VuZGVkLXhsIHAtMTIgZm9udC1zYW5zXCI+XG4gICAgICAgICAgICBDaGF0cyBnbyBoZXJlXG4gICAgICAgICAgICB7cmVzcG9uc2UgIT09IG51bGwgJiYgPGRpdj5UZW1wIHtyZXNwb25zZX08L2Rpdj59XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGZvcm1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMTAvMTIgYmctcGluayBmbGV4IGp1c3RpZnktc3RhcnQgcHQtNFwiXG4gICAgICAgICAgICBvblN1Ym1pdD17aGFuZGxlQ2hhdH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbFwiPlxuICAgICAgICAgICAgICB7LyogPGxhYmVsIGNsYXNzTmFtZT1cImZvbnQtc2FucyB0ZXh0LXdoaXRlXCI+WW91OjwvbGFiZWw+ICovfVxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e3F1ZXJ5fVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgc2V0UXVlcnkoZS50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cInVzZXIgY2hhdCBpbnB1dFwiXG4gICAgICAgICAgICAgICAgbmFtZT1cInF1ZXJ5XCJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIndyaXRlIHlvdXIgbWVzc2FnZSBoZXJlXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyb3VuZGVkLXhsIHctZnVsbCBvdmVyZmxvdy14IHNjcm9sbFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbi8vIHN0YXJ0aW5nIGNoYXQgb3BlbmFpIGFwaSBoZXJlXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsInVzZVJvdXRlciIsIkNoYXQiLCJxdWVyeSIsInNldFF1ZXJ5IiwicmVzcG9uc2UiLCJzZXRSZXNwb25zZSIsInJvdXRlciIsImhhbmRsZUJhY2siLCJzZXRMb2FkaW5nIiwicHVzaCIsImhhbmRsZUNoYXQiLCJlIiwicHJvbXB0UmVzcCIsInByb21wdERhdGEiLCJjaGF0UmVzcCIsImRhdGEiLCJyZWFkZXIiLCJkZWNvZGVyIiwiZG9uZSIsInZhbHVlIiwiZG9uZVJlYWRpbmciLCJjaHVua1ZhbHVlIiwicmVhZCIsImRlY29kZSIsInByZXYiLCJwcmV2ZW50RGVmYXVsdCIsImxlbmd0aCIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwicHJvbXB0IiwianNvbiIsIm9rIiwiRXJyb3IiLCJzdGF0dXNUZXh0IiwiZ2V0UmVhZGVyIiwiVGV4dERlY29kZXIiLCJkaXYiLCJjbGFzc05hbWUiLCJidXR0b24iLCJvbkNsaWNrIiwic3BhbiIsImZvcm0iLCJvblN1Ym1pdCIsImlucHV0IiwidHlwZSIsIm9uQ2hhbmdlIiwidGFyZ2V0IiwiYXJpYS1sYWJlbCIsIm5hbWUiLCJwbGFjZWhvbGRlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-client)/./app/chat/page.tsx\n"));

/***/ })

});