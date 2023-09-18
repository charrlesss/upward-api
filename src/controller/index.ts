import express  from "express"
import Authentication from "./Authentication"

const router = express.Router()

router.use(Authentication)

export default router