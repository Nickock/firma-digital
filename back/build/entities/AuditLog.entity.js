var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { User } from './User.entity';
import { AuditLogActions } from '../constants/enums';
let AuditLog = class AuditLog extends BaseEntity {
};
__decorate([
    Column({ type: 'enum', enum: AuditLogActions, default: AuditLogActions.USER_CREATED }),
    __metadata("design:type", String)
], AuditLog.prototype, "action", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.auditLogs),
    JoinColumn({ name: 'user_id' }),
    __metadata("design:type", User)
], AuditLog.prototype, "user", void 0);
AuditLog = __decorate([
    Entity()
], AuditLog);
export { AuditLog };
