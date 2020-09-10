// const knex = require("../dataConnection/connection");
// knex.schema.hasTable('shipping_region').then(function (exists) {
//     if (!exists) {
//         return knex.schema.createTable('shipping_region', function (t) {
//             t.increments(' shipping_region_id').primary();
//             t.string("shipping_region",1000)
           

//         });
//     } else {
//         console.log("table is exists");

//     }

// var obj =[
//     {"shipping_region":"select country"},
//     {"shipping_region":"india"},
//     {"shipping_region":"canada"},
//     {"shipping_region":"Europe"}
// ]
// knex("shipping_region").insert(obj).then(()=>{
//     console.log("ok"); 
// }).catch(err=>{
//     console.log(err);
    
// })
// });