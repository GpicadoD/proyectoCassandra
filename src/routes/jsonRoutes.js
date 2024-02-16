import express from 'express';
import { crearJson, obtenerJsonPorNombre, actualizarJsonPorNombre, eliminarJsonPorNombre } from '../controllers/jsonController.js';

const Jsonrouter = express.Router();

Jsonrouter.post('/json', crearJson);
Jsonrouter.get('/json/:nombre', obtenerJsonPorNombre);
Jsonrouter.put('/json/:nombre', actualizarJsonPorNombre);
Jsonrouter.delete('/json/:nombre', eliminarJsonPorNombre);

export default Jsonrouter;
