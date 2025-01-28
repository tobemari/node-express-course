const express = require("express");
const router = express.Router();
const { getProducts } = require("../controllers/products.js");

router.get('/', getProducts)

module.exports = router;