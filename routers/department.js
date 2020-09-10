module.exports = (department, knex) => {
    department.get("/department", (req, res) => {
        knex.select("*")
            .from("department")
            .then((data) => {
                res.send(data)
            }).catch((err) => {
                res.send(err)
            })
    })
    department.get("/department/:id", (req, res) => {
        knex("department")
            .where("departmet_id", req.params.id)
            .then((data) => {
                res.send(data)
            }).catch(err => {
                res.send(err)
            })
    })
}