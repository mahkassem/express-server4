import { Router } from "express"
import filesRouter from './files.router'
import studentsRouter from './students.router'

const router = Router()

router.use("/files", filesRouter)
router.use("/students", studentsRouter)

export default router