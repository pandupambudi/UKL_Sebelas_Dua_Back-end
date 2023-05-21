const express = require(`express`)
const md5 = require(`md5`)
const jwt = require(`jsonwebtoken`)
const userModel = require(`../models/index`).user

const authenticate = async (request, response) => {
    let dataLogin = {
        username: request.body.username,
        password: md5(request.body.password)
    }

    let dataUser = await userModel.findOne({ where: dataLogin })

    if (dataUser) {

        let payload = JSON.stringify(dataUser)

        let secret = `indo`

        let token = jwt.sign(payload, secret)

        return response.json({
            success: true,
            logged: true,
            message: `Authentication Success`,
            token: token,
            data: dataUser
        })
    }

    return response.json({
        success: false,
        logged: false,
        message: `Authentication Failed. Invalid username or password`
    })
}

const authorizeAdmin = (request, response, next) => {
    let headers = request.headers.authorization

    let tokenKey = headers && headers.split(" ")[1]
    
    if (tokenKey == null) {
        return response.json({
            success: false,
            message: `Unauthorized User`
        })
    }

    let secret = `indo`
   
    jwt.verify(tokenKey, secret, (error, user) => {
        
        if (error) {
            return response.json({
                success: false,
                message: `Invalid token`
            })
        } else {
            if (user.role == "admin") {
                next()
            } else {
                return response.json({
                    success: false,
                    message: 'not admin'
                })
            }
        }
    })
}

const authorizeKasir = (request, response, next) => {
    let headers = request.headers.authorization
    let tokenKey = headers && headers.split(" ")[1]

    if (tokenKey == null) {
        return response.json({
            success: false,
            message: `Unauthorized User`
        })
    }
    
    let secret = `indo`
   
    jwt.verify(tokenKey, secret, (error, user) => {
        
        if (error) {
            return response.json({
                success: false,
                message: `Invalid token`
            })
        } else {
            if (user.role == "kasir") {
                next()
            } else {
                return response.json({
                    success: false,
                    message: `not kasir`
                })
            }
        }
    })
}

const authorizeManajer = (request, response, next) => {
    let headers = request.headers.authorization

    let tokenKey = headers && headers.split(" ")[1]
   
    if (tokenKey == null) {
        return response.json({
            success: false,
            message: `Unauthorized User`
        })
    }
    
    let secret = `indo`
    
    jwt.verify(tokenKey, secret, (error, user) => {
        
        if (error) {
            return response.json({
                success: false,
                message: `Invalid token`
            })
        } else {
            if (user.role == "manajer") {
                next()
            } else {
                return response.json({
                    success: false,
                    message: `not manajer`
                })
            }
        }
    })
}

module.exports = { authenticate, authorizeAdmin, authorizeKasir, authorizeManajer }