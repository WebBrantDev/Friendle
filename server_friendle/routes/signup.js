const router = require("express").Router();
const knex = require("knex")(require("../knex_db/knexfile").development);
const bcrypt = require("bcryptjs");
const axios = require("axios");
const fs = require("fs");
const validate = require("../utils/validators");

// Generating a random seed for unique user icons
const seedrandom = require("seedrandom");
const generator = seedrandom();

const userIconCall = (username) => {
  const randomSeed = generator();
  const filePath = `/assets/user_icons/${username}_icon.svg`;
  axios
    .get(`https://avatars.dicebear.com/api/identicon/${randomSeed}.svg`)
    .then((res) => {
      fs.writeFile(
        `./assets/user_icons/${username}_icon.svg`,
        res.data,
        (err) => {
          if (err) console.log(err);
          console.log("It worked");
        }
      );
    })
    .catch((err) => {
      console.log(err);
    });
  return filePath;
};

router.post("/", (req, res) => {
  const data = req.body;
  const { username, email, password } = data;
  if (validate.emailCheck(email)) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const avatar = userIconCall(username);
    console.log(avatar);
    knex("users")
      .insert({ avatar, username, email, password: hashedPassword })
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
  } else {
    res.status(400).send("Email invalid");
  }
});

module.exports = router;
