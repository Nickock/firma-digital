import { HttpStatus } from '../constants/enums';
import { verifyToken } from '../utils/jwtUtils';
import apiResponse from '../utils/apiResponse';
export const jwtMiddleware = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return res.status(HttpStatus.BAD_REQUEST).json(apiResponse(false, { error: 'Token no proporcionado' }));
        }
        const token = authorizationHeader.split(' ')[1];
        if (!process.env.JWT_SECRET) {
            return res.status(500);
        }
        const payload = verifyToken(token);
        if (!payload)
            throw Error;
        res.locals.user = payload;
        next();
    }
    catch {
        return res.status(HttpStatus.UNAUTHORIZED).json(apiResponse(false, { error: 'Token inválido o expirado' }));
    }
};
