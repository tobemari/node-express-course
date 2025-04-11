const express = require('express')
const app = express()
const { products, people } = require('./data')
const peopleRouter = require('./routes/people')
const logger = require('./logger')
const cookieParser = require('cookie-parser')

app.use(express.static('./methods-public'))
app.use(logger)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use('/api/v1/people', peopleRouter)

const auth = ((req, res, next) => {
    const name = req.cookies.name
    if(!name){
        return res.status(401).json({message: "unauthorized"})
    }
    req.user = name
    next()
})

app.post('/logon', (req, res)=>{
    const {name} = req.body
    if(!name){
        return res.status(400).json({message: "Please provide a name"})
    }
    res.cookie('name', req.body.name)
    res.status(201).json({message:`Hello ${name}`})
})

app.delete('/logoff', (req, res)=>{
    res.clearCookie('name')
    res.status(200).json({message: "You are logged off"})
})

app.get('/test', auth, (req, res)=>{
    res.status(200).json({message: `Welcome ${req.user}`})
})

app.get('/about', (req,res,)=>{
    res.status(200).send("<h1>This is About Page</h1>")
})

app.get('/api/v1/products', (req, res)=>{ 
    res.status(200).json(products)
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
        res.status(200).send('<h1>No Products Matched Your Search</h1>')
    }
    res.status(200).json(sortedProducts)
})

app.all('*', (req,res)=>{
    res.status(404).send("<h1>Page not Found</h1>")
})

app.listen(3000, ()=>{
    console.log('server is listening on port 3000...');
})