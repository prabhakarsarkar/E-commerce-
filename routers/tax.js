module.exports = (tax, knex) => {
    tax.get("/tax", (req, res) => {
        knex.select("*")
            .from("tax")
            .then(data => {
                res.send(data)
            }).catch(err => {
                res.send(err)
            })
    })
    tax.get("/tax/:id", (req, res) => {
        knex("tax")
            .where("tax_id",req.params.id)
            .then(data => {
                res.send(data)
            }).catch(err => {
                res.send(err)
            })
    })
}