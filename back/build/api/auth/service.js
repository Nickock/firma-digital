"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = require("../../db/connect");
const User_entity_1 = require("../../entities/User.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtUtils_1 = require("../../utils/jwtUtils");
const verifyEmailCode_1 = __importDefault(require("../../utils/verifyEmailCode"));
const service_1 = __importDefault(require("../audit/service"));
const enums_1 = require("../../constants/enums");
class AuthService {
    constructor() {
        this.userRepo = connect_1.AppDataSource.getRepository(User_entity_1.User);
    }
    async register(payload) {
        const email = payload.email.toLocaleLowerCase().trim();
        const existUser = await this.userRepo.exists({ where: { email: email } });
        if (existUser) {
            return { token: '', error: 'Ya existe un usuario registrado con este email' };
        }
        const hashedPass = bcrypt_1.default.hashSync(payload.pass, bcrypt_1.default.genSaltSync(Number(process.env.SALT_ROUNDS)));
        // let verifyCode = ''
        // for (let i = 1; i <= 11; i++) {
        //   if (i % 4 == 0) {
        //     verifyCode += '-'
        //   } else {
        //     verifyCode += getRandomInt(0, 9)
        //   }
        // }
        const verifyCode = (0, verifyEmailCode_1.default)();
        const newUser = await this.userRepo.save({ email: email, pass_hash: hashedPass, verificationEmailCode: verifyCode });
        const { id, role, status } = newUser;
        //Audit log
        try {
            await service_1.default.create(id, enums_1.AuditLogActions.USER_CREATED);
        }
        catch {
            console.error('No se pudo crear el auditLog de registro'.bgRed);
        }
        const token = (0, jwtUtils_1.generateToken)({ id: id, role: role, status: status });
        return { token: token, code: verifyCode };
    }
    async login(payload) {
        const email = payload.email.toLocaleLowerCase().trim();
        const existUser = await this.userRepo.findOne({ where: { email: email } });
        if (!existUser) {
            return { token: '', error: 'Credenciales incorrectas' };
        }
        const { id, role, pass_hash, status } = existUser;
        const validPass = bcrypt_1.default.compareSync(payload.pass, pass_hash);
        if (!validPass) {
            return { token: '', error: 'Credenciales incorrectas' };
        }
        const token = (0, jwtUtils_1.generateToken)({ id: id, role: role, status: status });
        return { token: token };
    }
}
exports.default = new AuthService();
//# sourceMappingURL=service.js.map