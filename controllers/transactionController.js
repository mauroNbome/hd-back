import asyncHandler from "express-async-handler"
import Transaction from "../models/transactionModel.js"
import mongoose from "mongoose"

// ===================================
// - @desc  Delete one transaction by ID
// - @route  DELETE /api/transaction/:id
// - @access  Public
const deleteTransaction = asyncHandler(async (req, res) => {
    const id = req.params.id
    const transaction = await Transaction.findById(id)

    if (transaction) {
        await transaction.remove()
        res.json({ message: "Transaction removed succesfully" })
    } else {
        res.status(404)
        throw new Error("Transaction not found")
    }
})

// ===================================
// - @desc  Fetch all transactions.
// - @route  GET /api/transaction
// - @access  Public
const getTransactions = asyncHandler(async (req, res) => {
    const transactions = await Transaction.find({})
    res.json(transactions)
})

// ===================================
// - @desc  Fetch a single transaction.
// - @route  GET /api/transaction/:id
// - @access  Public
const getTransactionById = asyncHandler(async (req, res) => {
    const id = req.params.id
    if (mongoose.Types.ObjectId.isValid(id)) {
        // Checking if mongo ID is valid.

        const transaction = await Transaction.findById(id)

        if (!transaction) {
            res.status(404).json({
                ok: false,
                message: "Transaction not found"
            })
        } else {
            res.json(transaction)
        }
    } else {
        res.status(400).json({
            ok: false,
            message:
                "Invalid MongoDB ObjectId. Cannot find matching transactions with an invalid ObjectId."
        })
    }
})

// ===================================
// - @desc  Create a transaction
// - @route  POST /api/transaction/
// - @access  Public
const createTransaction = asyncHandler(async (req, res) => {
    const { amount, concept, date, icon, subcategory, main_category, type } =
        req.body

    const transaction = new Transaction({
        amount,
        concept,
        date,
        icon,
        subcategory,
        main_category,
        type
    })

    console.log(req)

    const createdTransaction = await transaction.save()
    res.status(201).json(createdTransaction)
})

// ===================================
// @desc    Update a transaction
// @route   PUT /api/transaction/:id
// @access  Public
const updateTransaction = asyncHandler(async (req, res) => {
    const { amount, concept, date, icon, subcategory, main_category, type } =
        req.body

    const transaction = await Transaction.findById(req.params.id)

    if (transaction) {
        transaction.amount = amount
        transaction.concept = concept
        transaction.date = date
        transaction.icon = icon
        transaction.subcategory = subcategory
        transaction.main_category = main_category
        transaction.type = type

        const updatedTransaction = await transaction.save()
        res.json(updatedTransaction)
    } else {
        res.status(404)
        throw new Error("Transaction not found")
    }
})

export {
    getTransactions,
    getTransactionById,
    deleteTransaction,
    createTransaction,
    updateTransaction
}
