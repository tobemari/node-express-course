const express = require("express");
const app = express();
const { people, products } = require("./data")
const cookieParser = require("cookie-parser");

const peopleRouter = require("./routes/people.js");
const productsRouter = require("./routes/products.js");

const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date();
    console.log(method, url, time);
    next();
}

const auth = (req, res, next) => {
    if(!req.cookies.name) {
        return res.status(401).json({
            message: "unauthorized"
        });
    }
    req.user = req.cookies.name;
    next();
}

app.use(express.static("./methods-public"), logger);

//parse form data
app.use(express.urlencoded({ extended: false }));

//parse json
app.use(express.json());

app.use(cookieParser());

app.use("/api/v1/people", peopleRouter);
app.use("/api/v1/products", productsRouter);

app.post("/api/v1/logon", (req, res) => {
    const {name} = req.body;
    if(!name) {
       return res.status(400).json({success: false, message: "Please provide a name"})
    }
    res.cookie("name", name).status(201).json({success: true, message: `Hello ${name}`})
})

app.delete("/api/v1/logoff", (req, res) => {
    res.clearCookie("name").status(200).json({
        message: "User logged off successfully",
    });
});

app.get("/api/v1/test", auth, (req, res) => {
    res.status(200).json({message: `Welcome ${req.user}`});
});

// app.get("/api/v1/test", (req, res) => {
//     res.json({
//         message: "It worked!"
//     })
// })

// app.get("/api/v1/people", (req, res) => {
//     res.json(people)
// })

// app.get("/api/v1/products", (req, res) => {
//     res.json(products)
// })

app.get("/api/v1/products/:productID", (req, res) => {
    const idToFind = parseInt(req.params.productID);
    const product = products.find((p) => p.id === idToFind);

    if (!product) {
        return res.status(404).json({
            message: "That product was not found."
        });
    }
    return res.json(product)
})

app.get("/api/v1/query", (req, res) => {
    const {
        search,
        limit,
        price
    } = req.query;

    let sortedProducts = [...products];

    if (search) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search);
        })
    }
    if (price) {
        const maxPrice = parseFloat(price);
        sortedProducts = sortedProducts.filter((product) => {
            return product.price <= maxPrice;
        })
    }
    if (limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit))
    }

    if (sortedProducts.length < 1) {
        res.status(200).send("<h1>No products matched your search</h1>");
    }

    res.json(sortedProducts)
})

// app.post("/api/v1/people", (req, res) => {
//     const {name} = req.body;
//     if (!name) {
//         return res.status(400).json({success: false, message:"please provide name value"})
//     }
//     people.push({ id: people.length + 1, name: req.body.name });
//     res.status(201).json({success: true, name: req.body.name });
// })

app.all("*", (req, res) => {
    res.status(404).send("<h1>Page not found</h1>")
})

app.listen(3000, () => {
    console.log(("Server is listening on port 3000..."));
})

