const knex = require("../dataConnection/connection");
knex.schema.hasTable('orders').then(function (exists) {
    if (!exists) {
        return knex.schema.createTable('orders', function (t) {
            t.increments('order_id').primary();
            t.string("total_amount", 1000);
            t.string("created_on", 1000);
            t.string("shipped_on",100);
            t.string("status", 1000)
            t.string("comments",1000);
            t.bigInteger("customer_id",1000);
            t.string("auth_code",100);
            t.string("reference",1000);
            t.string("shipping_id",1000);
            t.string("tax_id",100)
        });
    } else {
        console.log("table is exists");

    }


});