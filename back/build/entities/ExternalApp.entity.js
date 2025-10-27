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
exports.ExternalApp = void 0;
const typeorm_1 = require("typeorm");
const BaseEntity_1 = require("./BaseEntity");
const SignRequest_entity_1 = require("./SignRequest.entity");
let ExternalApp = class ExternalApp extends BaseEntity_1.BaseEntity {
};
exports.ExternalApp = ExternalApp;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false, unique: true }),
    __metadata("design:type", String)
], ExternalApp.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false, unique: false }),
    __metadata("design:type", String)
], ExternalApp.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false, unique: false }),
    __metadata("design:type", String)
], ExternalApp.prototype, "api_key", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => SignRequest_entity_1.SignRequest, (signRequest) => signRequest.external_app),
    __metadata("design:type", Array)
], ExternalApp.prototype, "sign_requests", void 0);
exports.ExternalApp = ExternalApp = __decorate([
    (0, typeorm_1.Entity)()
], ExternalApp);
//# sourceMappingURL=ExternalApp.entity.js.map