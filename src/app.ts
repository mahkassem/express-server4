import express, { Application, json } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import router from './routers'

const app: Application = express()
const port = 3000

app.use(
    cors(),
    json(),
    helmet(),
    morgan('dev')
)

app.use("/api", router)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

export default app