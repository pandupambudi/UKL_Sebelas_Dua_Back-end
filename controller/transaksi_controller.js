const detailTransaksiModel = require(`../models/index`).detail_transaksi
const transaksiModel = require(`../models/index`).transaksi
const userModel = require(`../models/index`).user
const mejaModel = require(`../models/index`).meja
const Op = require(`sequelize`).Op
const Sequelize = require("sequelize");
const sequelize = new Sequelize("kasir_cafe", "root", "", {
    host: "localhost",
    dialect: "mysql",
})

exports.addTransaksi = async (request, response) => {
    let meja = request.body.nomor_meja

    let table = await mejaModel.findOne({
        where: {
            [Op.and]: [{ nomor_meja: { [Op.substring]: meja } }],
        },
        attributes: [
            "id_meja",
            "nomor_meja",
            "status_meja",
            "createdAt",
            "updatedAt",
        ],
    })

    let namaUser = request.body.nama_user

    let User = await userModel.findOne({
        where: {
            [Op.and]: [{ nama_user: { [Op.substring]: namaUser } }],
        },
    })

    if (table === null) {
        return response.json({
            success: false,
            message: `Table that you input are not exist`,
        })
    } else if (User === null) {
        return response.json({
            success: false,
            message: `User that you input are not exist`,
        })
    } else {
        let newTransaksi = {
            tgl_transaksi: Date(),
            id_user: request.body.id_user,
            id_meja: request.body.id_meja,
            nama_pelanggan: request.body.nama_pelanggan,
            status: request.body.status

        }

        let mejaCheck = await sequelize.query(
            `SELECT * FROM transaksi WHERE id_meja = ${table.id_meja}`
        )
        if (mejaCheck[0].length === 0) {
            transaksiModel.create(newTransaksi)
                .then((result) => {
                    let idTransaksi = result.id_transaksi
                    let detailTransaksi = request.body.detail_transaksi

                    for (let i = 0; i < detailTransaksi.length; i++) {
                        detailTransaksi[i].id_transaksi = idTransaksi
                    }

                    let newDetail = {
                        id_transaksi: idTransaksi,
                        id_menu: detailTransaksi[0].id_menu,
                        harga: detailTransaksi[0].harga,
                    }

                    detailTransaksiModel.create(newDetail)
                        .then((result) => {
                            return response.json({
                                success: true,
                                message: `New transaction has been inserted`,
                            })
                        })
                        .catch((error) => {
                            return response.json({
                                success: false,
                                message: error.message,
                            })
                        })
                })
                .catch((error) => {
                    return response.json({
                        success: false,
                        message: error.message,
                    })
                })
        } else {
            return response.json({
                success: false,
                message: `Table that you reserve has been booked`,
            })
        }
    }
}

exports.getAllTransaksi = async (request, response) => {
    let transaksi = await transaksiModel.findAll();
    return response.json({
        success: true,
        data: transaksi,
        message: `All transaction has been loaded`,
    })
}

exports.updateTransaksi = async (request, response) => {
    let idTransaksi = request.params.id_transaksi

    let transaksi = {
        tgl_transaksi: Date(),
        id_user: request.body.id_user,
        id_meja: request.body.id_meja,
        nama_pelanggan: request.body.nama_pelanggan,
        status: request.body.status
    }
    transaksiModel.update(transaksi, { where: { id_transaksi: idTransaksi } })
        .then(result => {
            return response.json({
                success: true,
                message: `Data has been updated`,
                data: result
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message,
            })
        })
}


exports.deleteTransaksi = async (request, response) => {
    let idTransaksi = request.params.id_transaksi

    transaksiModel.destroy({ where: { id_transaksi: idTransaksi } })
        .then(result => {
            return response.json({
                success: true,
                message: `Data tipe transaksi has been deleted`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}