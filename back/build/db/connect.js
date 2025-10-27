"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_entity_1 = require("../entities/User.entity");
const AuditLog_entity_1 = require("../entities/AuditLog.entity");
const UserKey_entity_1 = require("../entities/UserKey.entity");
const ExternalApp_entity_1 = require("../entities/ExternalApp.entity");
const SignRequest_entity_1 = require("../entities/SignRequest.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: process.env.MODE == 'dev' ? process.env.DATABASE_URL_DEV : process.env.DATABASE_URL,
    logging: process.env.DB_LOGS == 'true',
    // logging: true,
    entities: [User_entity_1.User, AuditLog_entity_1.AuditLog, UserKey_entity_1.UserKey, ExternalApp_entity_1.ExternalApp, SignRequest_entity_1.SignRequest],
    synchronize: process.env.MODE == 'dev',
    ssl: process.env.MODE == 'dev' ? false : { rejectUnauthorized: false },
    extra: {
        max: 10, // máximo de conexiones en el pool
        connectionTimeoutMillis: 5000
    }
});
//# sourceMappingURL=connect.js.map