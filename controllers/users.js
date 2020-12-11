const { response } = require("express");
const user = require("../models/user");

const getUsers = async(req, res = response) => {

    const users = await user.find();

    res.json({
        result: true,
        message: users
    });
}

module.exports = {
    getUsers
}