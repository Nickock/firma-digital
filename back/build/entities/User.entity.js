"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const BaseEntity_1 = require("./BaseEntity");
const AuditLog_entity_1 = require("./AuditLog.entity");
const UserKey_entity_1 = require("./UserKey.entity");
const enums_1 = require("../constants/enums");
let User = class User extends BaseEntity_1.BaseEntity {
};
exports.User = User;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], User.prototype, "pass_hash", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "secondName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "surname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "secondSurname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "birthDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "dni", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "signHash", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "verificationEmailCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.UserStatus, default: enums_1.UserStatus.CREATED }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.UserRole, default: enums_1.UserRole.USER }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => AuditLog_entity_1.AuditLog, (auditLog) => auditLog.user),
    __metadata("design:type", Array)
], User.prototype, "auditLogs", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => UserKey_entity_1.UserKey, (userKey) => userKey.user, {
        cascade: true,
        nullable: true
    }),
    (0, typeorm_1.JoinColumn)({ name: 'userKey_id' }),
    __metadata("design:type", UserKey_entity_1.UserKey
    // @OneToOne(() => UserKey)
    // @JoinColumn({ name: 'userKey_id' })
    // userKey_id: string
    )
], User.prototype, "userKey", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
//# sourceMappingURL=User.entity.js.map