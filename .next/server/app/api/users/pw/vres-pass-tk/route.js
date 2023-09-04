"use strict";
(() => {
var exports = {};
exports.id = 2;
exports.ids = [2];
exports.modules = {

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 3663:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 2037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 3533:
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

// NAMESPACE OBJECT: ./src/app/api/users/pw/vres-pass-tk/route.ts
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
// EXTERNAL MODULE: ./node_modules/bcryptjs/index.js
var bcryptjs = __webpack_require__(4989);
var bcryptjs_default = /*#__PURE__*/__webpack_require__.n(bcryptjs);
;// CONCATENATED MODULE: ./src/app/api/users/pw/vres-pass-tk/route.ts



async function POST(req) {
    try {
        const body = await req.json();
        // find user with token
        const user = await userModel/* default */.Z.findOne({
            forgotPasswordToken: body.token
        });
        if (!user) {
            return {
                status: 400,
                json: {
                    error: "Invalid Token"
                }
            };
        }
        if (user.forgotPasswordTokenExpire < Date.now()) {
            return {
                status: 400,
                json: {
                    error: "Token Expired"
                }
            };
        }
        const hashedPassword = await bcryptjs_default().hash(body.password, 10);
        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpire = undefined;
        await user.save();
        return next_response/* default */.Z.json({
            message: "Password Reset Successfully",
            success: true
        });
    } catch (error) {}
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fusers%2Fpw%2Fvres-pass-tk%2Froute&name=app%2Fapi%2Fusers%2Fpw%2Fvres-pass-tk%2Froute&pagePath=private-next-app-dir%2Fapi%2Fusers%2Fpw%2Fvres-pass-tk%2Froute.ts&appDir=C%3A%5Cproject%5Cweb%5Cdemoprojectnextjs%5Csrc%5Capp&appPaths=%2Fapi%2Fusers%2Fpw%2Fvres-pass-tk%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

// @ts-ignore this need to be imported from next/dist to be external


// @ts-expect-error - replaced by webpack/turbopack loader

const AppRouteRouteModule = app_route_module.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/users/pw/vres-pass-tk/route",
        pathname: "/api/users/pw/vres-pass-tk",
        filename: "route",
        bundlePath: "app/api/users/pw/vres-pass-tk/route"
    },
    resolvedPagePath: "C:\\project\\web\\demoprojectnextjs\\src\\app\\api\\users\\pw\\vres-pass-tk\\route.ts",
    nextConfigOutput,
    userland: route_namespaceObject
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "/api/users/pw/vres-pass-tk/route";


//# sourceMappingURL=app-route.js.map

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [587,501,335,989,104], () => (__webpack_exec__(3533)));
module.exports = __webpack_exports__;

})();