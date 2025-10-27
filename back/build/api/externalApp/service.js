"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const ExternalApp_entity_1 = require("../../entities/ExternalApp.entity");
const connect_1 = require("../../db/connect");
const SignRequest_entity_1 = require("../../entities/SignRequest.entity");
class ExternalAppService {
    constructor() {
        this.externalAppRepo = connect_1.AppDataSource.getRepository(ExternalApp_entity_1.ExternalApp);
        this.signRequestRepo = connect_1.AppDataSource.getRepository(SignRequest_entity_1.SignRequest);
    }
    async existByKey(apiKey) {
        try {
            const extApp = await this.externalAppRepo.findOne({ where: { api_key: apiKey } });
            if (extApp == null) {
                return { success: false };
            }
            return { success: true, id: extApp.id };
        }
        catch (error) {
            console.error('ERROR [ExternalAppService:existByKey]'.bgRed);
            console.error(error);
            return { success: false };
        }
    }
    async createSignRequest(apiId, requestData) {
        try {
            const extApp = await this.externalAppRepo.findOne({ where: { id: apiId } /*, relations: ['external_app']*/ });
            if (extApp == null) {
                return { error: 'Api key inválida' };
            }
            const newSignRequest = this.signRequestRepo.create({
                doc_hash: requestData.doc_hash ?? '',
                doc_id: requestData.doc_id ?? '',
                doc_url: requestData.doc_url ?? '',
                callback_url: requestData.callback ?? '',
                return_url: requestData.return_url ?? '',
                description: requestData.description ?? '',
                external_ref: requestData.external_ref ?? '',
                isSigned: false,
                external_app: extApp
                // external_app_id: extApp.id
            });
            const response = await this.signRequestRepo.save(newSignRequest);
            return { requestId: response.id };
        }
        catch (error) {
            if (error instanceof typeorm_1.QueryFailedError && error.driverError.code == '23505') {
                return { error: 'Ya existe una solicitud de firma para este documento' };
            }
            console.error('ERROR [ExternalAppService:createSignRequest]'.bgRed);
            console.error(error);
            return { error: 'Error del servidor' };
        }
    }
    async getSignRequestData(signRequestId) {
        try {
            const signRequest = await this.signRequestRepo.findOne({ where: { id: signRequestId } });
            if (signRequest == null) {
                return { error: 'No existe una solicitud de firma con ese identificador' };
            }
            // const { doc_hash, doc_id, doc_url, callback_url, return_url, description } = signRequest
            const { doc_url, description } = signRequest;
            const signData = {
                //doc_hash,
                //doc_id,
                doc_url,
                // callback_url,
                // return_url,
                description
            };
            return signData;
        }
        catch (error) {
            console.error('ERROR [ExternalAppService:existByKey]'.bgRed);
            console.error(error);
            return { error: 'Error del servidor' };
        }
    }
}
exports.default = new ExternalAppService();
//# sourceMappingURL=service.js.map