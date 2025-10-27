import UserService from './service.js';
export default class UserController {
    static async getUser(userId) {
        return await UserService.getUserById(userId);
    }
    static async verifyEmail(userId, verificationCode) {
        const payload = { userId, verificationCode };
        return await UserService.verifyEmail(payload);
    }
    static async generateNewVerifyCode(userId) {
        return await UserService.generateNewVerifyCode(userId);
    }
    static async updateUser(userId, data) {
        return await UserService.updateUser(userId, data);
    }
    static async getUserStatus(userId) {
        return await UserService.getUserStatus(userId);
    }
    static async addSignHash(userId, data) {
        return await UserService.addSignHash(userId, data);
    }
    static async addBiometricData(userId) {
        return await UserService.addBiometricData(userId);
    }
}
