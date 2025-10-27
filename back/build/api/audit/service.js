"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuditLog_entity_1 = require("../../entities/AuditLog.entity");
const connect_1 = require("../../db/connect");
class AuditLogService {
    constructor() {
        this.auditLogRepo = connect_1.AppDataSource.getRepository(AuditLog_entity_1.AuditLog);
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
exports.default = new AuditLogService();
//# sourceMappingURL=service.js.map