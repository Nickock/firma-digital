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
exports.SignRequest = void 0;
const typeorm_1 = require("typeorm");
const BaseEntity_1 = require("./BaseEntity");
const ExternalApp_entity_1 = require("./ExternalApp.entity");
let SignRequest = class SignRequest extends BaseEntity_1.BaseEntity {
};
exports.SignRequest = SignRequest;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false /*, unique: true*/ }) //Tal vez haya que eliminar el "unique"
    ,
    __metadata("design:type", String)
], SignRequest.prototype, "doc_hash", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], SignRequest.prototype, "doc_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], SignRequest.prototype, "doc_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], SignRequest.prototype, "callback_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], SignRequest.prototype, "return_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], SignRequest.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], SignRequest.prototype, "external_ref", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], SignRequest.prototype, "isSigned", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ExternalApp_entity_1.ExternalApp, (externalApp) => externalApp.sign_requests, {
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)({ name: 'externalApp_id' }),
    __metadata("design:type", ExternalApp_entity_1.ExternalApp)
], SignRequest.prototype, "external_app", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'externalApp_id', type: 'uuid' }),
    __metadata("design:type", String)
], SignRequest.prototype, "external_app_id", void 0);
exports.SignRequest = SignRequest = __decorate([
    (0, typeorm_1.Entity)()
], SignRequest);
//# sourceMappingURL=SignRequest.entity.js.map