import express from 'express'
import { getJSONData, updateJSONData } from './json.controller'

const router = express.Router()

router.get('/', getJSONData)

router.put('/', updateJSONData)

export { router }
