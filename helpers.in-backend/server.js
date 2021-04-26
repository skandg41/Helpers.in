const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const logger = require("./logger");
const users = require("./routes/api/users");
const customer = require("./routes/api/customer");
const jobseeker = require("./routes/api/jobseeker");
const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: false }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);


// Routes
app.use("/api/users", users);
app.use("/api/customer",customer);
app.use("/api/jobseeker",jobseeker);

const port = process.env.PORT || 5001;
logger.info("Server running on port "+ port);
logger.warn("Log Warning");
logger.error(Error("Log Error"));
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
