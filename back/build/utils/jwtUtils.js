import jwt from 'jsonwebtoken';
// export const generateToken = (payload: IjwtPayload) => {
export const generateToken = (payload) => {
    let token = '';
    if (process.env.JWT_SECRET)
        token = jwt.sign({
            id: payload.id,
            role: payload.role,
            status: payload.status
        }, process.env.JWT_SECRET, { expiresIn: process.env.mode == 'dev' ? '24h' : '30min' });
    return token;
};
export const verifyToken = (token) => {
    try {
        if (!process.env.JWT_SECRET)
            throw Error('[JWT ERROR] : No tienes clave secreta definida'.red);
        return jwt.verify(token, process.env.JWT_SECRET);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log('[VerifyToken] : '.bgRed + error.message);
        }
    }
};
