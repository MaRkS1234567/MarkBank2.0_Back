import express from 'express'

import { protect } from '../middleware/auth.middleware.js'

import {
	createNewTransaction,
	deleteTransaction,
	getTransaction,
	getTransactions
} from './transaction.controller.js'

const router = express.Router()

router
	.route('/')
	.post(protect, createNewTransaction)
	.get(protect, getTransactions)

router
	.route('/:id')
	.delete(protect, deleteTransaction)
	.get(protect, getTransaction)

export default router
