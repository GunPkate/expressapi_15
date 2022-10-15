import { Router } from "express"; //destructuring
import User from "../model/User.js";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import jwt from "jsonwebtoken";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("public", "image"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + ".png");
  },
});

const upload = multer({ storage: storage });
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
});

router.post("/", upload.single("avatar"), async (req, res) => {
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
});

router.post("/login", async (req, res) => {
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
    process.env.secret,
    { expiresIn: "1h" }
  );

  res.status(200).json({
    resultCode: 20000,
    resultDescription: "Success",
    resultData: token,
  });
});
//module.export = router;
export default router;
