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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Chat; }\n/* harmony export */ });\n/* harmony import */ var _swc_helpers_async_to_generator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swc/helpers/_/_async_to_generator */ \"(app-client)/./node_modules/@swc/helpers/esm/_async_to_generator.js\");\n/* harmony import */ var _swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @swc/helpers/_/_sliced_to_array */ \"(app-client)/./node_modules/@swc/helpers/esm/_sliced_to_array.js\");\n/* harmony import */ var _swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swc/helpers/_/_ts_values */ \"(app-client)/./node_modules/tslib/tslib.es6.mjs\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-client)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-client)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-client)/./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \n\n\n\n\nvar _s = $RefreshSig$();\n\n\nfunction Chat() {\n    _s();\n    var _useState = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_3__._)((0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\"), 2), query = _useState[0], setQuery = _useState[1];\n    var _useState1 = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_3__._)((0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]), 2), response = _useState1[0], setResponse = _useState1[1];\n    var router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    // const prompt = `You are a kind, gentle and sweet friend who lives in Japan. Answer the question based on the context below to the best of your ability, and if the question cannot be answered based on the context, say \"Ah, sorry. I am not sure about that one, I will have to check it out!\"\\n\\nQuestion: ${query}\\nAnswer:`;\n    var handleBack = function() {\n        setLoading(true);\n        router.push(\"/dashboard\");\n    };\n    var handleChat = function() {\n        var _ref = (0,_swc_helpers_async_to_generator__WEBPACK_IMPORTED_MODULE_4__._)(function(e) {\n            var _loop, promptResp, promptData, chatResp, data, reader, decoder, done;\n            return (0,_swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_5__.__generator)(this, function(_state) {\n                switch(_state.label){\n                    case 0:\n                        _loop = function() {\n                            var _ref, value, doneReading, chunkValue;\n                            return (0,_swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_5__.__generator)(this, function(_state) {\n                                switch(_state.label){\n                                    case 0:\n                                        return [\n                                            4,\n                                            reader.read()\n                                        ];\n                                    case 1:\n                                        _ref = _state.sent(), value = _ref.value, doneReading = _ref.done;\n                                        done = doneReading;\n                                        chunkValue = decoder.decode(value);\n                                        // update interface with answer in responses\n                                        setResponse(function(prev) {\n                                            return prev + chunkValue;\n                                        });\n                                        return [\n                                            2\n                                        ];\n                                }\n                            });\n                        };\n                        e.preventDefault();\n                        // set response with whatever previous answers were\n                        if (response.length < 1) {\n                            setResponse(\"\");\n                        }\n                        return [\n                            4,\n                            fetch(\"/api/buildPrompt\", {\n                                method: \"POST\",\n                                headers: {\n                                    \"Content-Type\": \"application/json\"\n                                },\n                                body: JSON.stringify({\n                                    prompt: query\n                                })\n                            })\n                        ];\n                    case 1:\n                        promptResp = _state.sent();\n                        return [\n                            4,\n                            promptResp.json()\n                        ];\n                    case 2:\n                        promptData = _state.sent();\n                        return [\n                            4,\n                            fetch(\"/api/chat\", {\n                                method: \"POST\",\n                                headers: {\n                                    \"Content-Type\": \"application.json\"\n                                },\n                                body: JSON.stringify({\n                                    prompt: promptData.prompt\n                                })\n                            })\n                        ];\n                    case 3:\n                        chatResp = _state.sent();\n                        if (!chatResp.ok) {\n                            throw new Error(chatResp.statusText);\n                        }\n                        data = chatResp.body;\n                        reader = data.getReader();\n                        decoder = new TextDecoder();\n                        done = false;\n                        _state.label = 4;\n                    case 4:\n                        if (!!done) return [\n                            3,\n                            6\n                        ];\n                        return [\n                            5,\n                            (0,_swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_5__.__values)(_loop())\n                        ];\n                    case 5:\n                        _state.sent();\n                        return [\n                            3,\n                            4\n                        ];\n                    case 6:\n                        return [\n                            2\n                        ];\n                }\n            });\n        });\n        return function handleChat(e) {\n            return _ref.apply(this, arguments);\n        };\n    }();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex justify-center items-center content-center w-full h-full bg-periwinkle\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"flex justify-center items-center w-4/5 h-4/5 absolute top-28 bg-licorice opacity-70 rounded-3xl shadow-xl shadow-black\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex flex-col justify-between relative w-11/12 h-4/5 min-w-[75%] shadow-white bg-black\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: handleBack,\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            children: \"<\"\n                        }, void 0, false, {\n                            fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                            lineNumber: 72,\n                            columnNumber: 13\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                        lineNumber: 71,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"chat-box\",\n                        children: [\n                            \"Chats go here\",\n                            response !== null && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                children: [\n                                    \"Temp \",\n                                    response\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                                lineNumber: 76,\n                                columnNumber: 35\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                                className: \"chat-form\",\n                                onSubmit: handleChat,\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"chat-input\",\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                            children: \"You:\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                                            lineNumber: 79,\n                                            columnNumber: 17\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                            type: \"text\",\n                                            value: query,\n                                            onChange: function(e) {\n                                                setQuery(e.target.value);\n                                            },\n                                            \"aria-label\": \"user chat input\",\n                                            name: \"query\",\n                                            placeholder: \"write your message here\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                                            lineNumber: 80,\n                                            columnNumber: 17\n                                        }, this)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                                    lineNumber: 78,\n                                    columnNumber: 15\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                                lineNumber: 77,\n                                columnNumber: 13\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                        lineNumber: 74,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                lineNumber: 70,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n            lineNumber: 69,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n        lineNumber: 68,\n        columnNumber: 5\n    }, this);\n} // starting chat openai api here\n_s(Chat, \"mF6Qm5c+duSnHWmXIMUEW+aTgGA=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = Chat;\nvar _c;\n$RefreshReg$(_c, \"Chat\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LHNEQUFTQTs7O0tBSEZDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2FwcC9jaGF0L3BhZ2UudHN4PzhmNTkiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9uYXZpZ2F0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2hhdCgpIHtcbiAgY29uc3QgW3F1ZXJ5LCBzZXRRdWVyeV0gPSB1c2VTdGF0ZTxzdHJpbmc+KCcnKTtcbiAgY29uc3QgW3Jlc3BvbnNlLCBzZXRSZXNwb25zZV0gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuXG4gIC8vIGNvbnN0IHByb21wdCA9IGBZb3UgYXJlIGEga2luZCwgZ2VudGxlIGFuZCBzd2VldCBmcmllbmQgd2hvIGxpdmVzIGluIEphcGFuLiBBbnN3ZXIgdGhlIHF1ZXN0aW9uIGJhc2VkIG9uIHRoZSBjb250ZXh0IGJlbG93IHRvIHRoZSBiZXN0IG9mIHlvdXIgYWJpbGl0eSwgYW5kIGlmIHRoZSBxdWVzdGlvbiBjYW5ub3QgYmUgYW5zd2VyZWQgYmFzZWQgb24gdGhlIGNvbnRleHQsIHNheSBcIkFoLCBzb3JyeS4gSSBhbSBub3Qgc3VyZSBhYm91dCB0aGF0IG9uZSwgSSB3aWxsIGhhdmUgdG8gY2hlY2sgaXQgb3V0IVwiXFxuXFxuUXVlc3Rpb246ICR7cXVlcnl9XFxuQW5zd2VyOmA7XG5cbiAgY29uc3QgaGFuZGxlQmFjayA9ICgpID0+IHtcbiAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgIHJvdXRlci5wdXNoKCcvZGFzaGJvYXJkJyk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ2hhdCA9IGFzeW5jIChlOiBhbnkpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gc2V0IHJlc3BvbnNlIHdpdGggd2hhdGV2ZXIgcHJldmlvdXMgYW5zd2VycyB3ZXJlXG4gICAgaWYgKHJlc3BvbnNlLmxlbmd0aCA8IDEpIHtcbiAgICAgIHNldFJlc3BvbnNlKCcnKTtcbiAgICB9XG4gICAgLy8gYnVpbGQgY29udGV4dHVhbGl6ZWQgcHJvbXB0XG4gICAgY29uc3QgcHJvbXB0UmVzcCA9IGF3YWl0IGZldGNoKCcvYXBpL2J1aWxkUHJvbXB0Jywge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIHByb21wdDogcXVlcnlcbiAgICAgIH0pXG4gICAgfSk7XG5cbiAgICBjb25zdCBwcm9tcHREYXRhID0gYXdhaXQgcHJvbXB0UmVzcC5qc29uKCk7XG4gICAgLy8gc2VuZCB0aGlzIHByb21wdCB0byBjaGF0R1BUXG5cbiAgICBjb25zdCBjaGF0UmVzcCA9IGF3YWl0IGZldGNoKCcvYXBpL2NoYXQnLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi5qc29uJ1xuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgcHJvbXB0OiBwcm9tcHREYXRhLnByb21wdFxuICAgICAgfSlcbiAgICB9KTtcbiAgICBpZiAoIWNoYXRSZXNwLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoY2hhdFJlc3Auc3RhdHVzVGV4dCk7XG4gICAgfVxuICAgIGNvbnN0IGRhdGEgPSBjaGF0UmVzcC5ib2R5O1xuXG4gICAgLy8gdHVybmluZyBpbnRvIHJlYWRhYmxlIHN0cmVhbVxuICAgIGNvbnN0IHJlYWRlciA9IGRhdGEuZ2V0UmVhZGVyKCk7XG4gICAgY29uc3QgZGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcigpO1xuICAgIGxldCBkb25lID0gZmFsc2U7XG5cbiAgICAvLyByZWFkIHRoZSBzdHJlYW1pbmcgY2hhdEdQVCBhbnN3ZXJcbiAgICB3aGlsZSAoIWRvbmUpIHtcbiAgICAgIGNvbnN0IHsgdmFsdWUsIGRvbmU6IGRvbmVSZWFkaW5nIH0gPSBhd2FpdCByZWFkZXIucmVhZCgpO1xuICAgICAgZG9uZSA9IGRvbmVSZWFkaW5nO1xuICAgICAgLy8gZ2V0dGluZyByZWFkIGluIGNodW5rc1xuICAgICAgY29uc3QgY2h1bmtWYWx1ZSA9IGRlY29kZXIuZGVjb2RlKHZhbHVlKTtcbiAgICAgIC8vIHVwZGF0ZSBpbnRlcmZhY2Ugd2l0aCBhbnN3ZXIgaW4gcmVzcG9uc2VzXG4gICAgICBzZXRSZXNwb25zZSgocHJldikgPT4gcHJldiArIGNodW5rVmFsdWUpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXIgY29udGVudC1jZW50ZXIgdy1mdWxsIGgtZnVsbCBiZy1wZXJpd2lua2xlXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1jZW50ZXIgaXRlbXMtY2VudGVyIHctNC81IGgtNC81IGFic29sdXRlIHRvcC0yOCBiZy1saWNvcmljZSBvcGFjaXR5LTcwIHJvdW5kZWQtM3hsIHNoYWRvdy14bCBzaGFkb3ctYmxhY2tcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiByZWxhdGl2ZSB3LTExLzEyIGgtNC81IG1pbi13LVs3NSVdIHNoYWRvdy13aGl0ZSBiZy1ibGFja1wiPlxuICAgICAgICAgIDxidXR0b24gb25DbGljaz17aGFuZGxlQmFja30+XG4gICAgICAgICAgICA8ZGl2PnsnPCd9PC9kaXY+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGF0LWJveFwiPlxuICAgICAgICAgICAgQ2hhdHMgZ28gaGVyZVxuICAgICAgICAgICAge3Jlc3BvbnNlICE9PSBudWxsICYmIDxkaXY+VGVtcCB7cmVzcG9uc2V9PC9kaXY+fVxuICAgICAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwiY2hhdC1mb3JtXCIgb25TdWJtaXQ9e2hhbmRsZUNoYXR9PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoYXQtaW5wdXRcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWw+WW91OjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17cXVlcnl9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0UXVlcnkoZS50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJ1c2VyIGNoYXQgaW5wdXRcIlxuICAgICAgICAgICAgICAgICAgbmFtZT1cInF1ZXJ5XCJcbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwid3JpdGUgeW91ciBtZXNzYWdlIGhlcmVcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuXG4vLyBzdGFydGluZyBjaGF0IG9wZW5haSBhcGkgaGVyZVxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VSb3V0ZXIiLCJDaGF0IiwicXVlcnkiLCJzZXRRdWVyeSIsInJlc3BvbnNlIiwic2V0UmVzcG9uc2UiLCJyb3V0ZXIiLCJoYW5kbGVCYWNrIiwic2V0TG9hZGluZyIsInB1c2giLCJoYW5kbGVDaGF0IiwiZSIsInByb21wdFJlc3AiLCJwcm9tcHREYXRhIiwiY2hhdFJlc3AiLCJkYXRhIiwicmVhZGVyIiwiZGVjb2RlciIsImRvbmUiLCJ2YWx1ZSIsImRvbmVSZWFkaW5nIiwiY2h1bmtWYWx1ZSIsInJlYWQiLCJkZWNvZGUiLCJwcmV2IiwicHJldmVudERlZmF1bHQiLCJsZW5ndGgiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInByb21wdCIsImpzb24iLCJvayIsIkVycm9yIiwic3RhdHVzVGV4dCIsImdldFJlYWRlciIsIlRleHREZWNvZGVyIiwiZGl2IiwiY2xhc3NOYW1lIiwiYnV0dG9uIiwib25DbGljayIsImZvcm0iLCJvblN1Ym1pdCIsImxhYmVsIiwiaW5wdXQiLCJ0eXBlIiwib25DaGFuZ2UiLCJ0YXJnZXQiLCJhcmlhLWxhYmVsIiwibmFtZSIsInBsYWNlaG9sZGVyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-client)/./app/chat/page.tsx\n"));

/***/ })

});