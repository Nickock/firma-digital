"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = __importDefault(require("./service"));
class AdminController {
    static async autentifyUser(idUser) {
        return await service_1.default.autentifyUser(idUser);
    }
}
exports.default = AdminController;
//# sourceMappingURL=controller.js.map