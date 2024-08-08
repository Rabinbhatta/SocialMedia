import  express from "express"
import { getUserMessage } from "../controller/messenger.js"

const router = express.Router()

router.get("/:sender",getUserMessage)

export default router