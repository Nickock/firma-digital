import AuthExternalAppService from './service';
export class AuthExternalAppController {
    static async registerApp(payload) {
        return await AuthExternalAppService.register(payload);
    }
}
