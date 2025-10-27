var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { AuditLog } from './AuditLog.entity';
import { UserKey } from './UserKey.entity';
import { UserRole, UserStatus } from '../constants/enums';
let User = class User extends BaseEntity {
};
__decorate([
    Column({ type: 'varchar', nullable: false, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], User.prototype, "pass_hash", void 0);
__decorate([
    Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "secondName", void 0);
__decorate([
    Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "surname", void 0);
__decorate([
    Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "secondSurname", void 0);
__decorate([
    Column({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "birthDate", void 0);
__decorate([
    Column({ type: 'varchar', nullable: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "dni", void 0);
__decorate([
    Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "signHash", void 0);
__decorate([
    Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "verificationEmailCode", void 0);
__decorate([
    Column({ type: 'enum', enum: UserStatus, default: UserStatus.CREATED }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    Column({ type: 'enum', enum: UserRole, default: UserRole.USER }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    OneToMany(() => AuditLog, (auditLog) => auditLog.user),
    __metadata("design:type", Array)
], User.prototype, "auditLogs", void 0);
__decorate([
    OneToOne(() => UserKey, (userKey) => userKey.user, {
        cascade: true,
        nullable: true
    }),
    JoinColumn({ name: 'userKey_id' }),
    __metadata("design:type", UserKey
    // @OneToOne(() => UserKey)
    // @JoinColumn({ name: 'userKey_id' })
    // userKey_id: string
    )
], User.prototype, "userKey", void 0);
User = __decorate([
    Entity()
], User);
export { User };
