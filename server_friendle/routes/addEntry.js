const router = require("express").Router();
const knex = require("knex")(require("../knex_db/knexfile").development);

router.post("/", (req, res) => {
  const { guess_pattern, game_day, num_of_guesses, user_id } = req.body;
  const team_id = req.body.team_id || null;

  if (game_day && num_of_guesses && guess_pattern && user_id) {
    knex("entries")
      .insert({ game_day, num_of_guesses, guess_pattern, user_id, team_id })
      .then((id) => {
        // return res.json({ thing: id });
        res.status(201).json({ game_day, num_of_guesses, guess_pattern });
      })
      .catch((err) => {
        console.log(err);
        return res.json({ msg: "Error" });
      });
  }
});

module.exports = router;
