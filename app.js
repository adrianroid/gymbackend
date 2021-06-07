var express = require("express");

const app = express();
const PORT = process.env.PORT || 4000;
var bodyParser = require("body-parser");

const routing = require("./routes/api");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const localtunnel = require("localtunnel");
try {
  const MONGO = require("./db").getDB();
} catch (err) {
  console.log(err);
}

// app.use(bodyParser.json());
const allowCrossDomain = (req, res, next) => {
  // if (['GET', 'POST'].indexOf(req.method) > -1) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Accept,Authorization,Origin,X-Requested-With,Content-Type,Accept,Key,Bypass-Tunnel-Reminder,Content-Length");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
  // }
  next();
};
app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: false, limit:'200000mb' }));
app.use(bodyParser.json({limit:'200000mb' }));
app.get("/", (req, res) => {
  res.status(200).send("Hello.");
});
// app.use("/user", user);
routing(app);
// app.use(app.router);
// routes.initialize(app);
var admin = require("firebase-admin");

var serviceAccount = require("./polos-gym-firebase-adminsdk-1mcqs-2803453580.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://polos-gym-default-rtdb.firebaseio.com",
});

(async () => {
  const tunnel = await localtunnel({ port: 3000 });

  // the assigned public url for your tunnel
  // i.e. https://abcdefgjhij.localtunnel.me
  tunnel.url;
  const db = admin.database();
  const ref = db.ref("/backend");
  ref.update({
    url: tunnel.url,
  });
  console.log(tunnel.url)
  tunnel.on("close", async () => {
    ref.update({
      url: null,
    });
  });
})();
module.exports = app;
