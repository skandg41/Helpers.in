const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const logger = require("./logger");
const users = require("./routes/api/users");
const customer = require("./routes/api/customer");
const jobseeker = require("./routes/api/jobseeker");
const app = express();
const path = require('path');
require('dotenv').config();
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
  .then(() => logger.log('Mongo DB Successfully connected'))
  .catch(err => logger.error('Mongo Connection error',{err:err}));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
 });

// Routes
app.use("/api/users", users);
app.use("/api/customer",customer);
app.use("/api/jobseeker",jobseeker);

const port = process.env.PORT || 5001;

app.listen(port, () => logger.info("Server running on port "+ port));
