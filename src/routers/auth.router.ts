import { Router } from "express"
import { loginHandler, registerHandler } from "../controllers/auth.controller"
import { loginValidator, registerValidator } from "../validators/auth.validator"

const authRouter = Router()

authRouter.post(
    '/register', // * URI
    registerValidator, // ? Validator
    registerHandler // ! Handler
)

authRouter.post(
    '/login', // * URI
    loginValidator, // ? Validator
    loginHandler // ! Handler
)

export default authRouter