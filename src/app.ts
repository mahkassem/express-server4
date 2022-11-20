import express, { Application, json, urlencoded } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import router from './routers'
import fileUpload from 'express-fileupload'

const app: Application = express()
const port = 3000

app.use(
    cors(),
    json(),
    urlencoded({ extended: true }),
    helmet(),
    morgan('dev')
)

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    limits: { fileSize: 2 * 1024 * 1024 },
    abortOnLimit: true,
    responseOnLimit: 'File size limit has been reached'
}))

app.use("/api", router)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

export default app