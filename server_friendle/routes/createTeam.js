const router = require("express").Router();
const knex = require("knex")(require("../knex_db/knexfile").development);

router.post("/", (req, res) => {
  const data = req.body;
  const game_type = data.game_type || "default";
  const { user_id } = data;
  knex("teams")
    .insert({ game_type })
    .then((team_id) => {
      knex("users")
        .where({ id: user_id })
        .update({ team_id: team_id[0] })
        .then(() => {
          knex("teams")
            .select("id", "game_type")
            .where({ id: team_id[0] })
            .then((user) => {
              return res.json(user[0]);
            });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.json({ msg: "Error" });
    });
});

module.exports = router;