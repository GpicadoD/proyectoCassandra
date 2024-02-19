import express from 'express';
import { crearJson, obtenerJsonPorNombre, actualizarJsonPorNombre, eliminarJsonPorNombre } from '../controllers/jsonController.js';

const Jsonrouter = express.Router();

Jsonrouter.post('/json', crearJson);
Jsonrouter.get('/json/:nombre', obtenerJsonPorNombre);
Jsonrouter.put('/json/:nombre', actualizarJsonPorNombre);
Jsonrouter.delete('/json/:nombre', eliminarJsonPorNombre);

Jsonrouter.get('/', async (req2, res) => {
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
