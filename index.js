const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const GenerateRouter = require("./routers/GenerateRouter");
const StatisticalRouter = require("./routers/StatisticalRouter");
const app = express();

const corsOpts = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(
    bodyParser.json({
        limit: "128mb",
    })
);
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: "128mb",
    })
);

app.get("/", (req, res) => {
    res.send("SUCCESS");
});

// routing
app.use(GenerateRouter, function (req, res, next) {
    next();
});
app.use(StatisticalRouter, function (req, res, next) {
    next();
});

app.listen(5000, () => {
    console.log("Server started on Port 5000.");
});
