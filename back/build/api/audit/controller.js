import AuditLogService from './service';
export default class AuditLogController {
    static async create(userId, action) {
        return AuditLogService.create(userId, action);
    }
}
