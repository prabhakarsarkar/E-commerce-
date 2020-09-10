module.exports = (shipping,knex)=>{
    shipping.get("/shipping",(req,res)=>{
        knex.select("*")
        .from("shipping_region")
        .then(data=>{
            res.send(data)
        }).catch(err=>{
            res.send(err)
        })
           
    })
    shipping.get("/shipping/:id",(req,res)=>{
        knex.select("*")
        .from("shipping")
        .where("shipping.shipping_region_id",req.params.id)
        .then(data=>{
            res.send(data)
        }).catch(err=>{
            send(err)
        })
    })
}