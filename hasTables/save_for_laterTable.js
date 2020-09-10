// const knex = require("../dataConnection/connection");
// knex.schema.hasTable('save_for_later').then(function (exists) {
//     if (!exists) {
//         return knex.schema.createTable('save_for_later', function (t) {
//             t.increments('item_id').primary();
//             t.string("cart_id",10).unique()
//             t.string("product_id", 1000);
//             t.bigInteger("quantity",20);
//             t.string("buy_now", 1000)
//             t.string("added_on",1000);
//         });
//     } else {
//         console.log("table is exists");

//     }


// });