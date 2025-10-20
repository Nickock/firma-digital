import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { User } from './User.entity'
import { AuditLogActions } from '../constants/enums'

@Entity()
export class AuditLog extends BaseEntity {
  @Column({ type: 'enum', enum: AuditLogActions, default: AuditLogActions.USER_CREATED })
  action: AuditLogActions

  @ManyToOne(() => User, (user) => user.auditLogs)
  @JoinColumn({ name: 'user_id' })
  user: User
}
