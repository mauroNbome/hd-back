import mongoose from "mongoose"

const transactionSchema = mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true
        },
        concept: {
            type: String,
            required: false
        },
        icon: {
            type: String,
            required: true
        },
        subcategory: {
            type: String,
            required: true
        },

        main_category: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    },
    {
        timestamps: { createdAt: "date", updatedAt: "update_date" }
    }
)

const Transaction = mongoose.model("Transaction", transactionSchema)

export default Transaction
