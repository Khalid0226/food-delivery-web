import express from 'express'
import { register } from '../controllers/CustomerController.js'
import { login } from '../controllers/CustomerController.js'

const router = express.Router()

router.post('/register',register)

router.post('/login',login)

export default router