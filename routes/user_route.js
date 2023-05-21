const express = require(`express`)
const app = express()
app.use(express.json())
const userController = require(`../controller/user_controller`)
const {authorizeAdmin} = require(`../controller/auth_controller`)
const {authorizeManajer} = require(`../controller/auth_controller`)

app.post("/", [authorizeAdmin], userController.addUser)
app.get("/", [authorizeManajer], userController.getAllUser)
app.post("/find", [authorizeManajer], userController.findUser)
app.put("/:id_user", [authorizeAdmin], userController.updateUser)
app.delete("/:id_user", [authorizeAdmin], userController.deleteUser);

module.exports = app