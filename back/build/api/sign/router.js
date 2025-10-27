import { Router } from 'express';
import { HttpStatus, UserStatus } from '../../constants/enums';
import apiResponse from '../../utils/apiResponse';
import { SignController } from './controller';
import { validateSchema } from '../../utils/validateSchema';
import { signDocumentSchema } from '../../schemas/SignSchema';
import { statusMiddleware } from '../../middlewares/statusMiddleware';
export const signRouter = Router();
signRouter.post('/', statusMiddleware([UserStatus.COMPLETED]), async (req, res) => {
    const body = validateSchema(req.body, signDocumentSchema);
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
    const userId = res.locals.user.id;
    const response = await SignController.signDocument(userId, body.data?.signRequestId);
    if (response.error) {
        return res.status(HttpStatus.BAD_REQUEST).json(apiResponse(false, response));
    }
    return res.status(HttpStatus.OK).json(apiResponse(true, response));
    //   res.status(HttpStatus.OK).json(apiResponse(true, { message: 'sign router ok' }))
});
