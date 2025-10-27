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
exports.AuditLog = void 0;
const typeorm_1 = require("typeorm");
const BaseEntity_1 = require("./BaseEntity");
const User_entity_1 = require("./User.entity");
const enums_1 = require("../constants/enums");
let AuditLog = class AuditLog extends BaseEntity_1.BaseEntity {
};
exports.AuditLog = AuditLog;
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.AuditLogActions, default: enums_1.AuditLogActions.USER_CREATED }),
    __metadata("design:type", String)
], AuditLog.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.User, (user) => user.auditLogs),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", User_entity_1.User)
], AuditLog.prototype, "user", void 0);
exports.AuditLog = AuditLog = __decorate([
    (0, typeorm_1.Entity)()
], AuditLog);
//# sourceMappingURL=AuditLog.entity.js.map