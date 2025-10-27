"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const connect_1 = require("../../db/connect");
const User_entity_1 = require("../../entities/User.entity");
const enums_1 = require("../../constants/enums");
const enums_2 = require("../../constants/enums");
// import AuditLogService from '../audit/service'
const controller_1 = __importDefault(require("../audit/controller"));
const verifyEmailCode_1 = __importDefault(require("../../utils/verifyEmailCode"));
const mailService_1 = require("../../services/mailService");
const UserKey_entity_1 = require("../../entities/UserKey.entity");
const keyUtils_1 = __importDefault(require("../../utils/keyUtils"));
class UserService {
    constructor() {
        this.userRepo = connect_1.AppDataSource.getRepository(User_entity_1.User);
        this.userKeyRepo = connect_1.AppDataSource.getRepository(UserKey_entity_1.UserKey);
    }
    async getUserById(idUser) {
        try {
            const user = await this.userRepo.findOne({ where: { id: idUser } });
            if (!user) {
                console.log('USER NO EXISTE');
                return { error: 'El usuario no existe' };
            }
            const { email, name, secondName, surname, secondSurname, birthDate: birthDateAux, dni, phone, status } = user;
            const birthDate = birthDateAux == null ? '' : new Date(birthDateAux).toISOString();
            // console.log(birthDateAux)
            // console.log(birthDate)
            const userDT = {
                email,
                name,
                secondName,
                surname,
                secondSurname,
                birthDate,
                dni,
                phone,
                status
            };
            return { data: userDT };
        }
        catch (error) {
            if (error instanceof Error) {
                console.log('[UserService]:getUserByID :'.bgRed, error.message);
            }
            return { error: 'Error del servidor' };
        }
    }
    async getUserStatus(idUser) {
        try {
            const user = await this.userRepo.findOne({ where: { id: idUser } });
            if (!user) {
                console.log('USER NO EXISTE');
                return { error: 'El usuario no existe' };
            }
            const { status } = user;
            return { status: status };
        }
        catch (error) {
            if (error instanceof Error) {
                console.log('[UserService]:getUserStatus :'.bgRed, error.message);
            }
            return { error: 'Error del servidor' };
        }
    }
    async verifyEmail(payload) {
        try {
            const user = await this.userRepo.findOne({ where: { id: payload.userId } });
            if (!user) {
                return { success: false };
            }
            if (user.verificationEmailCode != payload.verificationCode || user.status != enums_1.UserStatus.CREATED) {
                return { success: false };
            }
            user.status = enums_1.UserStatus.EMAIL_VERIFIED;
            this.userRepo.save(user);
            //Audit log
            try {
                await controller_1.default.create(payload.userId, enums_2.AuditLogActions.EMAIL_VERIFICATION);
            }
            catch {
                console.error('No se pudo crear el auditLog de verificacion de email'.bgYellow);
            }
            return { success: true };
        }
        catch (error) {
            if (error instanceof Error) {
                console.log('[UserService]:verifyEmail :'.bgRed, error.message);
            }
            return { success: false };
        }
    }
    async updateUser(userId, data) {
        try {
            const user = await this.userRepo.findOne({ where: { id: userId } });
            if (!user) {
                return { error: 'El usuario que intentas actualizar, no existe' };
            }
            user.name = data.name;
            user.secondName = data.secondName || '';
            user.surname = data.surname;
            user.secondSurname = data.secondSurname || '';
            user.birthDate = new Date(data.birthDate);
            user.dni = data.dni;
            user.phone = data.phone ?? '';
            user.status = enums_1.UserStatus.DATA_UPLOAD;
            await this.userRepo.save(user);
            //Audit log
            try {
                await controller_1.default.create(userId, enums_2.AuditLogActions.USER_DATA_UPDATED);
            }
            catch {
                console.error('No se pudo crear el auditLog de actualizacion de usuario'.bgYellow);
            }
            return { data: data };
        }
        catch (error) {
            if (error instanceof typeorm_1.QueryFailedError && error.driverError.code == '23505') {
                return { error: 'Ya existe un usuario registrado con ese dni' };
            }
            if (error instanceof Error) {
                console.error('[UserService]:updateUser :'.bgRed, error.message);
            }
            console.error(error);
            return { error: 'Error interno' };
        }
    }
    async addSignHash(userId, data) {
        try {
            const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['userKey'] });
            if (!user) {
                return { error: 'El usuario que intentas actualizar, no existe' };
            }
            // console.log('[DEV]:No olvides activar esta linea al terminar'.bgCyan.red)
            user.status = enums_1.UserStatus.COMPLETED;
            user.signHash = data.signHash;
            //CREAR FIRMA DIGITAL Y SOLO ACTUALIZAR SI LA FIRMA ESTÁ OK
            const { publicKey, privateKey } = keyUtils_1.default.generateRSAKeyPair();
            //      const publicKey = 'Public key de pruebas'
            //      const privateKey = 'Private key de pruebas'
            const { encrypted: private_key_hash, iv } = await keyUtils_1.default.encryptWithHash(privateKey, data.signHash);
            const userKey = this.userKeyRepo.create({
                public_key: publicKey,
                private_key_encrypted: private_key_hash,
                encryptionIv: iv,
                user: user
            });
            await this.userKeyRepo.save(userKey);
            user.userKey = userKey;
            await this.userRepo.save(user);
            //Audit log
            try {
                await controller_1.default.create(userId, enums_2.AuditLogActions.USER_COMPLETED);
            }
            catch {
                console.error('No se pudo crear el auditLog de actualizacion de usuario'.bgYellow);
            }
            return { message: 'Se guardó la firma correctamente' };
        }
        catch (error) {
            if (error instanceof Error) {
                console.log('[UserService]:addSignHash :'.bgRed, error.message);
            }
            return { error: 'Error interno' };
        }
    }
    async generateNewVerifyCode(userId) {
        try {
            const user = await this.userRepo.findOne({ where: { id: userId } });
            if (!user) {
                return { success: false };
            }
            const newCode = (0, verifyEmailCode_1.default)();
            user.verificationEmailCode = newCode;
            await this.userRepo.save(user);
            //Enviar nuevo email
            const newMail = {
                title: 'Codigo de verificación',
                messages: ['Tu nuevo codigo de verificación es :', newCode]
            };
            const subject = '¡Tu nuevo codigo de verificación de email está listo!';
            await (0, mailService_1.sendEmail)(user.email, newMail, subject);
            return { success: true };
        }
        catch (error) {
            console.error('[UserService]:generateNewVerifyCode()'.bgRed);
            console.error(error);
            return { success: false };
        }
    }
    async addBiometricData(userId) {
        try {
            const user = await this.userRepo.findOne({ where: { id: userId } });
            if (!user) {
                return { error: 'El usuario que intentas actualizar, no existe' };
            }
            user.status = enums_1.UserStatus.AUNTENTIFIED;
            await this.userRepo.save(user);
            //Audit log
            try {
                await controller_1.default.create(userId, enums_2.AuditLogActions.USER_AUNTENTIFIED);
            }
            catch {
                console.error('No se pudo crear el auditLog de actualizacion de usuario'.bgYellow);
            }
            return { message: 'Datos biométricos guardados correctamente' };
        }
        catch (error) {
            if (error instanceof Error) {
                console.log('[UserService]:addBiometricData :'.bgRed, error.message);
            }
            return { error: 'Error interno' };
        }
    }
}
exports.default = new UserService();
//# sourceMappingURL=service.js.map