const express = require("express");
const app = express();
const db = require("./api/models");
const initRoutes = require("./api/routes/web");

global.__basedir = __dirname;

app.use(express.urlencoded({ extended: true }));
initRoutes(app);
app.set('view engine', 'pug');

db.sequelize.sync();

let port = 3000;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
