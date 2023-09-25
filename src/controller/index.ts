import express  from "express"
import Authentication, { ValidateToken, logout } from "./Authentication"
import Reference from "./Reference"

const router = express.Router()

router.use(Authentication)
router.use(ValidateToken)
router.use(Reference)
router.get('/logout',logout)

export default router