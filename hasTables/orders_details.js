const knex = require("../dataConnection/connection");
knex.schema.hasTable('order_detail').then(function (exists) {
    if (!exists) {
        return knex.schema.createTable('order_detail', function (t) {
            t.increments('item_id').primary();
            t.string("order_id",10).unique()
            t.string("phone_product_id", 1000);
            t.string("laptop_product_id", 1000);        
            t.string("phone_product_name",1000);
            t.string("laptop_product_name", 1000)
            t.bigInteger("quantity",1000);
            t.string("unit_cost",100)
        });
    } else {
        console.log("table is exists");

    }


});