// const express = require('express'); //import library
import express from "express";
// require('dotenv').config() //use function from dotenv
import * as dotenv from "dotenv"; //default export
dotenv.config();
import morgan from "morgan";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import userRouter from "./Route/user.js";
import mongoose from "mongoose";

await mongoose
  .connect("mongodb://localhost:27017/demoapi15")
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err)); //awiat to wait unitl function done

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); //use function
app.use(express.json()); //body
app.use(express.urlencoded({ extended: false })); //image


app.use("/images", express.static(path.join(__dirname, "public", "image")));

app.use(morgan("dev")); //morgan function
app.use(
  morgan("common", {
    stream: fs.createWriteStream(path.join(__dirname, "access.log"), {
      flags: "a",
    }),
  })
);

const port = process.env.port || 4000; //set default

app.get("/", (req, res) => {
  res.send("Hello wolrd");
});

app.use("/api/user", userRouter);
// console.log(path.join(__dirname,"access.log"))
app.listen(port, () => {
  console.log(`Server running ${port}`);
});
