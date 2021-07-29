const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const config = require("config");
const startupDebuger = require("debug")("app:startup");
const dbDebuger = require("debug")("app:db");
const home = require("./routes/home");
const courses = require("./routes/courses");
const genres = require("./routes/genres");
const customers = require("./routes/customers");

const url = config.get("Url");

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => dbDebuger("Connected Successfully ...."))
  .catch((err) =>
    dbDebuger("Can not Connect to mongodb databse..", err.message)
  );

const app = express();
// console.log(config.get("mail.password"));
// we need to add middleware for using body for post
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(logger.log);
// app.use(logger.ath);
app.use(helmet());
// Now set the pug
app.set("view engine", "pug");

if (app.get("env") === "development") {
  app.use(morgan("dev"));
  startupDebuger("Morgan enabled...");
}

app.use("/", home);
app.use("/api/courses", courses);
app.use("/api/genres", genres);
app.use("/api/customers", customers);

// console.log(exports);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port : ${port}...`));
