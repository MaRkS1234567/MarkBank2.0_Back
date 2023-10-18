import express from 'express'

import { protect } from '../middleware/auth.middleware.js'

import {
	createNewCard,
	deleteCard,
	getCard,
	getCards,
	updateCard
} from './card.controller.js'

const router = express.Router()

router.route('/').post(protect, createNewCard).get(protect, getCards)

router
	.route('/:id')
	.put(protect, updateCard)
	.delete(protect, deleteCard)
	.get(protect, getCard)

export default router
