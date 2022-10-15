import User from "../model/User.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import { JWTSECRET } from "../configure/index.js";

const profile = (req, res) => {
    //req.user so no async
    const result = req.user;
    res.status(200).json({
      resultCode: 20000,
      resultDescription: "Success",
      resultData: result,
    });
  }

const allUser = async (req, res) => {
    const result = await User.find({});
    res.status(200).json({
      resultCode: 20000,
      resultDescription: "Success",
      resultData: result,
    });
  }

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const exist = await User.findOne({ email: email });
    if (exist) {
      return res.status(400).json({
        resultCode: 40000,
        resultDescription: "Duplicated data",
      });
    }
    const salt = await bcrypt.genSalt(6);
    const hash = await bcrypt.hash(password, salt);
  
    const result = await User.create({
      name: name,
      email: email,
      password: hash,
    });
    res.status(200).json({
      resultCode: 20000,
      resultDescription: "Success",
      resultData: result,
    });
  }

  const createUser =  async (req, res) => {
    const { name, email, password } = req.body;
    const avatar = "images/" + req.file.filename;
    // const avatar = req.file.filename;
    console.log(avatar);
    const exist = await User.findOne({ email: email });
    if (exist) {
      return res.status(400).json({
        resultCode: 40000,
        resultDescription: "Duplicated data",
      });
    }
    const salt = await bcrypt.genSalt(6);
    const hash = await bcrypt.hash(password, salt);
  
    const result = await User.create({
      name: name,
      email: email,
      password: hash,
      avatar,
    });
    res.status(200).json({
      resultCode: 20000,
      resultDescription: "Success",
      resultData: result,
    });
  }

  const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        resultCode: 40000,
        resultDescription: "Invalid User",
      });
    }
    // bcrypt.compare(myPlaintextPassword, hash, function (err, result) );
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({
        resultCode: 40000,
        resultDescription: "Invalid User",
      });
    }
    const token = jwt.sign(
      { sub: user.id, name: user.name },
      // process.env.secret,
      JWTSECRET,
      { expiresIn: "1h" }
    );
  
    res.status(200).json({
      resultCode: 20000,
      resultDescription: "Success",
      resultData: token,
    });
  }
export {profile, allUser, register, createUser, login}
