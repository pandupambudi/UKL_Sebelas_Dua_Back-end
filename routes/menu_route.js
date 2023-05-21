const express = require(`express`)
const app = express()
app.use(express.json())
const menuController = require(`../controller/menu_controller`)
const {authorizeAdmin} = require(`../controller/auth_controller`)
const {authorizeManajer} = require(`../controller/auth_controller`)

app.post("/", [authorizeAdmin], menuController.addMenu)
app.get("/", [authorizeManajer], menuController.getAllMenu)
app.post("/find", [authorizeManajer], menuController.findMenu)
app.put("/:id_menu", [authorizeAdmin], menuController.updateMenu)
app.delete("/:id_menu", [authorizeAdmin], menuController.deleteMenu)

module.exports = app