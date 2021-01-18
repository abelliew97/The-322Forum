const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001;
const mongoose = require("mongoose");
const { MONGOURI } = require("./config/key");

const path = require('path')


mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});

mongoose.connection.on("error", err => {
  console.log(err);
});

require("./models/user");
require("./models/post");

//Text fix
// app.use(express.static(__dirname + '/public'));

// app.use(bodyParser.urlencoded({
//    extended: false
// }));

// app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));


app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/public/index.html"));
});


app.listen(PORT, () => {
  console.log("server is running on", PORT);
});
