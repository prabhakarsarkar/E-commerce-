// const knex = require("../dataConnection/connection");
// knex.schema.hasTable('shopping_cart').then(function (exists) {
//     if (!exists) {
//         return knex.schema.createTable('shopping_cart', function (t) {
//             t.increments('item_id').primary();
//             t.string("cart_id",10).unique()
//             t.string("phone_product_id", 1000);
//             t.string("laptop_product_id", 1000);
//             t.bigInteger("quantity",20);
//             t.string("buy_now", 1000)
//             t.string("added_on",1000);
//         });
//     } else {
//         console.log("table is exists");

//     }


// });