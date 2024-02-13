import express from "express";
import Admin from "../model/AdminModel.js";
import jwt from "jsonwebtoken";
import adminServices from "../services/adminServices.js";
const router = express.Router();

router.post("/createData", async (req, res) => {
  const Token = req.headers.authorization.replace(/^Bearer\s/, "");
  const secretKey = process.env.JWT_SECERET_KEY;
  console.log("till here create data");

  try {
    const verified = jwt.verify(Token, secretKey);
    if (verified) {
      const savedData = await adminServices(req.body);

      if (savedData == 1) {
        return res.status(200).json({ message: "Data Added Sucessfully!" });
      } else {
        return res
          .status(500)
          .json({ message: "Error Adding data, Something went wrong" });
      }
    } else {
      return res.status(401).send("Unauthorized Acess");
    }
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
});

router.post("/login", async (req, res) => {
  const { adminEmail, adminPassword } = req.body;
  const user = await Admin.findOne({
    email: adminEmail,
    password: adminPassword,
  });
  try {
    if (user) {
      console.log("HERE");
      const payLoad = req.body;
      const options = {
        expiresIn: "2h",
      };
      const secretKey = process.env.JWT_SECERET_KEY;

      const token = jwt.sign(payLoad, secretKey, options);
      res.status(200).send(token);
    } else {
      res.status(401).json({ message: "User Not found" });
    }
  } catch (error) {
    res.status(401).json({ message: "User Not found" });
  }
});

export default router;
