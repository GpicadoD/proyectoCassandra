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


Jsonrouter.get('/222', async (req2, res) => {
    try {
        res.render('diseño', { title: 'Ver Colecciones'});

    } catch (error) {
        res.status(500).render('error', { error: 'Error al recuperar documentos' });
    }
});

Jsonrouter.get('/1', async (req2, res) => {
    try {
        res.render('diseñoFormulario.ejs', { title: 'Ver Colecciones'});

    } catch (error) {
        res.status(500).render('error', { error: 'Error al recuperar documentos' });
    }
});

export default Jsonrouter;
