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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Chat; }\n/* harmony export */ });\n/* harmony import */ var _swc_helpers_async_to_generator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swc/helpers/_/_async_to_generator */ \"(app-client)/./node_modules/@swc/helpers/esm/_async_to_generator.js\");\n/* harmony import */ var _swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @swc/helpers/_/_sliced_to_array */ \"(app-client)/./node_modules/@swc/helpers/esm/_sliced_to_array.js\");\n/* harmony import */ var _swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swc/helpers/_/_ts_values */ \"(app-client)/./node_modules/tslib/tslib.es6.mjs\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-client)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-client)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-client)/./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \n\n\n\n\nvar _s = $RefreshSig$();\n\n\nfunction Chat() {\n    _s();\n    var _useState = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_3__._)((0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\"), 2), query = _useState[0], setQuery = _useState[1];\n    var _useState1 = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_3__._)((0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]), 2), response = _useState1[0], setResponse = _useState1[1];\n    var router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    // const prompt = `You are a kind, gentle and sweet friend who lives in Japan. Answer the question based on the context below to the best of your ability, and if the question cannot be answered based on the context, say \"Ah, sorry. I am not sure about that one, I will have to check it out!\"\\n\\nQuestion: ${query}\\nAnswer:`;\n    var handleBack = function() {\n        setLoading(true);\n        router.push(\"/dashboard\");\n    };\n    var handleChat = function() {\n        var _ref = (0,_swc_helpers_async_to_generator__WEBPACK_IMPORTED_MODULE_4__._)(function(e) {\n            var _loop, promptResp, promptData, chatResp, data, reader, decoder, done;\n            return (0,_swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_5__.__generator)(this, function(_state) {\n                switch(_state.label){\n                    case 0:\n                        _loop = function() {\n                            var _ref, value, doneReading, chunkValue;\n                            return (0,_swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_5__.__generator)(this, function(_state) {\n                                switch(_state.label){\n                                    case 0:\n                                        return [\n                                            4,\n                                            reader.read()\n                                        ];\n                                    case 1:\n                                        _ref = _state.sent(), value = _ref.value, doneReading = _ref.done;\n                                        done = doneReading;\n                                        chunkValue = decoder.decode(value);\n                                        // update interface with answer in responses\n                                        setResponse(function(prev) {\n                                            return prev + chunkValue;\n                                        });\n                                        return [\n                                            2\n                                        ];\n                                }\n                            });\n                        };\n                        e.preventDefault();\n                        // set response with whatever previous answers were\n                        if (response.length < 1) {\n                            setResponse(\"\");\n                        }\n                        return [\n                            4,\n                            fetch(\"/prompt/api\", {\n                                method: \"POST\",\n                                headers: {\n                                    \"Content-Type\": \"application/json\"\n                                },\n                                body: JSON.stringify({\n                                    query: query\n                                })\n                            })\n                        ];\n                    case 1:\n                        promptResp = _state.sent();\n                        console.log(\"promptResp\", promptResp);\n                        return [\n                            4,\n                            promptResp.json()\n                        ];\n                    case 2:\n                        promptData = _state.sent();\n                        // send this prompt to chatGPT\n                        console.log(\"promptData\", promptData);\n                        return [\n                            4,\n                            fetch(\"/chat/api/chat\", {\n                                method: \"POST\",\n                                headers: {\n                                    \"Content-Type\": \"application.json\"\n                                },\n                                body: JSON.stringify({\n                                    prompt: promptData.prompt\n                                })\n                            })\n                        ];\n                    case 3:\n                        chatResp = _state.sent();\n                        if (!chatResp.ok) {\n                            throw new Error(chatResp.statusText);\n                        }\n                        data = chatResp.body;\n                        reader = data.getReader();\n                        decoder = new TextDecoder();\n                        done = false;\n                        _state.label = 4;\n                    case 4:\n                        if (!!done) return [\n                            3,\n                            6\n                        ];\n                        return [\n                            5,\n                            (0,_swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_5__.__values)(_loop())\n                        ];\n                    case 5:\n                        _state.sent();\n                        return [\n                            3,\n                            4\n                        ];\n                    case 6:\n                        return [\n                            2\n                        ];\n                }\n            });\n        });\n        return function handleChat(e) {\n            return _ref.apply(this, arguments);\n        };\n    }();\n    console.log(\"response\", response);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex justify-center items-center content-center w-full h-full bg-periwinkle\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"flex justify-center items-center w-4/5 h-4/5 absolute top-24 bg-licorice opacity-70 rounded-3xl shadow-xl shadow-black\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex flex-col justify-start items-center relative w-11/12 h-5/6 min-w-[75%] shadow-white bg-black rounded-3xl pb-8\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: handleBack,\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                            className: \"text-white\",\n                            children: \"<\"\n                        }, void 0, false, {\n                            fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                            lineNumber: 74,\n                            columnNumber: 13\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                        lineNumber: 73,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"w-10/12 h-4/5 bg-white relative rounded-xl p-12 font-sans overflow-y-auto\",\n                        children: [\n                            \"Chats go here\",\n                            response !== null && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                children: [\n                                    \"Temp \",\n                                    response\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                                lineNumber: 78,\n                                columnNumber: 35\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                        lineNumber: 76,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                        className: \"w-10/12 bg-pink flex justify-start mt-8\",\n                        onSubmit: handleChat,\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"w-full\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                    type: \"text\",\n                                    value: query,\n                                    onChange: function(e) {\n                                        setQuery(e.target.value);\n                                    },\n                                    \"aria-label\": \"user chat input\",\n                                    name: \"query\",\n                                    placeholder: \"write your message here\",\n                                    className: \"rounded-xl w-full p-4 truncate overflow-y-scroll\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                                    lineNumber: 86,\n                                    columnNumber: 15\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                                lineNumber: 84,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                className: \"text-white p-2\",\n                                onClick: handleChat,\n                                children: \"Ask\"\n                            }, void 0, false, {\n                                fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                                lineNumber: 98,\n                                columnNumber: 13\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                        lineNumber: 80,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n                lineNumber: 72,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n            lineNumber: 71,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/mkine/personal-projects/tomoiru-web/app/chat/page.tsx\",\n        lineNumber: 70,\n        columnNumber: 5\n    }, this);\n} // starting chat openai api here\n_s(Chat, \"mF6Qm5c+duSnHWmXIMUEW+aTgGA=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = Chat;\nvar _c;\n$RefreshReg$(_c, \"Chat\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FrQyxjQUFXO29DQUNYQyxNQUFLO29DQUNMQyxhQUFZO29DQUNaWixXQUFVOzs7Ozs7Ozs7OzswQ0FHZCw4REFBQ0M7Z0NBQU9ELFdBQVU7Z0NBQWlCRSxTQUFTbkM7MENBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRcEUsRUFFQSxnQ0FBZ0M7R0F2R1JUOztRQUdQRCxzREFBU0E7OztLQUhGQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvY2hhdC9wYWdlLnRzeD84ZjU5Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50JztcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvbmF2aWdhdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENoYXQoKSB7XG4gIGNvbnN0IFtxdWVyeSwgc2V0UXVlcnldID0gdXNlU3RhdGU8c3RyaW5nPignJyk7XG4gIGNvbnN0IFtyZXNwb25zZSwgc2V0UmVzcG9uc2VdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcblxuICAvLyBjb25zdCBwcm9tcHQgPSBgWW91IGFyZSBhIGtpbmQsIGdlbnRsZSBhbmQgc3dlZXQgZnJpZW5kIHdobyBsaXZlcyBpbiBKYXBhbi4gQW5zd2VyIHRoZSBxdWVzdGlvbiBiYXNlZCBvbiB0aGUgY29udGV4dCBiZWxvdyB0byB0aGUgYmVzdCBvZiB5b3VyIGFiaWxpdHksIGFuZCBpZiB0aGUgcXVlc3Rpb24gY2Fubm90IGJlIGFuc3dlcmVkIGJhc2VkIG9uIHRoZSBjb250ZXh0LCBzYXkgXCJBaCwgc29ycnkuIEkgYW0gbm90IHN1cmUgYWJvdXQgdGhhdCBvbmUsIEkgd2lsbCBoYXZlIHRvIGNoZWNrIGl0IG91dCFcIlxcblxcblF1ZXN0aW9uOiAke3F1ZXJ5fVxcbkFuc3dlcjpgO1xuXG4gIGNvbnN0IGhhbmRsZUJhY2sgPSAoKSA9PiB7XG4gICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICByb3V0ZXIucHVzaCgnL2Rhc2hib2FyZCcpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNoYXQgPSBhc3luYyAoZTogYW55KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vIHNldCByZXNwb25zZSB3aXRoIHdoYXRldmVyIHByZXZpb3VzIGFuc3dlcnMgd2VyZVxuICAgIGlmIChyZXNwb25zZS5sZW5ndGggPCAxKSB7XG4gICAgICBzZXRSZXNwb25zZSgnJyk7XG4gICAgfVxuICAgIC8vIGJ1aWxkIGNvbnRleHR1YWxpemVkIHByb21wdFxuICAgIGNvbnN0IHByb21wdFJlc3AgPSBhd2FpdCBmZXRjaCgnL3Byb21wdC9hcGknLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgcXVlcnk6IHF1ZXJ5XG4gICAgICB9KVxuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKCdwcm9tcHRSZXNwJywgcHJvbXB0UmVzcCk7XG5cbiAgICBjb25zdCBwcm9tcHREYXRhID0gYXdhaXQgcHJvbXB0UmVzcC5qc29uKCk7XG4gICAgLy8gc2VuZCB0aGlzIHByb21wdCB0byBjaGF0R1BUXG4gICAgY29uc29sZS5sb2coJ3Byb21wdERhdGEnLCBwcm9tcHREYXRhKTtcbiAgICBjb25zdCBjaGF0UmVzcCA9IGF3YWl0IGZldGNoKCcvY2hhdC9hcGkvY2hhdCcsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uLmpzb24nXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBwcm9tcHQ6IHByb21wdERhdGEucHJvbXB0XG4gICAgICB9KVxuICAgIH0pO1xuICAgIGlmICghY2hhdFJlc3Aub2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihjaGF0UmVzcC5zdGF0dXNUZXh0KTtcbiAgICB9XG5cbiAgICBjb25zdCBkYXRhID0gY2hhdFJlc3AuYm9keTtcblxuICAgIC8vIHR1cm5pbmcgaW50byByZWFkYWJsZSBzdHJlYW1cbiAgICBjb25zdCByZWFkZXIgPSBkYXRhLmdldFJlYWRlcigpO1xuICAgIGNvbnN0IGRlY29kZXIgPSBuZXcgVGV4dERlY29kZXIoKTtcbiAgICBsZXQgZG9uZSA9IGZhbHNlO1xuXG4gICAgLy8gcmVhZCB0aGUgc3RyZWFtaW5nIGNoYXRHUFQgYW5zd2VyXG4gICAgd2hpbGUgKCFkb25lKSB7XG4gICAgICBjb25zdCB7IHZhbHVlLCBkb25lOiBkb25lUmVhZGluZyB9ID0gYXdhaXQgcmVhZGVyLnJlYWQoKTtcbiAgICAgIGRvbmUgPSBkb25lUmVhZGluZztcbiAgICAgIC8vIGdldHRpbmcgcmVhZCBpbiBjaHVua3NcbiAgICAgIGNvbnN0IGNodW5rVmFsdWUgPSBkZWNvZGVyLmRlY29kZSh2YWx1ZSk7XG4gICAgICAvLyB1cGRhdGUgaW50ZXJmYWNlIHdpdGggYW5zd2VyIGluIHJlc3BvbnNlc1xuICAgICAgc2V0UmVzcG9uc2UoKHByZXYpID0+IHByZXYgKyBjaHVua1ZhbHVlKTtcbiAgICB9XG4gIH07XG4gIGNvbnNvbGUubG9nKCdyZXNwb25zZScsIHJlc3BvbnNlKTtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1jZW50ZXIgaXRlbXMtY2VudGVyIGNvbnRlbnQtY2VudGVyIHctZnVsbCBoLWZ1bGwgYmctcGVyaXdpbmtsZVwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlciB3LTQvNSBoLTQvNSBhYnNvbHV0ZSB0b3AtMjQgYmctbGljb3JpY2Ugb3BhY2l0eS03MCByb3VuZGVkLTN4bCBzaGFkb3cteGwgc2hhZG93LWJsYWNrXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBqdXN0aWZ5LXN0YXJ0IGl0ZW1zLWNlbnRlciByZWxhdGl2ZSB3LTExLzEyIGgtNS82IG1pbi13LVs3NSVdIHNoYWRvdy13aGl0ZSBiZy1ibGFjayByb3VuZGVkLTN4bCBwYi04XCI+XG4gICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVCYWNrfT5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtd2hpdGVcIj57JzwnfTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTAvMTIgaC00LzUgYmctd2hpdGUgcmVsYXRpdmUgcm91bmRlZC14bCBwLTEyIGZvbnQtc2FucyBvdmVyZmxvdy15LWF1dG9cIj5cbiAgICAgICAgICAgIENoYXRzIGdvIGhlcmVcbiAgICAgICAgICAgIHtyZXNwb25zZSAhPT0gbnVsbCAmJiA8ZGl2PlRlbXAge3Jlc3BvbnNlfTwvZGl2Pn1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8Zm9ybVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0xMC8xMiBiZy1waW5rIGZsZXgganVzdGlmeS1zdGFydCBtdC04XCJcbiAgICAgICAgICAgIG9uU3VibWl0PXtoYW5kbGVDaGF0fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsXCI+XG4gICAgICAgICAgICAgIHsvKiA8bGFiZWwgY2xhc3NOYW1lPVwiZm9udC1zYW5zIHRleHQtd2hpdGVcIj5Zb3U6PC9sYWJlbD4gKi99XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17cXVlcnl9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICBzZXRRdWVyeShlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwidXNlciBjaGF0IGlucHV0XCJcbiAgICAgICAgICAgICAgICBuYW1lPVwicXVlcnlcIlxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwid3JpdGUgeW91ciBtZXNzYWdlIGhlcmVcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJvdW5kZWQteGwgdy1mdWxsIHAtNCB0cnVuY2F0ZSBvdmVyZmxvdy15LXNjcm9sbFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwidGV4dC13aGl0ZSBwLTJcIiBvbkNsaWNrPXtoYW5kbGVDaGF0fT5cbiAgICAgICAgICAgICAgQXNrXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbi8vIHN0YXJ0aW5nIGNoYXQgb3BlbmFpIGFwaSBoZXJlXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsInVzZVJvdXRlciIsIkNoYXQiLCJxdWVyeSIsInNldFF1ZXJ5IiwicmVzcG9uc2UiLCJzZXRSZXNwb25zZSIsInJvdXRlciIsImhhbmRsZUJhY2siLCJzZXRMb2FkaW5nIiwicHVzaCIsImhhbmRsZUNoYXQiLCJlIiwicHJvbXB0UmVzcCIsInByb21wdERhdGEiLCJjaGF0UmVzcCIsImRhdGEiLCJyZWFkZXIiLCJkZWNvZGVyIiwiZG9uZSIsInZhbHVlIiwiZG9uZVJlYWRpbmciLCJjaHVua1ZhbHVlIiwicmVhZCIsImRlY29kZSIsInByZXYiLCJwcmV2ZW50RGVmYXVsdCIsImxlbmd0aCIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiY29uc29sZSIsImxvZyIsImpzb24iLCJwcm9tcHQiLCJvayIsIkVycm9yIiwic3RhdHVzVGV4dCIsImdldFJlYWRlciIsIlRleHREZWNvZGVyIiwiZGl2IiwiY2xhc3NOYW1lIiwiYnV0dG9uIiwib25DbGljayIsInNwYW4iLCJmb3JtIiwib25TdWJtaXQiLCJpbnB1dCIsInR5cGUiLCJvbkNoYW5nZSIsInRhcmdldCIsImFyaWEtbGFiZWwiLCJuYW1lIiwicGxhY2Vob2xkZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-client)/./app/chat/page.tsx\n"));

/***/ })

});