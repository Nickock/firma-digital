import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { AuditLog } from './AuditLog.entity'
import { UserKey } from './UserKey.entity'
import { UserRole, UserStatus } from '../constants/enums'

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string

  @Column({ type: 'varchar', nullable: false })
  pass_hash: string

  @Column({ type: 'varchar', nullable: true })
  name: string

  @Column({ type: 'varchar', nullable: true })
  secondName: string

  @Column({ type: 'varchar', nullable: true })
  surname: string

  @Column({ type: 'varchar', nullable: true })
  secondSurname: string

  @Column({ type: 'date', nullable: true })
  birthDate: Date

  @Column({ type: 'varchar', nullable: true, unique: true })
  dni: string

  @Column({ type: 'varchar', nullable: true })
  phone: string

  @Column({ type: 'varchar', nullable: true })
  signHash: string

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.CREATED })
  status: UserStatus

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole

  @OneToMany(() => AuditLog, (auditLog) => auditLog.user)
  auditLogs: AuditLog[]

  @OneToOne(() => UserKey)
  @JoinColumn({ name: 'userKey_id' })
  userKey_id: string
}
