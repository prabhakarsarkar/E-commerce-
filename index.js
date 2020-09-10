const express = require("express");
const dotenv=require('dotenv').config()
const jwt = require("jsonwebtoken")
const app = express();
const sekret = process.env.sekret
// this is the midelwere for post methor
app.use(express.json())


//for file require  
// phone schema File
const schema = require("./hasTables/phoneTable")
// laptop schema File
const schema1=require("./hasTables/loptop_schema")
// customer schema file
const schema2= require("./hasTables/customerTable")
// add to cart schema file
const schema3 = require("./hasTables/addcartTable")
// save for later schema file
const schema4 = require("./hasTables/save_for_laterTable")
// cart table schema file
const schema5 = require("./hasTables/cartTable")
// tax table schema file
const schema6 = require("./hasTables/taxTable");
// shipping_region table schema
const schema7 = require("./hasTables/shipping_regionTable")
// orders table schema
const schema8 = require("./hasTables/ordersTable")
// shipping table schema
const schema9 = require("./hasTables/shippingTable")
const schema10 = require("./hasTables/orders_details")

// connection File
const knex = require("./dataConnection/connection")


// import file
// routing for department file  
const department = express.Router();
app.use("/",department);
require("./routers/department")(department,knex)

// routing for category File  

const category = express.Router();
app.use("/",category);
require("./routers/category")(category,knex)

// routing for phone_product File

const phone_product = express.Router();
app.use("/",phone_product)
require("./routers/phone_product")(phone_product,knex)

// Routing for laptop_product

const laptop_product = express.Router();
app.use("/",laptop_product)
require("./routers/laptop_product")(laptop_product,knex)

// Routing for customer

const customer= express.Router();
app.use("/",customer)
require("./routers/customer")(customer,knex,jwt,sekret)

// Router  for  addCartPhone

const addCartPhone = express.Router();
app.use("/",addCartPhone)
require("./routers/addCartPhone")(addCartPhone,knex)

// Router for  addCartLaptop
const addCartLaptop = express.Router();
app.use("/",addCartLaptop)
require("./routers/addCartLaptop")(addCartLaptop,knex)
 
// Router for tax

const tax = express.Router();
app.use("/",tax)
require("./routers/tax")(tax,knex)

// Router for shipping
const shipping = express.Router();
app.use("/",shipping)
require("./routers/shipping")(shipping,knex)

// Router for orders 

const orders = express.Router();
app.use("/",orders)
require("./routers/orders")(orders,knex,jwt,sekret)

let port = process.env.port
app.listen(port,()=>{
    console.log("server  is woring port",port);
    
})