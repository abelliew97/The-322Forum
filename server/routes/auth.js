const router = require("express").Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/key");
const requireLogin = require("../middleware/requireLogin");

router.get("/", (req, res) => {
  res.send("Hello");
});

router.post("/protected", requireLogin, (req, res) => {
  res.send("hello user");
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: "Please complete the form" });
  }

  User.findOne({ email: email }).then(savedUser => {
    if (!savedUser) {
      return res.status(422).send({ error: "Invalid email or password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then(doMatch => {
        if (doMatch) {
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          const {
            _id,
            name,
            email,
            followers,
            following,
            pic,
            _type,
            followingNames
          } = savedUser;

          //Lower normalization for faster retrieval of names

          res.json({
            token,
            followingNames,
            _type,
            user: {
              _id,
              name,
              email,
              followers,
              following,
              pic,
              followingNames,
              _type
            }
          });
        } else {
          return res.status(422).send({ error: "Invalid email or password" });
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
});

router.post("/signup", (req, res) => {
  const { name, email, password, pic, _type } = req.body;

  if (!email || !password || !name) {
    return res.status(422).send({ error: "Not Complete" });
  }
  User.findOne({ email: email }).then(savedUser => {
    if (savedUser) {
      return res.status(200).send({ message: "Success" });
    }
    bcrypt
      .hash(password, 12)
      .then(hashedpassword => {
        const user = new User({
          email,
          password: hashedpassword,
          name,
          pic,
          _type
        });

        user.save().then(user => {
          res.json({ message: "User created successfully" });
        });
      })
      .catch(err => {
        console.log(err);
      });
  });
});

module.exports = router;
