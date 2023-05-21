const mejaModel = require(`../models/index`).meja
const Op = require(`sequelize`).Op

exports.addMeja = (request, response) => {
    let newMeja = {
        nomor_meja: request.body.nomor_meja,
        status_meja: request.body.status_meja
    }

    mejaModel.create(newMeja)
        .then(result => {
            return response.json({
                success: true,
                data: result,
                message: `new meja has been inserted`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })

}

exports.getAllMeja = async (request, response) => {
    let meja = await mejaModel.findAll()

    return response.json({
        success: true,
        data: meja,
        message: `All meja have been loaded`,
    })
}

exports.findMeja = async (request, response) => {
    let keyword = request.body.keyword

    let meja = await mejaModel.findAll({
        where: {
            [Op.or]: [
                { nomor_meja: { [Op.substring]: keyword } }
            ]
        }
    })
    return response.json({
        success: true,
        data: meja,
        message: `All meja have been loaded `
    })
}

exports.updateMeja = async (request, response) => {
    let idMeja = request.params.id_meja

    let dataMeja = {
        nomor_meja: request.body.nomor_meja,
        status_meja: request.body.status_meja
    }

    mejaModel.update(dataMeja, { where: { id_meja: idMeja } })
        .then((result) => {
            return response.json({
                success: true,
                data: result,
                message: `Data meja has been updated`,
            })
        })
        .catch((error) => {
            return response.json({
                success: false,
                message: error.message,
            })
        })
}

exports.deleteMeja = (request, response) => {
    let idMeja = request.params.id_meja

    mejaModel.destroy({ where: { id_meja: idMeja } })
        .then((result) => {
            return response.json({
                success: true,
                message: `Data meja has been delete`,
            })
        })
        .catch((error) => {
            return response.json({
                success: false,
                message: error.message,
            })
        })
}