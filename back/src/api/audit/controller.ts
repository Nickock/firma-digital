import { AuditLogActions } from '../../constants/enums'
import { IAuditLogResponse } from './interfaces'
import AuditLogService from './service'

export default class AuditLogController {
  static async create(userId: string, action: AuditLogActions): Promise<IAuditLogResponse> {
    return AuditLogService.create(userId, action)
  }
}
