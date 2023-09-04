"use strict";
exports.id = 104;
exports.ids = [104];
exports.modules = {

/***/ 3104:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const userSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({
    userName: {
        type: String,
        required: [
            true,
            "Please enter your name"
        ],
        unique: [
            true,
            "User name already exist"
        ]
    },
    email: {
        type: String,
        required: [
            true,
            "Please enter your email"
        ],
        unique: true
    },
    password: {
        type: String,
        required: [
            true,
            "Please enter your password"
        ]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
});
const User = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).users || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model("users", userSchema);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);


/***/ })

};
;