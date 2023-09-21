import express  from "express"
import Authentication from "./Authentication"
import Reference from "./Reference"

const router = express.Router()

router.use(Authentication)
router.use(Reference)

export default router