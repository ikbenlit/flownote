"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/verify/route";
exports.ids = ["app/api/auth/verify/route"];
exports.modules = {

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "firebase-admin/app":
/*!*************************************!*\
  !*** external "firebase-admin/app" ***!
  \*************************************/
/***/ ((module) => {

module.exports = import("firebase-admin/app");;

/***/ }),

/***/ "firebase-admin/auth":
/*!**************************************!*\
  !*** external "firebase-admin/auth" ***!
  \**************************************/
/***/ ((module) => {

module.exports = import("firebase-admin/auth");;

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fverify%2Froute&page=%2Fapi%2Fauth%2Fverify%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fverify%2Froute.ts&appDir=C%3A%5Cdevelopment%5Cflownote%5Cfrontend-web%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cdevelopment%5Cflownote%5Cfrontend-web&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fverify%2Froute&page=%2Fapi%2Fauth%2Fverify%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fverify%2Froute.ts&appDir=C%3A%5Cdevelopment%5Cflownote%5Cfrontend-web%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cdevelopment%5Cflownote%5Cfrontend-web&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_development_flownote_frontend_web_app_api_auth_verify_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/verify/route.ts */ \"(rsc)/./app/api/auth/verify/route.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([C_development_flownote_frontend_web_app_api_auth_verify_route_ts__WEBPACK_IMPORTED_MODULE_3__]);\nC_development_flownote_frontend_web_app_api_auth_verify_route_ts__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"standalone\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/verify/route\",\n        pathname: \"/api/auth/verify\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/verify/route\"\n    },\n    resolvedPagePath: \"C:\\\\development\\\\flownote\\\\frontend-web\\\\app\\\\api\\\\auth\\\\verify\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_development_flownote_frontend_web_app_api_auth_verify_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/verify/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGdmVyaWZ5JTJGcm91dGUmcGFnZT0lMkZhcGklMkZhdXRoJTJGdmVyaWZ5JTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYXV0aCUyRnZlcmlmeSUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDZGV2ZWxvcG1lbnQlNUNmbG93bm90ZSU1Q2Zyb250ZW5kLXdlYiU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q2RldmVsb3BtZW50JTVDZmxvd25vdGUlNUNmcm9udGVuZC13ZWImaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9c3RhbmRhbG9uZSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUN5QjtBQUN0RztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCxxQyIsInNvdXJjZXMiOlsid2VicGFjazovL2Zsb3dub3RlLz80ODA5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXGRldmVsb3BtZW50XFxcXGZsb3dub3RlXFxcXGZyb250ZW5kLXdlYlxcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcdmVyaWZ5XFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcInN0YW5kYWxvbmVcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC92ZXJpZnkvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hdXRoL3ZlcmlmeVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC92ZXJpZnkvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxkZXZlbG9wbWVudFxcXFxmbG93bm90ZVxcXFxmcm9udGVuZC13ZWJcXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXHZlcmlmeVxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvYXV0aC92ZXJpZnkvcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fverify%2Froute&page=%2Fapi%2Fauth%2Fverify%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fverify%2Froute.ts&appDir=C%3A%5Cdevelopment%5Cflownote%5Cfrontend-web%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cdevelopment%5Cflownote%5Cfrontend-web&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/verify/route.ts":
/*!**************************************!*\
  !*** ./app/api/auth/verify/route.ts ***!
  \**************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   OPTIONS: () => (/* binding */ OPTIONS)\n/* harmony export */ });\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n/* harmony import */ var _lib_firebase_admin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/firebase-admin */ \"(rsc)/./lib/firebase-admin.ts\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_firebase_admin__WEBPACK_IMPORTED_MODULE_1__]);\n_lib_firebase_admin__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n// Handle CORS preflight requests\nasync function OPTIONS() {\n    return new next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse(null, {\n        status: 204\n    });\n}\nasync function GET() {\n    try {\n        // Haal de session cookie op\n        const cookieStore = (0,next_headers__WEBPACK_IMPORTED_MODULE_0__.cookies)();\n        const session = cookieStore.get(\"session\");\n        if (!session) {\n            return new next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse(JSON.stringify({\n                error: \"Geen session cookie gevonden\"\n            }), {\n                status: 401\n            });\n        }\n        // Verifieer de session met Firebase Admin\n        const decodedClaims = await _lib_firebase_admin__WEBPACK_IMPORTED_MODULE_1__.auth.verifySessionCookie(session.value);\n        // Log voor debugging\n        console.log(\"Session verified:\", {\n            uid: decodedClaims.uid,\n            email: decodedClaims.email\n        });\n        return new next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse(JSON.stringify({\n            uid: decodedClaims.uid,\n            email: decodedClaims.email\n        }));\n    } catch (error) {\n        console.error(\"Session verification error:\", error);\n        return new next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse(JSON.stringify({\n            error: \"Ongeldige session\"\n        }), {\n            status: 401\n        });\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvdmVyaWZ5L3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQXNDO0FBQ0s7QUFDRDtBQUUxQyxpQ0FBaUM7QUFDMUIsZUFBZUc7SUFDcEIsT0FBTyxJQUFJRCxxREFBWUEsQ0FBQyxNQUFNO1FBQUVFLFFBQVE7SUFBSTtBQUM5QztBQUVPLGVBQWVDO0lBQ3BCLElBQUk7UUFDRiw0QkFBNEI7UUFDNUIsTUFBTUMsY0FBY04scURBQU9BO1FBQzNCLE1BQU1PLFVBQVVELFlBQVlFLEdBQUcsQ0FBQztRQUVoQyxJQUFJLENBQUNELFNBQVM7WUFDWixPQUFPLElBQUlMLHFEQUFZQSxDQUNyQk8sS0FBS0MsU0FBUyxDQUFDO2dCQUFFQyxPQUFPO1lBQStCLElBQ3ZEO2dCQUFFUCxRQUFRO1lBQUk7UUFFbEI7UUFFQSwwQ0FBMEM7UUFDMUMsTUFBTVEsZ0JBQWdCLE1BQU1YLHFEQUFJQSxDQUFDWSxtQkFBbUIsQ0FBQ04sUUFBUU8sS0FBSztRQUVsRSxxQkFBcUI7UUFDckJDLFFBQVFDLEdBQUcsQ0FBQyxxQkFBcUI7WUFDL0JDLEtBQUtMLGNBQWNLLEdBQUc7WUFDdEJDLE9BQU9OLGNBQWNNLEtBQUs7UUFDNUI7UUFFQSxPQUFPLElBQUloQixxREFBWUEsQ0FBQ08sS0FBS0MsU0FBUyxDQUFDO1lBQ3JDTyxLQUFLTCxjQUFjSyxHQUFHO1lBQ3RCQyxPQUFPTixjQUFjTSxLQUFLO1FBQzVCO0lBRUYsRUFBRSxPQUFPUCxPQUFPO1FBQ2RJLFFBQVFKLEtBQUssQ0FBQywrQkFBK0JBO1FBQzdDLE9BQU8sSUFBSVQscURBQVlBLENBQ3JCTyxLQUFLQyxTQUFTLENBQUM7WUFBRUMsT0FBTztRQUFvQixJQUM1QztZQUFFUCxRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2Zsb3dub3RlLy4vYXBwL2FwaS9hdXRoL3ZlcmlmeS9yb3V0ZS50cz9jZGQzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvb2tpZXMgfSBmcm9tICduZXh0L2hlYWRlcnMnXHJcbmltcG9ydCB7IGF1dGggfSBmcm9tICdAL2xpYi9maXJlYmFzZS1hZG1pbidcclxuaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInXHJcblxyXG4vLyBIYW5kbGUgQ09SUyBwcmVmbGlnaHQgcmVxdWVzdHNcclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIE9QVElPTlMoKSB7XHJcbiAgcmV0dXJuIG5ldyBOZXh0UmVzcG9uc2UobnVsbCwgeyBzdGF0dXM6IDIwNCB9KVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xyXG4gIHRyeSB7XHJcbiAgICAvLyBIYWFsIGRlIHNlc3Npb24gY29va2llIG9wXHJcbiAgICBjb25zdCBjb29raWVTdG9yZSA9IGNvb2tpZXMoKVxyXG4gICAgY29uc3Qgc2Vzc2lvbiA9IGNvb2tpZVN0b3JlLmdldCgnc2Vzc2lvbicpXHJcblxyXG4gICAgaWYgKCFzZXNzaW9uKSB7XHJcbiAgICAgIHJldHVybiBuZXcgTmV4dFJlc3BvbnNlKFxyXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6ICdHZWVuIHNlc3Npb24gY29va2llIGdldm9uZGVuJyB9KSxcclxuICAgICAgICB7IHN0YXR1czogNDAxIH1cclxuICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFZlcmlmaWVlciBkZSBzZXNzaW9uIG1ldCBGaXJlYmFzZSBBZG1pblxyXG4gICAgY29uc3QgZGVjb2RlZENsYWltcyA9IGF3YWl0IGF1dGgudmVyaWZ5U2Vzc2lvbkNvb2tpZShzZXNzaW9uLnZhbHVlKVxyXG4gICAgXHJcbiAgICAvLyBMb2cgdm9vciBkZWJ1Z2dpbmdcclxuICAgIGNvbnNvbGUubG9nKCdTZXNzaW9uIHZlcmlmaWVkOicsIHtcclxuICAgICAgdWlkOiBkZWNvZGVkQ2xhaW1zLnVpZCxcclxuICAgICAgZW1haWw6IGRlY29kZWRDbGFpbXMuZW1haWxcclxuICAgIH0pXHJcblxyXG4gICAgcmV0dXJuIG5ldyBOZXh0UmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoeyBcclxuICAgICAgdWlkOiBkZWNvZGVkQ2xhaW1zLnVpZCxcclxuICAgICAgZW1haWw6IGRlY29kZWRDbGFpbXMuZW1haWxcclxuICAgIH0pKVxyXG5cclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcignU2Vzc2lvbiB2ZXJpZmljYXRpb24gZXJyb3I6JywgZXJyb3IpXHJcbiAgICByZXR1cm4gbmV3IE5leHRSZXNwb25zZShcclxuICAgICAgSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogJ09uZ2VsZGlnZSBzZXNzaW9uJyB9KSxcclxuICAgICAgeyBzdGF0dXM6IDQwMSB9XHJcbiAgICApXHJcbiAgfVxyXG59ICJdLCJuYW1lcyI6WyJjb29raWVzIiwiYXV0aCIsIk5leHRSZXNwb25zZSIsIk9QVElPTlMiLCJzdGF0dXMiLCJHRVQiLCJjb29raWVTdG9yZSIsInNlc3Npb24iLCJnZXQiLCJKU09OIiwic3RyaW5naWZ5IiwiZXJyb3IiLCJkZWNvZGVkQ2xhaW1zIiwidmVyaWZ5U2Vzc2lvbkNvb2tpZSIsInZhbHVlIiwiY29uc29sZSIsImxvZyIsInVpZCIsImVtYWlsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/verify/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/firebase-admin.ts":
