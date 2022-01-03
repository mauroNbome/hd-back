import express from "express"
import dotenv from "dotenv"
import path from "path"
import colors from "colors"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import connectDB from "./config/db.js"

import transactionRoutes from "./routes/transactionRoutes.js"

dotenv.config()

connectDB()

const app = express()

// It allow us access from our local app.
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")
    res.setHeader("Access-Control-Allow-Credentials", true)
    next()
})

// It allow us to accept JSON in the body.

app.use(express.json())

app.use("/api/transaction", transactionRoutes)

if (process.env.NODE_ENV === "production") {
    // app.use(express.static(path.join(__dirname, "/productos-front/dist")))

    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "productos-front", "dist", "index.html")
        )
    })
} else {
    app.get("/", (req, res) => {
        res.send("API is running...")
    })
}

// Middlewares.
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
            .bold
    )
)
