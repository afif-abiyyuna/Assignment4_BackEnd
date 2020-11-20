const express = require ("express");
const cors = require ("cors");
const bodyParser = require ("body-parser");
const mongooseConnection = require ("./configurations/mongoose.config");
const routes = require ("./routes")
const app = express();
const port = 3000;

var corsOptions = {origin: "http://localhost:8081"};
app.use(cors(corsOptions));
mongooseConnection();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);


app.listen(port, ()=>{
    console.log(`App runs on http://localhost:${port}`);
});