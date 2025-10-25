import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import 'colors'
import './db/connect'
import { AppDataSource } from './db/connect'
import { apiRouter } from './routers/routers'
const PORT = process.env.PORT
const app = express()

app.use(cors())

// app.use(
//   cors({
//     origin: ['*'],
//     origin: ['*'],
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
//     credentials: true
//   })
// )

app.use(express.json())

//Endpoint unicamente para simular el endpoint de pymes
app.post('/pyme_back', (req, res) => {
  console.log(req.body)
  res.status(200).json(req.body)
})

app.get('/', (req, res) => {
  res.json({ message: 'api on' })
})

app.use('/api', apiRouter)

async function main() {
  try {
    console.log('Conectando con base de datos ...'.yellow)
    await AppDataSource.initialize()
    console.log('Base de datos conectada!'.cyan)
    app.listen(PORT, () => {
      console.log(`Api on http://localhost:${PORT}`.green)
    })
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error iniciando api : '.red)
      console.error(error.message.yellow)
    }
    console.log(error)
  }
}

await main()

// Solo para pruebas durante desarrollo:
import './auxiliar'
