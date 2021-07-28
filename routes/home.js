const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // res.send("Hello Express");
  res.render("index", {
    title: "myExpress App",
    message: "Hello Pug template engine",
  });
});
module.exports = router;
