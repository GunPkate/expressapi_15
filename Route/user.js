import { Router } from "express"; //destructuring

import { upload } from "../middleware/upload.js";

// import * as dotenv from "dotenv"; //default export
// dotenv.config();

import { auth, isAdmin } from "../middleware/authen.js";
import {
  allUser,
  createUser,
  login,
  profile,
  register,
} from "../controller/userController.js";

const router = Router();

router.get("/", auth, allUser);

router.get("/profile", auth, profile);

router.post("/register", register);

router.post("/", [auth, isAdmin], upload.single("avatar"), createUser);

router.post("/login", login);
//module.export = router;
export default router;
