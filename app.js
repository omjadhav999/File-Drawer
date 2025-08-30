var express = require("express");
var multer = require("multer");
const _ = require("lodash");

var app = express();
var PORT = 5173;
app.use(express.static("public"));
app.get("/file/:file", (req, res) => {
  res.sendFile(__dirname + "/images/" + req.params.file);
});

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./images");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});
var upload = multer({ storage: storage }).single("myfile");

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/upload", function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded successfully!");
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Running server on PORT ${PORT}...`);
});
