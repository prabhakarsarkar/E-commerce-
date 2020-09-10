module.exports = (category, knex) => {
    category.get("/category", (req, res) => {
        knex.select("*")
            .from("category")
            .then(data => {
                res.send(data)
            }).catch((err) => {
                res.send(err)
            })
    })
    category.get("/category/:id", (req, res) => {
        knex("category")
            .where("department_id", req.params.id)
            .then(data => {
                res.send(data)
            }).catch((err) => {
                res.send(err)
            })
    })
}