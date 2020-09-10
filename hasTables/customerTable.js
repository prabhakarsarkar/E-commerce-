// const knex = require("../dataConnection/connection");
// knex.schema.hasTable('customer').then(function (exists) {
//     if (!exists) {
//         return knex.schema.createTable('customer', function (t) {
//             t.increments('customer_id').primary();
//             t.string("email").unique()
//             t.string("mob_phone",10).unique()
//             t.string("name", 1000);
//             t.string("password ",100);
//             t.string("address", 1000)
//             t.string("Pincode",1000);
//             t.string("locality",1000);
//             t.string("City",100);
//             t.string("State",1000);
//             t.string("country",1000);
//             t.string("casePayment",100)
//             t.string("credit_card",2000)
//             t.string("googlePay",1000)
//         });
//     } else {
//         console.log("table is exists");

//     }


// });



// customer.put("/update", (req, res) => {
//     let token = req.headers.cookie.slice(4)
//     jwt.verify(token, process.env.sekret, (err, verifyToken) => {
//         if (!err) {
//             if (req.body.name == undefined) {
//                 res.send("fil the name")
//             } else {
//                 if (req.body.Pincode == undefined) {
//                     res.send("fil the pincode")
//                 } else {
//                     if (req.body.address == undefined) {
//                         res.send("fill the address")
//                     } else {
//                         if (req.body.locality == undefined) {
//                             res.send("fill the locatiy")
//                         } else {
//                             if (req.body.city == undefined) {
//                                 res.send("fill the city name")
//                             } else {
//                                 if (req.body.state == undefined) {
//                                     res.send("fill the state name")
//                                 } else {
//                                     if (req.body.country == undefined) {
//                                         res.send("fill the country name")
//                                     } else {
//                                         knex("customer")
//                                             .update({
//                                                 "name": req.body.name,
//                                                 "address": req.body.address,
//                                                 "Pincode": req.body.Pincode,
//                                                 "locality": req.body.locality,
//                                                 "City": req.body.City,
//                                                 "State": req.body.State,
//                                                 "country": req.body.country
//                                             })
//                                             .then(data => {
//                                                 res.send("update seeccsefull")
//                                             }).catch(err => {
//                                                 res.send(err)
//                                             })
//                                     }
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }

//         } else {
//             res.send(err)
//         }
//     })
// })