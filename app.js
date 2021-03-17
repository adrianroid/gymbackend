var express = require('express'),
    exphbs  = require('express-handlebars'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    TwitterStrategy = require('passport-twitter'),
    GoolgeStrategy = require('passport-google'),
    FacebookStrategy = require('passport-facebook');
    
const app = express();
const PORT = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const routing = require('./routes/api');
try { const MONGO = require("./db").getDB(); } catch (err) { console.log(err) }

app.use(bodyParser.json());
const allowCrossDomain = (req, res, next) => {
  if (['GET', 'POST'].indexOf(req.method) > -1) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Accept,Authorization,Origin,X-Requested-With,Content-Type,Accept,Key');
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  next();
};
app.use(allowCrossDomain);

app.get("/", (req, res) => {
  res.status(200).send("Hello.")
});
// app.use("/user", user);
routing(app);

module.exports = app;