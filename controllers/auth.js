const { response } = require("express");
const bcrypt = require('bcryptjs');
// const { validationResult } = require("express-validator");

const User = require('../models/user');
const { generarJWT } = require("../helpers/jwt");

const registro = async(req, res = response) => {



    const { email, password } = req.body;



    try {

        const existeEmail = await User.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                result: false,
                message: "El correo ya está registrado"
            })
        }

        const user = new User(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //Generar token
        const token = await generarJWT(user.id);

        res.json({
            result: true,
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            result: false,
            message: error
        });
    }


}

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        //Validar email
        const userDB = await User.findOne({ email });
        if (!userDB) {
            return res.status(404).json({
                result: false,
                message: "Email no registrado"
            });
        }

        //Validar contraseña
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if (!validPassword) {
            return res.status(400).json({
                result: false,
                message: "Contraseña no válida"
            });
        }

        //Generar JWT
        const token = await generarJWT(userDB.id);

        res.json({
            result: true,
            message: userDB,
            token
        });


    } catch (error) {
        return res.status(500).json({
            result: false,
            mgs: error
        });
    }

}

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    //Generar nuevo JWT
    const token = await generarJWT(uid);

    //Obtener el usuario
    const user = await User.findById(uid);



    res.json({
        result: true,
        user,
        token
    });
}

// const getUsers = async(req, res = response) => {

//     const user = await User(req.body);
//     res.json({
//         result: true,
//         message: user
//     });
// }

module.exports = {
    registro,
    login,
    renewToken,
    // getUsers

}