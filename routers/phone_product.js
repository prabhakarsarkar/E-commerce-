module.exports = (phone_product, knex) => {
    // THIS endpoint for name wise

    phone_product.get("/product/:name", (req, res) => {
        let name = req.params.name
        knex("phone_product as p")
            .select("p.name", "p.price", "p.RAM", "p.ROM",
                "p.camera", "p.display", "p.battery", "p.processor")
            .where("name", "like", "%" + name + "%")
            .then(data => {
                res.send(data)
            })
    })
    // this end point for id 
    phone_product.get("/pro/:id", (req, res) => {
        knex("phone_product as p")
            .select("p.name", "p.price", "p.RAM", "p.ROM",
                "p.camera", "p.display", "p.battery", "p.processor")
            .join("category", function () {
                this.on("p.category_id", "=", "category.category_id")
            })
            .where("p.category_id", req.params.id)
            .then((data) => {
                  res.send(data)
            }).catch((err) => {
                res.send(err)
            })
    })
    // this end point for GB

    phone_product.get("/prod/GB", (req, res) => {
        var name = req.body.name
        var ram = req.body.RAM
        if (ram == undefined) {
            knex.select("*")
                .from("phone_product")
                .where("name", "like", '%' + name + '%')
                .then(data => {
                    console.log(data[0].length);

                    if (data == undefined) {
                        res.send("no phone is there")
                    } else {
                        res.send(data)
                    }
                })
        } else {
            var data1 = ram.toUpperCase()
            var RAM = data1.split(" ").join("")
            knex.select("*")
                .from("phone_product")
                .where("name", "like", "%" + name + "%")
                .andWhere("RAM", RAM)
                .then(data => {
                    if (data.length == "0") {
                        res.send("no phone is there")
                    } else {
                        res.send(data)
                    }
                }).catch((err) => {
                    res.send(err)
                })
        }
    })
    // THIS END  for greater then
    phone_product.get("/prod/price/greater_then",(req,res)=>{
        let name = req.body.name
        let price = req.body.price  
        knex("phone_product as p")
        .select("p.name", "p.price", "p.RAM", "p.ROM",
            "p.camera", "p.display", "p.battery", "p.processor")
            .where("name","like",'%'+name+'%')
            .andWhere("price",'<',price)
            .then(data=>{
                if(data.length=="0"){
                    res.send("no phone is there of greater then ",price)
                }else{
                    res.send(data)
                }
            })  

    })
    // this end point for less then
    phone_product.get("/prod/price/less_then",(req,res)=>{
        let name = req.body.name
        let price = req.body.price  
        knex("phone_product as p")
        .select("p.product_id","p.name", "p.price", "p.RAM", "p.ROM",
            "p.camera", "p.display", "p.battery", "p.processor")
            .where("name","like",'%'+name+'%')
            .andWhere("price",'<',price)
            .then(data=>{
                if(data.length=="0"){
                    res.send("no phone is there of less then 10000")
                }else{
                    res.send(data)
                }
            })  
    })


}