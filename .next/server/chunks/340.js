"use strict";
exports.id = 340;
exports.ids = [340];
exports.modules = {

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


/***/ }),

/***/ 8340:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ sendEmail)
/* harmony export */ });
/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4098);
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4989);
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _models_utilModels_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1838);
/* harmony import */ var _dbConfig_dbConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(941);




(0,_dbConfig_dbConfig__WEBPACK_IMPORTED_MODULE_3__/* .connect */ .$)();
const sendEmail = async ({ user, emailType, validLoc })=>{
    console.log("mailer", user, emailType, validLoc);
    console.log("mailer", user.toString());
    try {
        console.log("mailer", user, emailType, validLoc);
        console.log("mailer", user._id.toString());
        const encrypt = await bcryptjs__WEBPACK_IMPORTED_MODULE_1___default().hash(user._id.toString(), 10);
        console.log("mailer", encrypt);
        switch(emailType){
            case _models_utilModels_types__WEBPACK_IMPORTED_MODULE_2__/* .EmailType */ .V.VARIFICATION:
                user.verifyToken = encrypt;
                user.verifyTokenExpiry = Date.now() + 3600000;
                break;
            case _models_utilModels_types__WEBPACK_IMPORTED_MODULE_2__/* .EmailType */ .V.FORGOT_PASSWORD:
                user.forgotPasswordToken = encrypt;
                user.forgotPasswordTokenExpiry = Date.now() + 3600000;
                break;
        }
        await user.save();
        var transport = nodemailer__WEBPACK_IMPORTED_MODULE_0__.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "853de67887cac5",
                pass: "caa91a2aa6c641"
            }
        });
        const mailOptions = {
            from: "zaid.azaize@gmail.com",
            to: user.email,
            subject: emailType === _models_utilModels_types__WEBPACK_IMPORTED_MODULE_2__/* .EmailType */ .V.VARIFICATION ? "Verify your Email" : "Reset Your Password ",
            html: `<p>Click <a href="${process.env.DOMAIN}/${validLoc}?token=${encrypt}">here</a> to ${emailType === _models_utilModels_types__WEBPACK_IMPORTED_MODULE_2__/* .EmailType */ .V.VARIFICATION ? "verify your email" : "reset your password"} </p>`
        };
        const responce = await transport.sendMail(mailOptions);
        console.log("mailer", responce);
        return {
            responce,
            success: true
        };
    } catch (error) {
        console.log("mailer", error);
    }
};


/***/ }),

/***/ 1838:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: () => (/* binding */ EmailType)
/* harmony export */ });
var EmailType;
(function(EmailType) {
    EmailType[EmailType["VARIFICATION"] = 0] = "VARIFICATION";
    EmailType[EmailType["FORGOT_PASSWORD"] = 1] = "FORGOT_PASSWORD";
})(EmailType || (EmailType = {}));


/***/ })

};
;