const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validate } = require("../db/userDB");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// /me -> the id get from jwt

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered");

    user = new User(_.pick(req.body, ["name", "email", "password"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();

    res.header("x-auth-token", token).send(token);
    // .send(_.pick(user, ["_id", "name", "email"]));
  } catch (ex) {
    res.send(ex);
  }
});

module.exports = router;
