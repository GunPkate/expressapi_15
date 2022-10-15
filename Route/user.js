import { Router } from "express"; //destructuring
import User from "../model/User.js";

const router = Router();

router.get("/", async (req, res) => {
  const result = await User.find({});
  res.status(200).json({
    resultCode: 20000,
    resultDescription: "Success",
    resultData: result,
  });
});

//module.export = router;
export default router;
