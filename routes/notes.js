const express = require("express");
const { User } = require("../db/userDB");
const router = express.Router();
const auth = require("../middleware/auth");
const datAndTime = require("date-and-time");
const Joi = require("joi");

//get the notes list
router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  console.log(user);
  res.send(user);
});

//update the notes list

router.post("/", auth, async (req, res) => {
  const { id, title, content, date } = req.body;
  result = await User.updateOne(
    { _id: id },
    { $push: { notes: { title, content, date } } }
  );
  res.send(result);
  // const user = await User.update({_id,req.bod});
  // console.log(user);
  // res.send(user);
});

//remove node from the list

router.delete("/", auth, async (req, res) => {
  const { id, title } = req.body;
  result = await User.updateOne({ _id: id }, { $pull: { notes: { title } } });
  res.send(result);
  // const user = await User.update({_id,req.bod});
  // console.log(user);
  // res.send(user);
});

module.exports = router;
