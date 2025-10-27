"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ExternalApp_entity_1 = require("../../entities/ExternalApp.entity");
const connect_1 = require("../../db/connect");
const crypto_1 = __importDefault(require("crypto"));
class AuthExternalAppService {
    constructor() {
        this.externalAppRepo = connect_1.AppDataSource.getRepository(ExternalApp_entity_1.ExternalApp);
    }
    async register(payload) {
        const extAppExist = await this.externalAppRepo.exists({ where: { email: payload.email } });
        if (extAppExist) {
            return { error: 'Ya existe una empresa registrada con ese correo' };
        }
        const newAppKey = generateAPIKey();
        const newExtApp = this.externalAppRepo.create({
            email: payload.email,
            name: payload.name,
            api_key: newAppKey
        });
        await this.externalAppRepo.save(newExtApp);
        return { apiKey: newAppKey };
    }
}
exports.default = new AuthExternalAppService();
function generateAPIKey(length = 32) {
    return crypto_1.default.randomBytes(length).toString('base64url');
}
//# sourceMappingURL=service.js.map