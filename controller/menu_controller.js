const menuModel = require("../models/index").menu
const Op = require("sequelize").Op
const path = require("path")
const fs = require(`fs`)
const upload = require(`./upload_gambar`).single(`gambar`)

exports.addMenu = (request, response) => {
    upload(request, response, async (error) => {
        if (error) {
            return response.json({ message: error })
        }

        if (!request.file) {
            return response.json({ message: `Nothing to Upload` })
        }

        let newMenu = {
            nama_menu: request.body.nama_menu,
            jenis: request.body.jenis,
            deskripsi: request.body.deskripsi,
            gambar: request.file.filename,
            harga: request.body.harga
        }

        menuModel.create(newMenu)
            .then((result) => {
                return response.json({
                    success: true,
                    data: result,
                    message: `Menu has been added`,
                })
            })
            .catch((error) => {
                return response.json({
                    success: false,
                    message: error.message,
                })
            })
    })
}

exports.getAllMenu = async (request, response) => {
    let menu = await menuModel.findAll()
    return response.json({
        success: true,
        data: menu,
        message: `All menu has been loaded`,
    })
}

exports.findMenu = async (request, response) => {
    let nama_menu = request.body.nama_menu
    let jenis = request.body.jenis
    let harga = request.body.harga

    let menu = await menuModel.findAll({
        where: {
            [Op.or]: [
                { nama_menu: { [Op.substring]: nama_menu } },
                { jenis: { [Op.substring]: jenis } },
                { harga: { [Op.substring]: harga } },
            ]
        }
    })
    return response.json({
        success: true,
        data: menu,
        message: `All menu has been loaded`,
    })
}

exports.updateMenu = async (request, response) => {
    upload(request, response, async (err) => {
        if (err) {
            return response.json({ message: err })
        }

        let id = request.params.id_menu

        let dataMenu = {
            nama_menu: request.body.nama_menu,
            jenis: request.body.jenis,
            deskripsi: request.body.deskripsi,
            gambar: request.file.filename,
            harga: request.body.harga
        }

        console.log(dataMenu)

        if (request.file) {
            const selectedMenu = await menuModel.findOne({
                where: { id_menu: id },
            })

            const oldGambarMenu = selectedMenu.gambar

            const pathImage = path.join(__dirname, `/../gambar`, oldGambarMenu)
            if (fs.existsSync(pathImage)) {
                fs.unlink(pathImage, (error) => console.log(error))
            }
            dataMenu.gambar = request.file.filename
        }
        menuModel.update(dataMenu, { where: { id_menu: id } })
            .then((result) => {
                return response.json({
                    success: true,
                    message: `Data Menu has been updated`,
                })
            })
            .catch((error) => {
                return response.json({
                    success: false,
                    message: error.message,
                })
            })
    })
}

exports.deleteMenu = (request, response) => {
    let idMenu = request.params.id_menu

    menuModel.destroy({ where: { id_menu: idMenu } })
        .then((result) => {
            return response.json({
                success: true,
                message: `Data Menu has been delete`,
            })
        })
        .catch((error) => {
            return response.json({
                success: false,
                message: error.message,
            })
        })
}