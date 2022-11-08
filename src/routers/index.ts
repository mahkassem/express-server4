import { Router } from "express"
import authRouter from "./auth.router"
import filesRouter from './files.router'
import studentsRouter from './students.router'

const router = Router()

router.use('/auth', authRouter)
router.use("/files", filesRouter)
router.use("/students", studentsRouter)

export default router