const router = require("express").Router();
const knex = require("knex")(require("../knex_db/knexfile").development);

router.post("/", (req, res) => {
  const data = req.body;
  const { avatar, username, email, password } = data;
  knex("users")
    .insert({ avatar, username, email, password })
    .then((id) => {
      knex("users")
        .select("id", "username")
        .where({ id })
        .then((user) => {
          return res.json(user[0]);
        });
    })
    .catch((err) => {
      console.log(err);
      return res.json({ msg: "Error" });
    });
});

module.exports = router;
