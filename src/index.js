import express from "express";
import bodyParser from "body-parser";
import Jsonrouter from "./routes/jsonRoutes.js";
import client from "./config/database.js";

const app = express();


app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);


app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(Jsonrouter);

app.use(express.static('public'));


app.listen(app.get('port'), async () => {
    await client.connect();
    console.log(`Server listening on port ${app.get('port')}`);
});