const router = require("express").Router();
const knex = require("knex")(require("../knex_db/knexfile").development);

router.post("/", (req, res) => {
  res.send("woo");
});

module.exports = router;
