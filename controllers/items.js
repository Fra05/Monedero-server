const { response } = require("express");
const item = require("../models/items");

const getItems = async(req, res = response) => {

    const items = await item.find();

    res.json({
        result: true,
        message: items
    });
}

module.exports = {
    getItems
}