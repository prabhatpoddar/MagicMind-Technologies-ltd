const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const httpLogger = require("./util/createLogger");
const cors = require("cors");
require("dotenv").config();

//User
const auth = require("./routes/auth.routes");
const user = require("./routes/user.routes");
const task = require("./routes/task.routes");
//middleware
const { checkGuestAccess } = require("./middleware/checkGuestAccess");
const { checkUserPermission } = require("./middleware/checkUserPermission");

const app = express();

app.get("/", (req, res) => res.send("Working!!!"));
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(httpLogger);

const dbURI = process.env.DB_URI;
mongoose.set("strictQuery", true);
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(process.env.PORT, () => {
      console.log("Application Started in Port " + process.env.PORT);
    });
  })
  .catch((err) => console.log(err));

//User
app.use("/api/auth", checkGuestAccess(), auth);
app.use("/api/user", checkUserPermission(), user);
app.use("/api/task", checkUserPermission(), task);
