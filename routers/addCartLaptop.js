module.exports = (addCartLaptop, knex) => {
    addCartLaptop.post("/add/laptop", (req, res) => {
        let cart_id = req.body.cart_id
        let laptop_id = req.body.laptop_id
        console.log(laptop_id);

        knex("shopping_cart")
            .where("cart_id", cart_id)
            .andWhere("laptop_product_id", laptop_id)
            .then(data => {
                if (data.length == 0) {
                    knex("shopping_cart")
                        .insert({
                            "cart_id": cart_id,
                            "laptop_product_id": laptop_id,
                            "quantity": req.body.quantity,
                            "added_on": new Date()
                        })
                        .then(reult => {

                            knex.select(
                                "laptop_product.name",
                                "laptop_product.price", "laptop_product.RAM",
                                "laptop_product.SSD", "shopping_cart.quantity")
                                .from("laptop_product")
                                .join("shopping_cart", function () {
                                    this.on('laptop_product.laptop_id', "shopping_cart.laptop_product_id")
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
                            knex.select("laptop_product.name",
                                "laptop_product.price", "laptop_product.RAM",
                                "laptop_product.SSD", "shopping_cart.quantity")
                                .from("laptop_product")
                                .join("shopping_cart", function () {
                                    this.on('laptop_product.laptop_id', "shopping_cart.laptop_product_id")
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
                        }).catch(err => {
                            res.send(err)
                        })



                }
            }).catch(err => {
                res.send(err)
            })

    })
    addCartLaptop.get("/laptop/:cart_id", (req, res) => {
        let cart_id = req.params.cart_id
        knex.select(
            "laptop_product.name",
            "laptop_product.price", "laptop_product.RAM",
            "laptop_product.SSD", "shopping_cart.quantity"
        ).from("shopping_cart")
            .join("laptop_product", function () {
                this.on("laptop_product.laptop_id", "shopping_cart.laptop_product_id")
            })
            .where("shopping_cart.cart_id", cart_id)
            .then(data => {
                res.send(data)
            }).catch(err => {
                res.send(err)
            })
    })
    addCartLaptop.get("/laptop/price/:cart_id", (req, res) => {
        let cart_id = req.params.cart_id
        knex.select(
            "quantity",
            "price"
        )
            .from("shopping_cart")
            .join("laptop_product", function () {
                this.on("shopping_cart.laptop_product_id", "laptop_product.laptop_id")
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

}