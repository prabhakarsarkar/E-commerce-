// const knex = require("../dataConnection/connection");
// knex.schema.hasTable('shipping').then(function (exists) {
//     if (!exists) {
//         return knex.schema.createTable('shipping', function (t) {
//             t.increments('shipping_id').primary();
//             t.string(" shipping_type", 1000);
//             t.string(" shipping_cost", 1000);
//             t.bigInteger(" shipping_region_id",1000);
          
//         });
//     } else {
//         console.log("table is exists");

//     }

// var obj = [
// {"shipping_type":"Next Day Delivery (RS 50)","shipping_cost":"50","shipping_region_id":2},
// {"shipping_type":"7 Days","shipping_cost":"FREE","shipping_region_id":2},
// {"shipping_type":"7 Day Delivery (RS 500)","shipping_cost":"50","shipping_region_id":3},
// {"shipping_type":"28 Days","shipping_cost":"100","shipping_region_id":3},
// {"shipping_type":"7 Day Delivery (RS 500)","shipping_cost":"50","shipping_region_id":4},
// {"shipping_type":"28 Days","shipping_cost":"100","shipping_region_id":4},
// ]
// knex("shipping").insert(obj).then(()=>{
//     console.log("ok");
    
// })   
// });