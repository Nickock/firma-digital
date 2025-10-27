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
exports.UserKey = void 0;
const typeorm_1 = require("typeorm");
const BaseEntity_1 = require("./BaseEntity");
const User_entity_1 = require("./User.entity");
let UserKey = class UserKey extends BaseEntity_1.BaseEntity {
};
exports.UserKey = UserKey;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], UserKey.prototype, "private_key_encrypted", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], UserKey.prototype, "public_key", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], UserKey.prototype, "encryptionIv", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_entity_1.User, (user) => user.userKey),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", User_entity_1.User)
], UserKey.prototype, "user", void 0);
exports.UserKey = UserKey = __decorate([
    (0, typeorm_1.Entity)()
], UserKey);
//# sourceMappingURL=UserKey.entity.js.map