import asyncHandler from 'express-async-handler'

import { prisma } from '../prisma.js'

// @desc    Create new card
// @route 	POST /api/cards
// @access  Private
export const createNewCard = asyncHandler(async (req, res) => {
	const { number, cvv, isMain } = req.body

	const card = await prisma.card.create({
		data: {
			number,
			cvv,
			isMain
		}
	})

	res.json(card)
})

// @desc    Update exercise
// @route 	PUT /api/exercises/:id
// @access  Private
export const updateCard = asyncHandler(async (req, res) => {
	const { isMain } = req.body

	try {
		const card = await prisma.card.update({
			where: {
				id: +req.params.id
			},
			data: {
				isMain
			}
		})

		res.json(card)
	} catch (error) {
		res.status(404)
		throw new Error('Card not found!')
	}
})

// @desc    Delete card
// @route 	DELETE /api/cards/:id
// @access  Private
export const deleteCard = asyncHandler(async (req, res) => {
	try {
		const card = await prisma.card.delete({
			where: {
				id: +req.params.id
			}
		})

		res.json({ message: 'Card deleted!' })
	} catch (error) {
		res.status(404)
		throw new Error('Card not found!')
	}
})

// @desc    Get cards
// @route   GET /api/cards
// @access  Private
export const getCard = asyncHandler(async (req, res) => {
	const card = await prisma.card.findUnique({
		where: {
			id: +req.params.id
		}
		//,
		// include: {
		// 	user: true
		// }
	})
	res.json(card)
})

export const getCards = asyncHandler(async (req, res) => {
	const card = await prisma.card.findMany({
		orderBy: {
			createdAt: 'desc'
		}
	})
	res.json(card)
})
