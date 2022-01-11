const request = require("request");
var express = require("express");
var dotenv = require("dotenv");
var bodyParser = require("body-parser");
const cors = require("cors");
dotenv.config();

var app = express();

const corsOptions = {
  origin: [
    "http://localhost",
    "https://sandbox.dexystore.me",
    "https://dexystore.me",
  ],
  credentials: true,
};
app.use(bodyParser.json({limit: '2000mb'}));
app.use(bodyParser.urlencoded({limit: '2000mb', extended: true}));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

var port = process.env.PORT || 9000;

app.get("/", function (req, res) {
  res.json({ code: 405, message: "Method not allowed" });
});

app.post("/", function (req, res) {
  try {
    console.log("received request");
    let message = req.body.message;
    let tokenList = req.body["token[]"];
    let isArray = Array.isArray(tokenList);

    //requset to line notify
    if (isArray) {
      tokenList.forEach(function (token) {
        sendLine(token, message);
      });
    } else {
      sendLine(tokenList, message);
    }

    res.json({
      code: 200,
      message: "success",
    });
  } catch (error) {
    console.log("Request error");
    res.json({
      code: 500,
      message: "Internal server error",
      body: req.body,
      error: error,
    });
  }
});

app.get(
  ["/cache/localhost", "/cache/sandbox", "/cache/dexystore"],
  (req, res) => {
    res.json({
      code: 405,
      message: "Method not allowed",
    });
  }
);

app.put(
  ["/cache/localhost", "/cache/sandbox", "/cache/dexystore"],
  (req, res) => {
    res.json({
      code: 200,
      message: "success",
    });
    console.log(req.body);
  }
);

// start the server
app.listen(port);
console.log("Server started! At http://localhost:" + port);

function sendLine(token = "", message = "") {
  let options = {
    method: "POST",
    url: "https://notify-api.line.me/api/notify",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + token,
    },
    form: { message: message },
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });
}
