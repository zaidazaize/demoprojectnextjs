"use strict";
(() => {
var exports = {};
exports.id = 570;
exports.ids = [570];
exports.modules = {

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 2081:
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ 3663:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 9523:
/***/ ((module) => {

module.exports = require("dns");

/***/ }),

/***/ 2361:
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ 7147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 3685:
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ 5687:
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ 1808:
/***/ ((module) => {

module.exports = require("net");

/***/ }),

/***/ 2037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 1017:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 5477:
/***/ ((module) => {

module.exports = require("punycode");

/***/ }),

/***/ 2781:
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ 4404:
/***/ ((module) => {

module.exports = require("tls");

/***/ }),

/***/ 7310:
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ 3837:
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ 9796:
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ 1753:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  headerHooks: () => (/* binding */ headerHooks),
  originalPathname: () => (/* binding */ originalPathname),
  requestAsyncStorage: () => (/* binding */ requestAsyncStorage),
  routeModule: () => (/* binding */ routeModule),
  serverHooks: () => (/* binding */ serverHooks),
  staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),
  staticGenerationBailout: () => (/* binding */ staticGenerationBailout)
});

// NAMESPACE OBJECT: ./src/app/api/users/pw/gen-reset-link/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  POST: () => (POST)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(2394);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(9692);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-kind.js
var route_kind = __webpack_require__(9513);
// EXTERNAL MODULE: ./node_modules/next/dist/server/web/exports/next-response.js
var next_response = __webpack_require__(9335);
// EXTERNAL MODULE: ./src/models/userModel.js
var userModel = __webpack_require__(3104);
// EXTERNAL MODULE: ./src/helpers/mailer.ts
var mailer = __webpack_require__(8340);
// EXTERNAL MODULE: ./src/models/utilModels/types.tsx
var types = __webpack_require__(1838);
// EXTERNAL MODULE: ./src/dbConfig/dbConfig.ts
var dbConfig = __webpack_require__(941);
;// CONCATENATED MODULE: ./src/app/api/users/pw/gen-reset-link/route.ts





(0,dbConfig/* connect */.$)();
async function POST(req) {
    try {
        const body = await req.json();
        console.log(body);
        const user = await userModel/* default */.Z.findOne({
            email: body.email
        });
        console.log(user);
        if (!user) {
            return next_response/* default */.Z.json({
                error: "User not found",
                success: false
            });
        }
        const mail = await (0,mailer/* sendEmail */.C)({
            user: user,
            emailType: types/* EmailType */.V.FORGOT_PASSWORD,
            validLoc: "reset-password/create-new-password"
        });
        console.log(mail);
        if (mail?.success) {
            return next_response/* default */.Z.json({
                message: "Email sent successfully",
                success: true
            });
        } else {
            return next_response/* default */.Z.json({
                error: "Email not sent",
                success: false
            });
        }
    } catch (error) {
        next_response/* default */.Z.json({
            error: error.message,
            success: false
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fusers%2Fpw%2Fgen-reset-link%2Froute&name=app%2Fapi%2Fusers%2Fpw%2Fgen-reset-link%2Froute&pagePath=private-next-app-dir%2Fapi%2Fusers%2Fpw%2Fgen-reset-link%2Froute.ts&appDir=C%3A%5Cproject%5Cweb%5Cdemoprojectnextjs%5Csrc%5Capp&appPaths=%2Fapi%2Fusers%2Fpw%2Fgen-reset-link%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

// @ts-ignore this need to be imported from next/dist to be external


// @ts-expect-error - replaced by webpack/turbopack loader

const AppRouteRouteModule = app_route_module.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/users/pw/gen-reset-link/route",
        pathname: "/api/users/pw/gen-reset-link",
        filename: "route",
        bundlePath: "app/api/users/pw/gen-reset-link/route"
    },
    resolvedPagePath: "C:\\project\\web\\demoprojectnextjs\\src\\app\\api\\users\\pw\\gen-reset-link\\route.ts",
    nextConfigOutput,
    userland: route_namespaceObject
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "/api/users/pw/gen-reset-link/route";


//# sourceMappingURL=app-route.js.map

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [587,501,335,989,98,104,340], () => (__webpack_exec__(1753)));
module.exports = __webpack_exports__;

})();