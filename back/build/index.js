"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("colors");
// import './db/connect'
const connect_1 = require("./db/connect");
const routers_1 = require("./routers/routers");
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// app.use(
//   cors({
//     origin: ['*'],
//     origin: ['*'],
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
//     credentials: true
//   })
// )
app.use(express_1.default.json());
//Endpoint unicamente para simular el endpoint de pymes
app.post('/pyme_back', (req, res) => {
    console.log(req.body);
    res.status(200).json(req.body);
});
app.get('/', (req, res) => {
    res.json({ message: 'api on' });
});
app.use('/api', routers_1.apiRouter);
async function main() {
    try {
        console.log('Conectando con base de datos ...'.yellow);
        await connect_1.AppDataSource.initialize();
        console.log('Base de datos conectada!'.cyan);
        app.listen(PORT, () => {
            console.log(`Api on http://localhost:${PORT}`.green);
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log('Error iniciando api : '.red);
            console.error(error.message.yellow);
        }
        console.log(error);
    }
}
main();
// Solo para pruebas durante desarrollo:
require("./auxiliar");
//# sourceMappingURL=index.js.map