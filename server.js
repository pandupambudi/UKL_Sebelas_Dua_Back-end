const express = require(`express`)
const app = express()
const PORT = 8000
const cors = require(`cors`)
app.use(cors())
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const menuRoute = require(`./routes/menu_route`)
const mejaRoute = require(`./routes/meja_route`)
const userRoute = require(`./routes/user_route`)
const transaksiController = require(`./routes/transaksi_route`)
const auth = require(`./routes/auth_route`)

app.use(`/menu`, menuRoute)
app.use(`/meja`, mejaRoute)
app.use(`/user`, userRoute)
app.use(`/transaksi`, transaksiController)
app.use(`/auth`, auth)

app.use(express.static(__dirname))

app.listen(PORT, () => {
    console.log(`Server of cafe runs on port ${PORT}`)
})