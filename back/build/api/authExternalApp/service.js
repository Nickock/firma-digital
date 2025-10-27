import { ExternalApp } from '../../entities/ExternalApp.entity';
import { AppDataSource } from '../../db/connect';
import crypto from 'crypto';
class AuthExternalAppService {
    constructor() {
        this.externalAppRepo = AppDataSource.getRepository(ExternalApp);
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
export default new AuthExternalAppService();
function generateAPIKey(length = 32) {
    return crypto.randomBytes(length).toString('base64url');
}
