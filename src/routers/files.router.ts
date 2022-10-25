import { Router } from "express"
import { getFileByNameHandler, updateFileByNameHandler } from "../controllers/files.controller"
import { getFileByNameValidator, updateFileByNameValidator } from "../validators/files.validator"

const filesRouter = Router()

filesRouter.get(
    '/:name', // ? URI
    getFileByNameValidator, // ! Validator
    getFileByNameHandler // * Handler
)

filesRouter.put(
    '/:name', // ? URI
    updateFileByNameValidator, // ! Validator
    updateFileByNameHandler // * Handler
)

export default filesRouter