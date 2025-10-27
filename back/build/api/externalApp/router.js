import { Router } from 'express';
import { HttpStatus } from '../../constants/enums';
import apiResponse from '../../utils/apiResponse';
import { validateSchema } from '../../utils/validateSchema';
import { SignRequestSchema } from '../../schemas/ExternalAppSchema';
import { ExternalAppController, SignRequestController } from './controller';
import { externalAppMiddleware } from '../../middlewares/externalAppMiddleware';
import { validate as isValidUUID } from 'uuid';
export const externalAppRouter = Router();
externalAppRouter.post('/sign-request', externalAppMiddleware(), async (req, res) => {
    const body = validateSchema(req.body, SignRequestSchema);
    if (!body.success) {
        let errorMessage;
        if (body.error) {
            if (typeof body.error === 'string') {
                errorMessage = body.error;
            }
            else if (body.error instanceof Error) {
                errorMessage = body.error.message;
            }
            else {
                errorMessage = JSON.stringify(body.error);
            }
        }
        else {
            errorMessage = 'Verifica tu información';
        }
        return res.status(HttpStatus.BAD_REQUEST).json(apiResponse(false, JSON.parse(errorMessage)));
    }
    const apiId = res.locals.app.id;
    const response = await ExternalAppController.createSignRequest(apiId, body.data);
    if (response.error) {
        res.status(HttpStatus.BAD_REQUEST).json(apiResponse(false, response));
    }
    res.status(HttpStatus.CREATED).json(apiResponse(true, response));
});
externalAppRouter.get('/sign-request', async (req, res) => {
    const signId = req.headers.signid;
    if (!isValidUUID(signId)) {
        return res
            .status(HttpStatus.BAD_REQUEST)
            .json(apiResponse(false, { error: 'No se ha proporcionado un uuid de firma válido.' }));
    }
    const response = await SignRequestController.getSignRequestData(signId);
    if ('error' in response) {
        return res.status(HttpStatus.NOT_FOUND).json(apiResponse(false, response));
    }
    res.status(HttpStatus.OK).json(apiResponse(true, response));
});
