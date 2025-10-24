import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from '../entities/User.entity'
import { AuditLog } from '../entities/AuditLog.entity'
import { UserKey } from '../entities/UserKey.entity'
import { ExternalApp } from '../entities/ExternalApp.entity'
import { SignRequest } from '../entities/SignRequest.entity'

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.MODE == 'dev' ? process.env.DATABASE_URL_DEV : process.env.DATABASE_URL,
  logging: process.env.DB_LOGS == undefined,
  entities: [User, AuditLog, UserKey, ExternalApp, SignRequest],
  synchronize: true,
  ssl: process.env.MODE == 'dev' ? false : { rejectUnauthorized: false },
  extra: {
    max: 10, // máximo de conexiones en el pool
    connectionTimeoutMillis: 5000
  }
})
