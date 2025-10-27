"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
const routes_1 = require("../api/auth/routes");
const routes_2 = require("../api/user/routes");
const routes_3 = require("../api/admin/routes");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router_1 = require("../api/externalApp/router");
const router_2 = require("../api/authExternalApp/router");
const router_3 = require("../api/sign/router");
// import { externalAppMiddleware } from '../middlewares/externalAppMiddleware'
exports.apiRouter = (0, express_1.Router)();
exports.apiRouter.use('/auth', routes_1.authRouter);
exports.apiRouter.use('/user', authMiddleware_1.jwtMiddleware, routes_2.userRouter);
exports.apiRouter.use('/admin', authMiddleware_1.jwtMiddleware, routes_3.adminRouter);
exports.apiRouter.use('/auth/external-app', router_2.authExternalAppRouter);
// apiRouter.use('/external-app', externalAppMiddleware(), externalAppRouter)
exports.apiRouter.use('/external-app', router_1.externalAppRouter);
exports.apiRouter.use('/sign', authMiddleware_1.jwtMiddleware, router_3.signRouter);
//# sourceMappingURL=routers.js.map