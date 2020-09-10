module.exports = (orders, knex, jwt, serket) => {
    orders.post("/orders", (req, res) => {
        let cart_id = req.body.cart_id
        let shipping_id = req.body.shipping_id
        let tax_id = req.body.tax_id
        let token = req.headers.cookie.slice(4)
        console.log(token);
        jwt.verify(token, serket, (err, verifydata) => {
            if (!err) {
                knex.select("*")
                    .from("shopping_cart")
                    .where("shopping_cart.cart_id", cart_id)
                    .join("phone_product", function () {
                        this.on("phone_product.product_id", "shopping_cart.phone_product_id")
                    })
                    .then(data => {
                        if (data.length > 0) {
                            for (i of data) {
                                let price = parseInt(i.price.replace(/,/g, ""));
                                i.subtotal = i.quantity * price

                            }
                            knex("orders")
                                .insert({
                                    "total_amount": i.subtotal,
                                    "created_on": new Date(),
                                    "customer_id": verifydata.customer,
                                    "shipping_id": shipping_id,
                                    "tax_id": tax_id
                                })
                                .then(result => {
                                    console.log("yrs");
                                    knex("order_detail")
                                        .insert({
                                            "unit_cost": data[0].price,
                                            "quantity": data[0].quantity,
                                            "phone_product_name": data[0].name,
                                            "phone_product_id": data[0].product_id,
                                            "order_id": result[0]
                                        })
                                        .then(result => {
                                            knex("shopping_cart")
                                                .where("shopping_cart.cart_id", cart_id)
                                                .del()
                                                .then(delete1 => {
                                                    console.log("delete");

                                                    res.send({ "orders": result[0] })
                                                })

                                        })

                                }).catch(err => {
                                    res.send(err)
                                })
                        } else {
                            console.log("ok");
                            knex.select("*")
                                .from("shopping_cart")
                                .where("shopping_cart.cart_id", cart_id)
                                .join("laptop_product", function () {
                                    this.on("laptop_product.laptop_id", "shopping_cart.laptop_product_id")
                                })
                                .then(data => {
                                    // res.send(data)
                                    for (i of data) {
                                        let price = parseInt(i.price.replace(/,/g, ""));
                                        i.subtotal = i.quantity * price
                                    }
                                    knex("orders")
                                        .insert({
                                            "total_amount": i.subtotal,
                                            "created_on": new Date(),
                                            "customer_id": verifydata.customer,
                                            "shipping_id": shipping_id,
                                            "tax_id": tax_id
                                        }).then(result => {
                                            console.log("yessss");
                                            // console.log(data);

                                            knex("order_detail")
                                                .insert({
                                                    "unit_cost": data[0].price,
                                                    "quantity": data[0].quantity,
                                                    "laptop_product_name": data[0].name,
                                                    "laptop_product_id": data[0].laptop_id,
                                                    "order_id": result[0]
                                                }).then(result1 => {
                                                    console.log("yesssssss");
                                                    knex("shopping_cart")
                                                        .where("shopping_cart.cart_id", cart_id)
                                                        .del()
                                                        .then(dalete2 => {
                                                            console.log("delete");
                                                            res.send({ "orders": result[0] })

                                                        })

                                                })
                                                .catch(err => {
                                                    res.send(err)
                                                })
                                        }).catch(err => {
                                            res.send(err)
                                            console.log("rttee");

                                        })
                                }).catch(err => {
                                    res.send("ass", err)
                                })
                        }

                    }).catch(err => {
                        res.send(err)
                    })
            } else {
                res.send("token is not verify")
            }
        })
    })

    orders.get("/order/:order_id", (req, res) => {
        let token = req.headers.cookie.slice(4)
        jwt.verify(token, serket, (err, verifydata) => {
            if (!err) {
                knex.select("*")
                    .from("order_detail")
                    .where("order_id", req.params.order_id)
                    .then(data => {
                        res.send(data)
                    }).catch(err => {
                        res.send(err)
                    })
            } else {
                res.send("token is not verify")
            }
        })

    })
    orders.get("/orders/customer",(req, res) => {
        // res.send("oo")
        let token = req.headers.cookie.slice(4)
        // console.log("token");
        jwt.verify(token, serket, (err,verifydata) => {
            // console.log(verifydata);
            if (!err) {
                knex.select("*")
                    .from("orders")
                    .where("customer_id",verifydata.customer)
                    .then(data=>{
                        res.send(data)
                        console.log("ksi");
                        
                    }).catch(err=>{
                        res.send(err)
                    })
            }
        })

    })
    orders.get("/orders/shortdetail",(re,res)=>{
        let token = req.headers.cookie.slice(4)
        jwt.verify(token,serket,(err,verify)=>{
            if(err){
                knex
                .select(
                  'orders.order_id',
                  'orders.total_amount',
                  "orders.created_on",
                  'orders.shipped_on',
                  "orders.status",
                  'order_detail.product_name as name'
                )
                .from("orders")
                .join('order_detail',function(){
                    this.on("order_detail.order_id",'orders.order_id')})
                    .where('orders.order_id',req.params.id)
                    .then(data=>{
                        
                    })
                
            }
        })
       
    })
}