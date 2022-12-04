import express from "express";
import utilController from "./utilController"

const router = express.Router()

router.post('/', utilController.create)

module.exports = router