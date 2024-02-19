import express from 'express';
import { crearJson, obtenerJsonPorNombre, actualizarJsonPorNombre, eliminarJsonPorNombre, obtenerTodosJson, insertarArchivoJson } from '../controllers/jsonController.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });
const Jsonrouter = express.Router();

Jsonrouter.post('/crearjson', crearJson);
Jsonrouter.post('/archivojson',upload.single('archivojson'), insertarArchivoJson);
Jsonrouter.post('/actualizarjson/:nombre', actualizarJsonPorNombre);
Jsonrouter.post('/eliminarjson/:nombre', eliminarJsonPorNombre);

Jsonrouter.get('/', obtenerTodosJson);
Jsonrouter.post('/buscarjson', obtenerJsonPorNombre);
Jsonrouter.get('/insertarjson', function(req, res) {
    res.render('insertarjson');
});


export default Jsonrouter;
