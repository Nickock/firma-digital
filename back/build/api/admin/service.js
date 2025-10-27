"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = require("../../db/connect");
const User_entity_1 = require("../../entities/User.entity");
const enums_1 = require("../../constants/enums");
const controller_1 = __importDefault(require("../audit/controller"));
class AdminService {
    constructor() {
        this.userRepo = connect_1.AppDataSource.getRepository(User_entity_1.User);
    }
    async autentifyUser(idUser) {
        try {
            const user = await this.userRepo.findOne({ where: { id: idUser } });
            if (!user) {
                return { succes: false, error: 'El usuario no existe' };
            }
            if (user.status != enums_1.UserStatus.DATA_UPLOAD) {
                return { succes: false, error: 'El usuario ya está autentificado, o no está listo para estarlo' };
            }
            user.status = enums_1.UserStatus.AUNTENTIFIED;
            await this.userRepo.save(user);
            //Audit log
            try {
                await controller_1.default.create(idUser, enums_1.AuditLogActions.USER_AUNTENTIFIED);
            }
            catch {
                console.error('No se pudo crear el audit log de autenticacion de usuario'.bgYellow);
            }
            return { succes: true };
        }
        catch (error) {
            console.error('[AdminService]:autentifyUser'.bgRed);
            console.error(error);
            return { succes: false, error: 'Error del servidor' };
        }
    }
}
exports.default = new AdminService();
//# sourceMappingURL=service.js.map