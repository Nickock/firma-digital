"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// export const generateToken = (payload: IjwtPayload) => {
const generateToken = (payload) => {
    let token = '';
    if (process.env.JWT_SECRET)
        token = jsonwebtoken_1.default.sign({
            id: payload.id,
            role: payload.role,
            status: payload.status
        }, process.env.JWT_SECRET, { expiresIn: process.env.mode == 'dev' ? '24h' : '30min' });
    return token;
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        if (!process.env.JWT_SECRET)
            throw Error('[JWT ERROR] : No tienes clave secreta definida'.red);
        return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log('[VerifyToken] : '.bgRed + error.message);
        }
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwtUtils.js.map