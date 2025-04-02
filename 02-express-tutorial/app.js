const express = require('express')
const app = express()
const { products } = require("./data");

app.use(express.static('./public'))

app.get('/about', (req,res)=>{
    res.status(200).send("<h1>This is About Page</h1>")
})

app.get('/api/v1/test', (req,res)=>{
    res.json({ message: "It worked!" });
})

app.get('/api/v1/products', (req, res)=>{
    res.json(products)
})

app.get('/api/v1/products/:productID', (req, res)=>{
    const {productID} = req.params;
    const singleProduct = products.find((product)=>product.id === Number(productID))
    if(!singleProduct){
        return res.status(404).json({message: "That product was not found."})
    }
    return res.json(singleProduct)
})

app.get('/api/v1/query', (req,res)=>{
    let sortedProducts = [...products]
    const {search, min, max, limit} = req.query
    if(search){
        sortedProducts = sortedProducts.filter((product)=>{
            return product.name.startsWith(search)
        })
    }
    if(min, max){
        sortedProducts = sortedProducts.filter((product)=>{
            const meetsMin = min ? product.price >= parseFloat(min) : true;
            const meetsMax = max ? product.price <= parseFloat(max) : true;
            return  meetsMin && meetsMax
        })
    }
    if(limit){
        sortedProducts = sortedProducts.slice(0, Number(limit))
    }
    if(sortedProducts < 1){
        res.status(200).send('<h1>No Products Matched Your Search</h1>')
    }
    res.status(200).json(sortedProducts)
})

app.all('*', (req,res)=>{
    res.status(404).send("<h1>Page not Found</h1>")
})

// app.post()

app.listen(3000, ()=>{
    console.log('server is listening on port 3000...');
    
})