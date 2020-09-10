module.exports = (laptop_product, knex) => {
    laptop_product.get("/laptop", (req, res) => {
        knex.select("*").from("laptop_product")
            .then(data => {
                res.send(data)
            })

    })
    laptop_product.get("/laptop_product/:id", (req, res) => {
        knex("laptop_product as l")
            .select("l.name", "l.price", "l.RAM", "l.SSD", "l.weight", "l.Display", "l.Processor_name")
            .join("category", function () {
                this.on("category.category_id", "l.category_id")
            })
            .where("l.category_id", req.params.id)
            .then(data => {
                res.send(data)
            }).catch(err => {
                res.send(err)
            })
    })
    laptop_product.get("/laptop_prod/:name", (req, res) => {
        let name = req.params.name
        knex("laptop_product as l")
            .select("l.name", "l.price", "l.RAM", "l.SSD", "l.weight", "l.Display", "l.Processor_name")
            .where("name", "like", '%' + name + '%')
            .then(data => {
                res.send(data)
            }).catch(err => {
                res.send(err)
            })
    })
    laptop_product.get("/laptop_prod/name", (req, res) => {
        let name = req.body.name
        knex("laptop_product as l")
            .select("l.name", "l.price", "l.RAM", "l.SSD", "l.weight", "l.Display", "l.Processor_name")
            .where("name", "like", '%' + name + '%')
            .then(data => {
                res.send(data)
            }).catch(err => {
                res.send(err)
            })
    })
    laptop_product.get("/laptop_prod/price/greater_then",(req,res)=>{
        let name = req.body.name
        let price = req.body.price 
        console.log(price);
         
        knex("laptop_product as l")
        .select("l.name", "l.price", "l.RAM", "l.SSD", "l.weight", "l.Display", "l.Processor_name")
            .where("name","like",'%'+name+'%')
            .andWhere("price",'<',price)
            .then(data=>{
                if(data.length=="0"){
                    res.send("no phone is there of greater then ")
                }else{
                    res.send(data)
                }
            })  

    })

}   