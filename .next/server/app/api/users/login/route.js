"use strict";
(() => {
var exports = {};
exports.id = 373;
exports.ids = [373];
exports.modules = {

/***/ 6517:
/***/ ((module) => {

module.exports = require("lodash");

/***/ }),

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 4300:
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ 3663:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 2037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 2781:
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ 3837:
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ 1307:
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

// NAMESPACE OBJECT: ./src/app/api/users/login/route.ts
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
// EXTERNAL MODULE: ./src/dbConfig/dbConfig.ts
var dbConfig = __webpack_require__(941);
// EXTERNAL MODULE: ./src/models/userModel.js
var userModel = __webpack_require__(3104);
// EXTERNAL MODULE: ./node_modules/next/dist/server/web/exports/next-response.js
var next_response = __webpack_require__(9335);
// EXTERNAL MODULE: ./node_modules/bcryptjs/index.js
var bcryptjs = __webpack_require__(4989);
var bcryptjs_default = /*#__PURE__*/__webpack_require__.n(bcryptjs);
// EXTERNAL MODULE: ./node_modules/jsonwebtoken/index.js
var jsonwebtoken = __webpack_require__(9877);
var jsonwebtoken_default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken);
;// CONCATENATED MODULE: ./src/app/api/users/login/route.ts





(0,dbConfig/* connect */.$)();
async function POST(req) {
    try {
        const { email, password } = await req.json();
        console.log("body", email, password);
        const user = await userModel/* default */.Z.findOne({
            email
        });
        //User found
        console.log("user", user);
        if (!user) {
            return next_response/* default */.Z.json({
                error: "User not found"
            }, {
                status: 404
            });
        }
        //compare passoword
        const isMatch = await bcryptjs_default().compare(password, user.password);
        if (!isMatch) {
            return next_response/* default */.Z.json({
                error: "Password not matched"
            }, {
                status: 400
            });
        }
        const tokenData = {
            id: user._id,
            name: user.name
        };
        const token = jsonwebtoken_default().sign(tokenData, process.env.TOKEN_SECRET, {
            expiresIn: "1d"
        });
        const response = next_response/* default */.Z.json({
            message: "Login success",
            success: true
        });
        response.cookies.set("token", token, {
            httpOnly: true
        });
        return response;
    } catch (error) {
        return next_response/* default */.Z.json({
            error: error.message
        }, {
            status: 500
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fusers%2Flogin%2Froute&name=app%2Fapi%2Fusers%2Flogin%2Froute&pagePath=private-next-app-dir%2Fapi%2Fusers%2Flogin%2Froute.ts&appDir=C%3A%5Cproject%5Cweb%5Cdemoprojectnextjs%5Csrc%5Capp&appPaths=%2Fapi%2Fusers%2Flogin%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

// @ts-ignore this need to be imported from next/dist to be external


// @ts-expect-error - replaced by webpack/turbopack loader

const AppRouteRouteModule = app_route_module.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/users/login/route",
        pathname: "/api/users/login",
        filename: "route",
        bundlePath: "app/api/users/login/route"
    },
    resolvedPagePath: "C:\\project\\web\\demoprojectnextjs\\src\\app\\api\\users\\login\\route.ts",
    nextConfigOutput,
    userland: route_namespaceObject
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "/api/users/login/route";


//# sourceMappingURL=app-route.js.map

/***/ }),

/***/ 941:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ connect)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

async function connect() {
    try {
        console.log(">>> DB is connecting");
        console.log(">>> DB URL", process.env.MONGODB_URL);
        mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(process.env.MONGODB_URL);
        const connection = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().connection);
        connection.on("connected", ()=>{
            console.log("MongoDB database connection established successfully");
        });
        connection.on("error", (err)=>{
            console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
            process.exit();
        });
        console.log(">>> DB is connected");
    } catch (error) {
        console.log("Something went wrong!");
        console.log(error);
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [587,501,335,989,877,104], () => (__webpack_exec__(1307)));
module.exports = __webpack_exports__;

})();