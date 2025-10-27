var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { User } from './User.entity';
let UserKey = class UserKey extends BaseEntity {
};
__decorate([
    Column({ type: 'varchar' }),
    __metadata("design:type", String)
], UserKey.prototype, "private_key_encrypted", void 0);
__decorate([
    Column({ type: 'varchar' }),
    __metadata("design:type", String)
], UserKey.prototype, "public_key", void 0);
__decorate([
    Column({ type: 'varchar' }),
    __metadata("design:type", String)
], UserKey.prototype, "encryptionIv", void 0);
__decorate([
    OneToOne(() => User, (user) => user.userKey),
    JoinColumn(),
    __metadata("design:type", User)
], UserKey.prototype, "user", void 0);
UserKey = __decorate([
    Entity()
], UserKey);
export { UserKey };
