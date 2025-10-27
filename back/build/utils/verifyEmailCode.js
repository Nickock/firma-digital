"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = verifyEmailCode;
const randomInt_1 = __importDefault(require("./randomInt"));
function verifyEmailCode() {
    let verifyCode = '';
    for (let i = 1; i <= 11; i++) {
        if (i % 4 == 0) {
            verifyCode += '-';
        }
        else {
            verifyCode += (0, randomInt_1.default)(0, 9);
        }
    }
    return verifyCode;
}
//# sourceMappingURL=verifyEmailCode.js.map