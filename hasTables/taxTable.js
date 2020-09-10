// const knex = require("../dataConnection/connection");
// knex.schema.hasTable('tax').then(function (exists) {
//     if (!exists) {
//         return knex.schema.createTable('tax', function (t) {
//             t.increments('tax_id').primary();
//             t.string("tax_type ",1000),
//             t.string("tax_percentage",101)

//         });
//     } else {
//         console.log("table is exists");

//     }

// var obj =[
//     {"tax_type":"Sales Tax at 8.5%","tax_percentage":"8.50"},
//     {"tax_type":"no tax","tax_percentage":"0.00"}
// ]
// knex("tax").insert(obj).then(()=>{
//     console.log("ok");
    
// }).catch(err=>{
//     console.log();
    
// })
// });