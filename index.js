const request = require("request");
var express = require("express");
var dotenv = require("dotenv");
var bodyParser = require("body-parser");
var app = express();
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var port = 9000;

app.get("/", function (req, res) {
  res.json({ code: 405, message: "Method not allowed" });
});

// app.post("/", function (req, res) {
//   try {
//     console.log("received request");
//     let message = req.body.message;
//     let tokenList = req.body.token;

//     //requset to line notify
//     tokenList.forEach(function (token) {
//       let options = {
//         method: "POST",
//         url: "https://notify-api.line.me/api/notify",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//           Authorization: "Bearer " + token,
//         },
//         form: { message: message },
//       };
//       request(options, function (error, response, body) {
//         if (error) throw new Error(error);
//         console.log(body);
//       });
//     });
//     res.json({ code: 200, message: "success" });
//   } catch (error) {
//     console.log("Request error");
//     res.json({ code: 500, message: "Internal server error" });
//   }
// });

// start the server
app.listen(port);
console.log("Server started! At http://localhost:" + port);
