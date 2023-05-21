const express = require('express')
const app = express()
app.use(express.json())
const mejaController = require('../controller/meja_controller')
const {authorizeAdmin} = require(`../controller/auth_controller`)
const {authorizeManajer} = require(`../controller/auth_controller`)
 
app.post("/", [authorizeAdmin], mejaController.addMeja)
app.get("/",  [authorizeManajer], mejaController.getAllMeja)
app.post("/find",  [authorizeManajer], mejaController.findMeja)
app.put("/:id_meja", [authorizeAdmin], mejaController.updateMeja)
app.delete("/:id_meja", [authorizeAdmin], mejaController.deleteMeja)

module.exports = app