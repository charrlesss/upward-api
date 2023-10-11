import express  from "express"
import Authentication, { ValidateToken, logout } from "./Authentication"
import Reference from "./Reference"
import Task from "./Task"

const router = express.Router()

router.use(Authentication)
router.use(ValidateToken)
router.use(Reference)
router.use(Task)
router.get('/logout',logout)

export default router