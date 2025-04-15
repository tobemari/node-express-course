const { products } = require('../data')

const getProducts = (req, res)=>{ 
    res.status(200).json(products)
}

const getProduct = (req, res)=>{
    const {productID} = req.params;
    const singleProduct = products.find((product)=>product.id === Number(productID))
    if(!singleProduct){
        return res.status(404).json({message: "That product was not found."})
    }
    return res.json(singleProduct)
}

const sortProducts = (req,res)=>{
    let sortedProducts = [...products]
    const {search, minPrice, maxPrice, limit} = req.query
    
    if(search){
        sortedProducts = sortedProducts.filter((product)=>{
            return product.name.startsWith(search)
        })
    }
    if(minPrice || maxPrice){
        sortedProducts = sortedProducts.filter((product)=>{
            const meetsMin = minPrice ? product.price >= parseFloat(minPrice) : true;
            const meetsMax = maxPrice ? product.price <= parseFloat(maxPrice) : true;
            return  meetsMin && meetsMax
        })
    }
    if(limit){
        sortedProducts = sortedProducts.slice(0, Number(limit))
    }
    if(sortedProducts < 1){
        return res.status(200).send('<h1>No Products Matched Your Search</h1>')
    }
    res.status(200).json(sortedProducts)
}

module.exports = {
    getProducts,
    getProduct,
    sortProducts,
}