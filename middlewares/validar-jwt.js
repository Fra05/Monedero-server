const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    //Leer token
    const token = req.header('access-token');

    if (!token) {
        return res.status(401).json({
            result: false,
            message: "No hay token"
        });
    }


    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            result: false,
            message: "Token no válido"
        });
    }
}

module.exports = {
    validarJWT
}