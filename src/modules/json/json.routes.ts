import express from 'express'
const router = express.Router()

import { getJSONData, updateJSONData } from './json.controller.js'

router.get('/', getJSONData)

router.put('/', updateJSONData)

export default router
