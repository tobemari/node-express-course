const express = require('express')
const app = express()
const peopleRouter = require('./routes/people')
const productsRouter = require('./routes/products')
const logger = require('./logger')
const cookieParser = require('cookie-parser')
const auth = require('./routes/auth') 

app.use(express.static('./methods-public'))
app.use(logger)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use('/api/v1/people', peopleRouter)
app.use('/api/v1', productsRouter)

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

app.all('*', (req,res)=>{
    res.status(404).send("<h1>Page not Found</h1>")
})

app.listen(3000, ()=>{
    console.log('server is listening on port 3000...');
})