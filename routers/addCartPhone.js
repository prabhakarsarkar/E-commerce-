module.exports = (addCartPhone, knex) => {
    addCartPhone.get("/cart_id", (req, res) => {
        let str = "12345567889qwertyuiioopppasdfhljklllzxcvvASDFGHJJKJTREEWERTY"
        let cartId = ""
        let cart_id = {}
        for (let a = 0; a < 10; a++) {
            cartId += str.charAt(Math.floor(Math.random() * str.length))
        }
        cart_id["cart_id"] = cartId
        res.send(cart_id)


    })
    addCartPhone.post("/add", (req, res) => {
        let cart_id = req.body.cart_id
        let product_id = req.body.product_id
        knex("shopping_cart")
            .where("cart_id", cart_id)
            .andWhere("laptop_product_id", product_id)
            .then(data => {
                if (data.length == 0) {
                    knex("shopping_cart")
                        .insert({
                            "cart_id": cart_id,
                            "phone_product_id": product_id,
                            "quantity": req.body.quantity,
                            "added_on": new Date()
                        })
                        .then(reult => {

                            knex.select("phone_product.name",
                                "phone_product.price", "phone_product.RAM",
                                "phone_product.ROM ", "shopping_cart.quantity")
                                .from("phone_product")
                                .join("shopping_cart", function () {
                                    this.on('phone_product.product_id', "shopping_cart.phone_product_id")
                                })
                                .then(data => {
                                    res.send(data)
                                }).catch(err => {
                                    res.send(err)
                                })
                        }).catch(err => {
                            res.send(err)
                        })
                } else {
                    let quantity = data[0].quantity + 1
                    knex("shopping_cart")
                        .update({ quantity: quantity })
                        .where("shopping_cart.cart_id", cart_id)
                        .then(data => {
                            knex.select("phone_product.name",
                                "phone_product.price", "phone_product.RAM",
                                "phone_product.ROM ", "shopping_cart.quantity")
                                .from("phone_product")
                                .join("shopping_cart", function () {
                                    this.on('phone_product.product_id', "shopping_cart.phone_product_id")
                                })
                                .then(data => {
                                    let update = []
                                    for (i of data) {
                                        let price = parseInt(i.price.replace(/,/g, ""));
                                        i.subtotal = i.quantity * price
                                        update.push(i)
                                    }
                                    res.send(update)
                                }).catch(err => {
                                    res.send(err)
                                })
                        })



                }
            }).catch(err=>{
                res.send(err)
            })

    })
    addCartPhone.get("/get/:cart", (req, res) => {
        let cart_id = req.params.cart
        knex.select("phone_product.name",
            "phone_product.price", "phone_product.RAM",
            "phone_product.ROM ", "shopping_cart.quantity")
            .from("phone_product")
            .join("shopping_cart", function () {
                this.on('phone_product.product_id', "shopping_cart.phone_product_id")
            })
            .where("shopping_cart.cart_id", cart_id)
            .then(data => {
                let update = []
                for (i of data) {
                    let price = parseInt(i.price.replace(/,/g, ""));
                    i.subtotal = i.quantity * price
                    update.push(i)
                }
                res.send(update)
            }).catch(err => {
                res.send(err)
            })

    })
    addCartPhone.get("/price/:cart_id", (req, res) => {
        let cart_id = req.params.cart_id
        knex
            .select(
                "quantity",
                "price"
            )
            .from("shopping_cart ")
            .join("phone_product", function () {
                this.on("phone_product.product_id", "shopping_cart.phone_product_id")
            })
            .where("shopping_cart.cart_id", cart_id)
            .then(data => {
                let list = []
                for (i of data) {
                    let price = parseInt(i.price.replace(/,/g, ""));
                    i.subtotal = i.quantity * price
                    list.push(i)
                }
                res.send(list)

            }).catch(err => {
                res.send(err)
            })
    })
    addCartPhone.delete("/delete/:cart_id", (req, res) => {
        let cart_id = req.params.cart_id
        knex("shopping_cart")
            .where("shopping_cart.cart_id", cart_id)
            .del()
            .then(data => {
                res.send("delete succssefull")
            })
    })
    addCartPhone.get("/save/:item_id", (req, res) => {
        let item_id = req.params.item_id
        knex("shopping_cart")
            .select(
                'shopping_cart.item_id',
                'shopping_cart.cart_id',
                'shopping_cart.laptop_product_id',
                'shopping_cart.quantity',
                'shopping_cart.buy_now',
                'shopping_cart.added_on'
            )
            .where("shopping_cart. item_id", item_id)
            .then(data => {
                if (data.length > 0) {
                    knex("save_for_later")
                        .insert(data[0])
                        .then(data1 => {
                            knex.select("*")
                                .from("save_for_later")
                                .then(data => {
                                    res.send(data)
                                })
                        })
                } else {
                    res.send("no data is there")
                }

            })
    })
    addCartPhone.get('/move/:item_id', (req, res) => {
        let item_id = req.params.item_id
        knex("save_for_later")
            .select("*")
            .where("save_for_later.item_id", item_id)
            .then(data => {
                if (data.length > 0) {
                    knex("cart")
                        .insert(data[0])
                        .then(data1 => {
                            console.log("ok");
                            knex.select("*")
                                .from("cart")
                                .then(data => {
                                    res.send(data)
                                    }).catch(err => {
                                    res.send(err)
                                })
                        }).catch(err => {
                            res.send(err)
                        })
                } else {
                    res.send("no data is there")
                }
            }).catch(err => {
                res.send(err)
            })
    })
    addCartPhone.delete("/delete/save/:item_id",(req,res)=>{
        let item_id = req.params.item_id
        knex("save_for_later")
        .where("save_for_later.item_id",item_id)
        .del()
        .then(data=>{
            res.send("delete")
        }).catch(err=>{
            res.send(err)
        })
    })
}