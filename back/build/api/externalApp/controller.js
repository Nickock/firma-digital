"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignRequestController = exports.ExternalAppController = void 0;
const service_1 = __importDefault(require("./service"));
class ExternalAppController {
    static async existByKey(apiKey) {
        return await service_1.default.existByKey(apiKey);
    }
    static async createSignRequest(apiId, data) {
        return await service_1.default.createSignRequest(apiId, data);
    }
}
exports.ExternalAppController = ExternalAppController;
class SignRequestController {
    static async getSignRequestData(id) {
        return await service_1.default.getSignRequestData(id);
    }
}
exports.SignRequestController = SignRequestController;
//# sourceMappingURL=controller.js.map