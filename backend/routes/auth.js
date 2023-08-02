const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { Restaurant } = require("../models");

router.get("/current_user", async (req, res) => {
  if (req.session.userId) {
    const rUser = await Restaurant.findByPk(req.session.userId);
    return res.status(200).json({
      user: {
        id: rUser.id,
        username: rUser.username,
        email: rUser.email,
        name: rUser.rName
      }
    });
  } else {
    return res.status(401).json({rUser: null})
  }
});

router.post("/signup", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    const rUser = await Restaurant.create({
      userName: req.body.username,
      rName: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    req.session.userId = rUser.id;
    // Send a response to the client informing them that the user was successfully created
    res.status(201).json({
      message: "Restaurant User created!",
      user: {
        userName: rUser.username,
        email: rUser.email,
      },
    });
  } catch (err) {
    console.error(err);
    if (err.name === "SequelizeValidationError") {
      return res.status(422).json({ errors: err.errors.map((e) => e.message) });
    }
    res.status(500).json({
      message: "Error occurred while creating user",
      error: err,
    });
  }
});

router.delete("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.sendStatus(500);
    }

    res.clearCookie("connect.sid");
    return res.sendStatus(200);
  });
});


router.post("/login", async (req, res) => {
  try {
    console.log("body", req.body);
    // First, find the user by their email address
    const rUser = await Restaurant.findOne({ where: { email: req.body.email } });

    if (rUser === null) {
      // If the user isn't found in the database, return an 'incorrect credentials' message
      return res.status(401).json({
        message: "Incorrect credentials",
      });
    }

    // If the user is found, we then use bcrypt to check if the password in the request matches the hashed password in the database
    bcrypt.compare(req.body.password, rUser.password, (error, result) => {
      if (result) {
        // Passwords match

        req.session.userId = rUser.id;
        res.status(200).json({
          message: "Logged in successfully",
          user: {
            userName: rUser.username,
            email: rUser.email,
          },
        });
      } else {
        // Passwords don't match
        res.status(401).json({ message: "Incorrect credentials" });
      }
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred during the login process" });
  }
});

module.exports = router;