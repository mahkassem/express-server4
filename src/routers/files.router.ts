import { Router } from "express"
import { getFileByNameHandler, updateFileByNameHandler, uploadFileHandler } from "../controllers/files.controller"
import { authMiddleware } from "../utils/middlewares/auth.middleware"
import { getFileByNameValidator, updateFileByNameValidator } from "../validators/files.validator"

const filesRouter = Router()

filesRouter.get(
    '/:name', // ? URI
    authMiddleware, // ! Middleware
    getFileByNameValidator, // ! Validator
    getFileByNameHandler // * Handler
)

filesRouter.put(
    '/:name', // ? URI
    updateFileByNameValidator, // ! Validator
    updateFileByNameHandler // * Handler
)

filesRouter.post(
    '/upload', // ? URI
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    uploadFileHandler // * Handler
)

export default filesRouter