import asyncHandler from 'express-async-handler'

import { prisma } from '../prisma.js'

// @desc    Create new transaction
// @route 	POST /api/transactions
// @access  Private
export const createNewTransaction = asyncHandler(async (req, res) => {
	const { sum, isTopUp } = req.body

	const transaction = await prisma.transaction.create({
		data: {
			sum,
			isTopUp
		}
	})

	res.json(transaction)
})

// @desc    Delete transaction
// @route 	DELETE /api/transactions/:id
// @access  Private
export const deleteTransaction = asyncHandler(async (req, res) => {
	try {
		const transaction = await prisma.transaction.delete({
			where: {
				id: +req.params.id
			}
		})

		res.json({ message: 'Transaction deleted!' })
	} catch (error) {
		res.status(404)
		throw new Error('Transaction not found!')
	}
})

export const getTransaction = asyncHandler(async (req, res) => {
	const transaction = await prisma.transaction.findUnique({
		where: {
			id: +req.params.id
		}
		//,
		// include: {
		// 	user: true,
		//  card: true
		// }
	})
	res.json(transaction)
})

// @desc    Get transactions
// @route   GET /api/transactions
// @access  Private
export const getTransactions = asyncHandler(async (req, res) => {
	const transaction = await prisma.transaction.findMany({
		orderBy: {
			createdAt: 'desc'
		}
	})
	res.json(transaction)
})
