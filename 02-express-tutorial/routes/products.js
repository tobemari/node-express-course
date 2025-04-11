const express = require('express')
const router = express.Router()

const {
    getProducts,
    getProduct,
    sortProducts,
} = require('../controllers/products')

router.get('/products', getProducts)
router.get('/products/:productID', getProduct)
router.get('/query', sortProducts)

module.exports = router