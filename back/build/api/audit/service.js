import { AuditLog } from '../../entities/AuditLog.entity';
import { AppDataSource } from '../../db/connect';
class AuditLogService {
    constructor() {
        this.auditLogRepo = AppDataSource.getRepository(AuditLog);
    }
    async create(userId, action) {
        try {
            const auditLog = this.auditLogRepo.create({ user: { id: userId }, action: action });
            await this.auditLogRepo.save(auditLog);
            return { success: true };
        }
        catch (error) {
            console.error('[AuditLogService]:create'.bgRed);
            console.error(error);
            return { success: false, error: 'Error al crear auditLog' };
        }
    }
}
export default new AuditLogService();
