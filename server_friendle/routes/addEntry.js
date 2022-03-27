const router = require("express").Router();
const knex = require("knex")(require("../knex_db/knexfile").development);

router.post("/", (req, res) => {
  const { data, user_id } = req.body;
  const team_id = req.body.team_id || null;
  const dataArray = data.split("");
  const game_day = dataArray.splice(7, 3).join("");
  const num_of_guesses = dataArray[8];
  const guess_pattern = dataArray.splice(12).join("");
  if (game_day && num_of_guesses && guess_pattern && user_id) {
    knex("entries")
      .insert({ game_day, num_of_guesses, guess_pattern, user_id, team_id })
      .then((id) => {
        return res.json({ thing: id });
      })
      .catch((err) => {
        console.log(err);
        return res.json({ msg: "Error" });
      });
  }
  // res.send(`Game day: ${game_day}
  // Guesses: ${num_of_guesses}
  // Guess pattern: ${guess_pattern[6]}`);
});

module.exports = router;
