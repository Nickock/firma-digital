var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { ExternalApp } from './ExternalApp.entity';
let SignRequest = class SignRequest extends BaseEntity {
};
__decorate([
    Column({ type: 'varchar', nullable: false /*, unique: true*/ }) //Tal vez haya que eliminar el "unique"
    ,
    __metadata("design:type", String)
], SignRequest.prototype, "doc_hash", void 0);
__decorate([
    Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], SignRequest.prototype, "doc_id", void 0);
__decorate([
    Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], SignRequest.prototype, "doc_url", void 0);
__decorate([
    Column({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], SignRequest.prototype, "callback_url", void 0);
__decorate([
    Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], SignRequest.prototype, "return_url", void 0);
__decorate([
    Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], SignRequest.prototype, "description", void 0);
__decorate([
    Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], SignRequest.prototype, "external_ref", void 0);
__decorate([
    Column({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], SignRequest.prototype, "isSigned", void 0);
__decorate([
    ManyToOne(() => ExternalApp, (externalApp) => externalApp.sign_requests, {
        onDelete: 'CASCADE'
    }),
    JoinColumn({ name: 'externalApp_id' }),
    __metadata("design:type", ExternalApp)
], SignRequest.prototype, "external_app", void 0);
__decorate([
    Column({ name: 'externalApp_id', type: 'uuid' }),
    __metadata("design:type", String)
], SignRequest.prototype, "external_app_id", void 0);
SignRequest = __decorate([
    Entity()
], SignRequest);
export { SignRequest };
