import { Router } from "express"; //destructuring
import User from "../model/User.js";
import bcrypt from "bcrypt";

const router = Router();

router.get("/", async (req, res) => {
  const result = await User.find({});
  res.status(200).json({
    resultCode: 20000,
    resultDescription: "Success",
    resultData: result,
  });
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const exist = await User.findOne({email:email})
  if(exist){
    return   res.status(400).json({
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
});

//module.export = router;
export default router;
