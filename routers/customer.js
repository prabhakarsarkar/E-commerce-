module.exports = (customer, knex, jwt, sekret) => {
    customer.post("/signup", (req, res) => {
        let phone_no = req.body.mob_phone
        let password = req.body.password
        if (req.body.email == undefined || req.body.mob_phone == undefined || req.body.password == undefined) {
            console.log("fill the from");
            res.send("fill the all details")
        } else {
            if (phone_no.length == "10" && password.length > 6) {
                knex("customer")
                    .insert(req.body)
                    .then(() => {
                        knex.select("*")
                            .from("customer")
                            .then(data => {
                                res.send(data)
                            }).catch(err => {
                                res.send(err)
                            })
                    }).catch((err) => {
                        res.send(err)
                    })
            } else {
                res.send("mob should be 10 num and password should 6")
            }
        }
    })
    customer.post("/login", (req, res) => {
        let email = req.body.email
        let mob_phone = req.body.mob_phone
        knex('customer')
            .select("customer.email","customer.mob_phone","customer.customer_id")
            .where("customer.email", email)
            .andWhere("customer.mob_phone",mob_phone)
            .then(data => {
                if (data.length == 0) {
                    res.send("first singup")
                } else {
                    jwt.sign({ "email": data[0].email, "mob_phone": data[0].mob_phone,
                    "customer":data[0].customer_id},
                        process.env.sekret, (err, token) => {
                            if (!err) {
                                res.cookie("key", token)
                                res.send("ok")
                                console.log(token);

                            }
                        })
                }

            }).catch(err => {
                res.send(err)
            })
    })
    customer.put("/update", (req, res) => {
        let token = req.headers.cookie.slice(4)
        jwt.verify(token, sekret, (err, verifyToken) => {
            if (!err) {
                if (req.body.name == undefined) {
                    return res.send("fil the name")
                } if (req.body.Pincode == undefined) {
                    return res.send("fil the pincode")
                } if (req.body.address == undefined) {
                    return res.send("fill the address")
                } if (req.body.locality == undefined) {
                    return res.send("fill the locatiy")
                } if (req.body.City == undefined) {
                    return res.send("fill the city name")
                } if (req.body.State == undefined) {
                    return res.send("fill the state name")
                } if (req.body.country == undefined) {
                    return res.send("fill the country name")
                } else {
                    knex("customer")
                        .update({
                            "name": req.body.name,
                            "address": req.body.address,
                            "Pincode": req.body.Pincode,
                            "locality": req.body.locality,
                            "City": req.body.City,
                            "State": req.body.State,
                            "country": req.body.country
                        })
                        .then(data => {
                            res.send("update seeccsefull")
                        }).catch(err => {
                            res.send(err)
                        })
                }
            } else {
                res.send(err)
            }
        })
    })

    customer.put("/payment", (req, res) => {
        let casePayment = "casePayment"
        let credit_card = "credit_card"
        let googlePay = "googlePay"
        let token = req.headers.cookie.slice(4)
        jwt.verify(token, sekret, (err, verifyToken) => {
            if (!err) {
                if (req.body.credit_card == credit_card) {
                    knex("customer")
                        .update({
                            "credit_card": req.body.credit_card
                        })
                        .then(data => {
                            return res.send("credit_card")
                        }).catch(err => {
                            return res.send(err)
                        })

                } if (req.body.casePayment == casePayment) {
                    knex("customer")
                        .update({
                            "casePyament": req.body.casePyament
                        })
                        .then(data => {
                            return res.send("casePyament")
                        }).catch(err => {
                            return res.send(err)
                        })

                } if (req.body.googlePay == googlePay) {
                    knex("customer")
                        .update({
                            "googlePay": req.body.googlePay
                        })
                        .then(data => {
                            return res.send("googlePay")
                        }).catch(err => {
                            return res.send(err)
                        })
                }
            }
        })
    })

    customer.get("/customer", (req, res) => {
        knex.select("*")
            .from("customer")
            .then(data => {
                res.send(data)
            }).catch(err => {
                res.send(err)
            })
    })
}



