const Users = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Router = require("express").Router();
const Auth = require("./../middleware/auth");

exports.register = async (req, res) => {
  try {
    const data = req.body;

    if (
      !data.email ||
      !data.password ||
      !data.passwordCheck ||
      !data.first_name ||
      !data.last_name
    ) {
      return res.status(400).json({ msg: "Not all fields are there" });
    }
    if (data.password.length < 5) {
      return res.status(400).json({ msg: "Enter password of 5 letters" });
    }
    if (data.password !== data.passwordCheck) {
      return res.status(400).json({ msg: "Password did not match" });
    }

    Users.findOne({ email: data.email }, async (err, res_data) => {
      if (res_data) {
        return res.status(400).json({ msg: "Account already exists" });
      } else {
        const salt = await bcrypt.genSalt();
        const PassWordHash = await bcrypt.hash(data.password, salt);
        console.log(PassWordHash);

        const newUser = new Users({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          password: PassWordHash,
          username: data.username,
        });

        newUser.save((err, ndata) => {
          console.log(ndata);
          res.json(ndata);
        });
      }
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
