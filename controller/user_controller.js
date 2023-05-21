const userModel = require(`../models/index`).user
const md5 = require(`md5`)
const Op = require(`sequelize`).Op

exports.addUser = (request, response) => {
    let newUser = {
        nama_user: request.body.nama_user,
        role: request.body.role,
        username: request.body.username,
        password: md5(request.body.password)
    }

    userModel.create(newUser)
        .then(result => {
            return response.json({
                success: true,
                data: result,
                message: `new user has been inserted`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })

}

exports.getAllUser = async (request, response) => {
    let user = await userModel.findAll()

    return response.json({
        success: true,
        data: user,
        message: `All user have been loaded`
    })
}

exports.findUser = async (request, response) => {
   let namaUser = request.body.nama_user
   let role = request.body.role
   let username = request.body.username

    let user = await userModel.findAll({
        where: {
            [Op.or]: [
                { nama_user: { [Op.substring]: namaUser } },
                { role: { [Op.substring]: role } },
                { username: { [Op.substring]: username } }
            ]
        }
    })
    return response.json({
        success: true,
        data: user,
        message: `All user have been loaded `
    })
}

exports.updateUser = (request, response) => {
    let dataUser = {
        nama_user: request.body.nama_user,
        role: request.body.role,
        username: request.body.username,
        password: md5(request.body.password)
    }

    let idUser = request.params.id_user

    userModel.update(dataUser, { where: { id_user: idUser } })
        .then(result => {
            return response.json({
                success: true,
                message: `Data user has been updated`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}

exports.deleteUser = (request, response) => {

    let idUser = request.params.id_user

    userModel.destroy({ where: { id_user: idUser } })
        .then(result => {
            return response.json({
                success: true,
                message: `Data user has been delete`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}