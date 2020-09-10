// const knex = require("../dataConnection/connection")
// knex.schema.hasTable("department").then((exists)=>{
//     if(!exists){
//         return knex.schema.createTable("department",(column)=>{
//             column.increments("departmet_id").primary();
//             column.string("name",50);
//             column.string("description",1000);
//         })
//     }else{
//         console.log("table is exists");
        
//     }
// })

// knex.schema.hasTable("category").then((exists)=>{
//     if(!exists){
//         return knex.schema.createTable("category",(column)=>{
//             column.increments("category_id").primary();
//             column.integer("department_id",(100))
//             column.string("name",50);
//             column.string("description",1000);

//         })
//     }else{
//         console.log("table is exists");
//     }
// })
// knex.schema.hasTable('phone_product').then(function (exists) {
//     if (!exists) {
//         return knex.schema.createTable('phone_product', function (t) {
//             t.increments('product_id').primary();
//             t.integer("category_id",200);
//             t.string("name", 100);
//             t.string("price")
//             t.string("RAM", 100);
//             t.string("ROM", 100);
//             t.string("Display", 100);
//             t.string("Camera", 100);
//             t.string("Battery", 100);
//             t.string("Processor", 100);
            
//         });
//     }else{
//         console.log("table is exists");
        
//     }
    

// });