/*!*******************************!*\
  !*** ./lib/firebase-admin.ts ***!
  \*******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   auth: () => (/* binding */ auth)\n/* harmony export */ });\n/* harmony import */ var firebase_admin_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase-admin/app */ \"firebase-admin/app\");\n/* harmony import */ var firebase_admin_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase-admin/auth */ \"firebase-admin/auth\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_admin_app__WEBPACK_IMPORTED_MODULE_0__, firebase_admin_auth__WEBPACK_IMPORTED_MODULE_1__]);\n([firebase_admin_app__WEBPACK_IMPORTED_MODULE_0__, firebase_admin_auth__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n// Import het service account bestand\nconst serviceAccount = __webpack_require__(/*! ./service-account.json */ \"(rsc)/./lib/service-account.json\");\n// Initialiseer Firebase Admin\nconst app = (0,firebase_admin_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)({\n    credential: (0,firebase_admin_app__WEBPACK_IMPORTED_MODULE_0__.cert)(serviceAccount)\n});\nconst auth = (0,firebase_admin_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)(app);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZmlyZWJhc2UtYWRtaW4udHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQXdEO0FBQ1g7QUFFN0MscUNBQXFDO0FBQ3JDLE1BQU1HLGlCQUFpQkMsbUJBQU9BLENBQUM7QUFFL0IsOEJBQThCO0FBQzlCLE1BQU1DLE1BQU1MLGlFQUFhQSxDQUFDO0lBQ3hCTSxZQUFZTCx3REFBSUEsQ0FBQ0U7QUFDbkI7QUFFTyxNQUFNSSxPQUFPTCw0REFBT0EsQ0FBQ0csS0FBSSIsInNvdXJjZXMiOlsid2VicGFjazovL2Zsb3dub3RlLy4vbGliL2ZpcmViYXNlLWFkbWluLnRzPzZhNDQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5pdGlhbGl6ZUFwcCwgY2VydCB9IGZyb20gJ2ZpcmViYXNlLWFkbWluL2FwcCdcclxuaW1wb3J0IHsgZ2V0QXV0aCB9IGZyb20gJ2ZpcmViYXNlLWFkbWluL2F1dGgnXHJcblxyXG4vLyBJbXBvcnQgaGV0IHNlcnZpY2UgYWNjb3VudCBiZXN0YW5kXHJcbmNvbnN0IHNlcnZpY2VBY2NvdW50ID0gcmVxdWlyZSgnLi9zZXJ2aWNlLWFjY291bnQuanNvbicpXHJcblxyXG4vLyBJbml0aWFsaXNlZXIgRmlyZWJhc2UgQWRtaW5cclxuY29uc3QgYXBwID0gaW5pdGlhbGl6ZUFwcCh7XHJcbiAgY3JlZGVudGlhbDogY2VydChzZXJ2aWNlQWNjb3VudClcclxufSlcclxuXHJcbmV4cG9ydCBjb25zdCBhdXRoID0gZ2V0QXV0aChhcHApICJdLCJuYW1lcyI6WyJpbml0aWFsaXplQXBwIiwiY2VydCIsImdldEF1dGgiLCJzZXJ2aWNlQWNjb3VudCIsInJlcXVpcmUiLCJhcHAiLCJjcmVkZW50aWFsIiwiYXV0aCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/firebase-admin.ts\n");

