import express from "express"
const router = express.Router()

import {
    getTransactionById,
    getTransactions,
    deleteTransaction,
    createTransaction,
    updateTransaction
} from "../controllers/transactionController.js"

router.route("/").get(getTransactions).post(createTransaction)
router
    .route("/:id")
    .get(getTransactionById)
    .delete(deleteTransaction)
    .put(updateTransaction)

export default router
