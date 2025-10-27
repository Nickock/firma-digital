"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const apiResponse_1 = __importDefault(require("../../utils/apiResponse"));
const validateSchema_1 = require("../../utils/validateSchema");
const UserSchemas_1 = require("../../schemas/UserSchemas");
const enums_1 = require("../../constants/enums");
const controller_1 = __importDefault(require("./controller"));
const statusMiddleware_1 = require("../../middlewares/statusMiddleware");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.get('/', async (req, res) => {
    const response = await controller_1.default.getUser(res.locals.user.id);
    // const response = await UserController.getUser('4e635394-a219-4eb6-a5cc-a45ff30bd3bc')
    if (response.error) {
        res.status(enums_1.HttpStatus.BAD_REQUEST).json((0, apiResponse_1.default)(false, response));
    }
    res.status(enums_1.HttpStatus.OK).json((0, apiResponse_1.default)(true, { ...response.data }));
});
exports.userRouter.post('/verifyEmail/code', (0, statusMiddleware_1.statusMiddleware)([enums_1.UserStatus.CREATED]), async (req, res) => {
    try {
        const userId = res.locals.user.userId;
        const response = await controller_1.default.generateNewVerifyCode(userId);
        if (!response.success) {
            return res
                .status(enums_1.HttpStatus.BAD_REQUEST)
                .json((0, apiResponse_1.default)(false, { error: 'No se pudo completar su solicitud.' }));
        }
        return res
            .status(enums_1.HttpStatus.OK)
            .json((0, apiResponse_1.default)(true, { message: 'Se ha enviado un correo con su nuevo código.' }));
    }
    catch (error) {
        console.error('ERROR'.bgRed, error);
        return res.status(enums_1.HttpStatus.SERVER_ERROR).json((0, apiResponse_1.default)(false, { message: 'Error del servidor' }));
    }
});
exports.userRouter.post('/verifyEmail', (0, statusMiddleware_1.statusMiddleware)([enums_1.UserStatus.CREATED]), async (req, res) => {
    try {
        const body = (0, validateSchema_1.validateSchema)(req.body, UserSchemas_1.verifyEmailSchema);
        if (!body.success) {
            return res.status(enums_1.HttpStatus.BAD_REQUEST).json((0, apiResponse_1.default)(false, { error: 'codigo inválido' }));
        }
        const verifyCode = body.data?.verifyCode;
        const userId = res.locals.user.id;
        const response = await controller_1.default.verifyEmail(userId, verifyCode || '');
        if (response.success) {
            return res
                .status(enums_1.HttpStatus.OK)
                .json((0, apiResponse_1.default)(true, { message: 'Su email ha sido verificado satisfactoriamente.' }));
        }
        return res.status(enums_1.HttpStatus.BAD_REQUEST).json((0, apiResponse_1.default)(false, { error: 'Ha introducido un código inválido.' }));
    }
    catch (err) {
        console.error('ERROR'.bgRed, err);
        return res.status(enums_1.HttpStatus.SERVER_ERROR).json((0, apiResponse_1.default)(false, { error: 'Error del servidor' }));
    }
});
exports.userRouter.patch('/', (0, statusMiddleware_1.statusMiddleware)([enums_1.UserStatus.EMAIL_VERIFIED, enums_1.UserStatus.DATA_UPLOAD, enums_1.UserStatus.AUNTENTIFIED, enums_1.UserStatus.COMPLETED]), async (req, res) => {
    // try {
    const body = (0, validateSchema_1.validateSchema)(req.body, UserSchemas_1.updateUserSchema);
    if (!body.success) {
        console.log(body.error);
        return res.status(enums_1.HttpStatus.BAD_REQUEST).json((0, apiResponse_1.default)(false, JSON.parse(body.error?.message ?? '')));
    }
    const response = await controller_1.default.updateUser(res.locals.user.id, body.data);
    console.log(response);
    if (response.error) {
        return res.status(enums_1.HttpStatus.CONFLICT).json((0, apiResponse_1.default)(false, response));
    }
    return res
        .status(enums_1.HttpStatus.CREATED)
        .json((0, apiResponse_1.default)(true, { message: 'Usuario actualizado correctmente', data: body.data }));
    // } catch (err) {
    //   console.error('ERROR'.bgRed)
    //   console.error(err)
    //   res.status(HttpStatus.SERVER_ERROR).json(apiResponse(false, { error: 'Error del servidor' }))
    // }
});
exports.userRouter.get('/status', async (req, res) => {
    const response = await controller_1.default.getUserStatus(res.locals.user.id);
    if (response.error) {
        res.status(enums_1.HttpStatus.BAD_REQUEST).json((0, apiResponse_1.default)(false, response));
    }
    res.status(enums_1.HttpStatus.OK).json((0, apiResponse_1.default)(true, { ...response }));
    // res.status(200).json(apiResponse(true, { message: 'tuki' }))
});
exports.userRouter.patch('/autentify', (0, statusMiddleware_1.statusMiddleware)([enums_1.UserStatus.DATA_UPLOAD]), async (req, res) => {
    const response = await controller_1.default.addBiometricData(res.locals.user.id);
    if (response.error) {
        res.status(enums_1.HttpStatus.BAD_REQUEST).json((0, apiResponse_1.default)(false, { ...response }));
    }
    res.status(enums_1.HttpStatus.OK).json((0, apiResponse_1.default)(true, { ...response }));
});
exports.userRouter.patch('/sign', (0, statusMiddleware_1.statusMiddleware)([enums_1.UserStatus.AUNTENTIFIED]), async (req, res) => {
    const body = (0, validateSchema_1.validateSchema)(req.body, UserSchemas_1.signHashSchema);
    if (!body.success || body.data == undefined) {
        console.log(body.error);
        return res.status(enums_1.HttpStatus.BAD_REQUEST).json((0, apiResponse_1.default)(false, JSON.parse(body.error?.message ?? '')));
    }
    const response = await controller_1.default.addSignHash(res.locals.user.id, body.data);
    if (response.error) {
        res.status(enums_1.HttpStatus.BAD_REQUEST).json((0, apiResponse_1.default)(false, response));
    }
    res.status(enums_1.HttpStatus.OK).json((0, apiResponse_1.default)(true, response));
});
//# sourceMappingURL=routes.js.map