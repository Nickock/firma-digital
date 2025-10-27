import SignService from './service';
export class SignController {
    static async signDocument(userId, signRequestId) {
        return SignService.sign(userId, signRequestId);
    }
}
