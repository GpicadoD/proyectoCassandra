import express from "express";
import bodyParser from "body-parser";
import Jsonrouter from "./routes/jsonRoutes.js";
import client from "./config/database.js";

// Creación de la aplicación Express
const app = express(); 

// Configuración del puerto y del formato de presentación JSON
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

// Configuración del motor de vistas y middleware para analizar cuerpos de solicitudes
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Utilización del enrutador JSON y middleware para servir archivos estáticos
app.use(Jsonrouter);
app.use(express.static('public'));

// El servidor escucha en el puerto configurado y se conecta a la base de datos
app.listen(app.get('port'), async () => {
    await client.connect();
    console.log(`Server listening on port ${app.get('port')}`);
});
