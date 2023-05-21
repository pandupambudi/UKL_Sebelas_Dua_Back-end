const express = require(`express`)
const app = express()
app.use(express.json())
let transaksiController = require("../controller/transaksi_controller")
const {authorizeKasir} = require(`../controller/auth_controller`)
const {authorizeManajer} = require(`../controller/auth_controller`)

app.post("/", [authorizeKasir], transaksiController.addTransaksi)
app.get("/", [authorizeManajer], transaksiController.getAllTransaksi)
app.put("/:id_transaksi", [authorizeKasir], transaksiController.updateTransaksi)
app.delete("/:id_transaksi", [authorizeKasir], transaksiController.deleteTransaksi)

module.exports = app