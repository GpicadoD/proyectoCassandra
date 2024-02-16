import express from "express";
import bodyParser from "body-parser";
import Jsonrouter from "./routes/jsonRoutes.js";
import client from "./config/database.js"; // Importa el cliente de Cassandra

const app = express();

// Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//Configuramos para que la vista sea mediante modelo ejs.
app.set('view engine', 'ejs');

// configura la vista para que sea ejs
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// Routes
app.use(Jsonrouter);

//Iniciando el servidor, escuchando...
app.listen(app.get('port'), async () => {
    await client.connect(); // Conecta a Cassandra antes de iniciar el servidor Express
    console.log(`Server listening on port ${app.get('port')}`);
});