/***/ }),

/***/ "(rsc)/./lib/service-account.json":
/*!**********************************!*\
  !*** ./lib/service-account.json ***!
  \**********************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"type":"service_account","project_id":"flownote-4e36f","private_key_id":"3e6be3260489635ed7dcebb72791b7787bceb503","private_key":"-----BEGIN PRIVATE KEY-----\\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDOJuD2iCjoH+S+\\nM8oE5U9HT8Vw7+2k/omhSQNBy5qPodNoz4uAHOxnIVQvPhqtRjmq9TOZaXVlzqJ2\\nemHES45hJZvSyOOje1Be13VErh6jAVUAfnsh/bjAiIUjTm9tc+D+DgG/qq1SegHw\\nQbC7aUEPEKxieR5PUMTir0Z/J85pn9+pxPlDWoxsm8E3y9oQiAzsQDOKlYQ3Su5G\\nqgG85z+4v5lcHUdZDnD3Sek5JXQsNTzJ+kRAmGcscLx99vvBPPMsUPqy0l5tqy32\\nSaxKNds+mBmA1POZvXH3hupTrXYZ9bDeqzlhh7wj1zf8Ty+iqS0A2+nFEPgNa44A\\n/2zpSRtLAgMBAAECggEAAg5l1eNfVRUWNBUDi5u5n3sV6AArbAltTlEmHrTPgCql\\ng8y7s6IMYF9FzzrS5BB8VOwNgRcACxSwZ2Nb4av4fZfhXO989I2R3aeyDXCNU4ZK\\nLzkTvpJIOfDxbhl+Vmt0tMBToV6Omxh1X0K8K8dNwXBAXhWLMJ8Ii2c27d/qE+0n\\nQ4l+Vvh8vCQ7CZBL2JYvrMb9cWG7CBVzhLZM0qK6MIORqLjawNmvTND4FEHwHO5v\\nQ5yOX7YZcaIyt+2dZqKVm+m7POBzUGGPEArI/lgB9GXVHnjdijr9i41lFKLYEdA7\\ngaDDtA4JKtICN362Z6pCWAGvBAP0pcu97wZ4XdzwAQKBgQDpTWUG6Gf+Rh2Ws09B\\nmVAS9few9zSgZpeusx9tLd38xYpP4wD72KbQ5vapvMYi9dUTw+A4YGF3NpCWAy6O\\nTUWveS1DCBRzr+jZWWvypNGyPdY4Lz2eowOeYP+4vxTgiIG7YojjI1u7ATzLgbw2\\nT62G32RJRbyLWfhWBJ8TZHq8AQKBgQDiNUcNObo3gaI3MLMcjFqEdbEEU/VNoDDn\\nXgz2KG1A9Suju7nfOnbepcJMcOsSRdN2IATnj6gOISeHT7HLpUF02WpNBzn0x0xW\\nwdvQOCDdeNuODh4qXCi2k4JOfPKPxIv2ry4L0K4ljVOWARvW9F9MULEvxJkHsx3k\\nDyLz3jAHSwKBgQDThQHlg2xVkwhci3F+DhwVNMA+x8IE8z7ueyQw/nbXJ9pAl5Va\\nwJBtshlMxwP0ymFHLD3rnyZ+yQ/JklTxW4mkj/7DWV4BjSlVdcdzFI+yRHImOl5p\\np24ud88hlsy8zcahN7LYDESshXCzKYqUyySOtZbc/8bzqLyIcGQxVtYYAQKBgQC7\\nZQ+bcTtHSGkt93YqLEvAeA9RWoxY5mAdC9kJA6yep3yjg50TxMc842z3DoRu+tGX\\nhicJ/gRm0CiC/A56ekijmIlrjpUApyoipS6IbDctwjWAlUmAJiDEP6cvhmsbluOs\\nVKt8tj/OdCnOltSNWpyoCCEBRYjQzB3zFGcMSADZyQKBgQCr/5W1J1nDcBgnQX0y\\nwgcDG69x+F68PU4CQlFP3CTE7S6c8jFwmHrG8L7Hc/wWXKLn3ECLZqh6u6zap6a4\\n1iEsv4mCABEfVsz5wxvlUsaTLDHcS3IYfxcRsK4EjaF1mC9BdDzri5gqfn0NG9Ll\\n1O0OkubMqj9F2UgbIf0ZuEmW/g==\\n-----END PRIVATE KEY-----\\n","client_email":"firebase-adminsdk-fbsvc@flownote-4e36f.iam.gserviceaccount.com","client_id":"112229782537091061159","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40flownote-4e36f.iam.gserviceaccount.com","universe_domain":"googleapis.com"}');

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@opentelemetry"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fverify%2Froute&page=%2Fapi%2Fauth%2Fverify%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fverify%2Froute.ts&appDir=C%3A%5Cdevelopment%5Cflownote%5Cfrontend-web%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cdevelopment%5Cflownote%5Cfrontend-web&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();