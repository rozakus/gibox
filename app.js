const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const router = require('./routers')
app.use('', router)
app.use('/', (req, res) => res.status(200).json('Welcome to Verita / Gibox Asiignments by Abdul Rozak'))

app.listen(PORT, () => console.log(`>>> LISTEN AT PORT ${PORT}`))