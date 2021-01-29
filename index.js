const express = require("express");
let mongoose = require('mongoose');
const ip = require("ip");
const fs = require("fs")
const path = require("path")
const chalk = require("chalk");
const bodyParser = require("body-parser");
const static = require('serve-static')
const documentRouter = require('./routes/documenRouter');
const formidable = require('./utils/formParser').formidable;
require("dotenv").config();
const port = process.env.PORT || 8000;
if (!fs.existsSync(`./public`)) fs.mkdirSync(`./public`);

mongoose.connect(process.env.MONGODB_URL || `mongodb://${process.env.HOST}/${process.env.DATABASENAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const app = express();
app.use(
    formidable,
    bodyParser.json({ limit: "50mb" }),
    bodyParser.urlencoded({ extended: true })
)
app.use("/static", static(path.join(__dirname, "public")));
app.use('/api/document', documentRouter);

app.set("view engine", "ejs");

app.use('/', (request, response) => {
    response.sendFile(path.resolve(__dirname, "views/index.html"))
});

app.listen(port, () => {
    console.log(`You can also use: `,`${"http://"}${ip.address()}:${port}`);
});