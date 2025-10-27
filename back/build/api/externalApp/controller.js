import ExternalAppService from './service';
export class ExternalAppController {
    static async existByKey(apiKey) {
        return await ExternalAppService.existByKey(apiKey);
    }
    static async createSignRequest(apiId, data) {
        return await ExternalAppService.createSignRequest(apiId, data);
    }
}
export class SignRequestController {
    static async getSignRequestData(id) {
        return await ExternalAppService.getSignRequestData(id);
    }
}
