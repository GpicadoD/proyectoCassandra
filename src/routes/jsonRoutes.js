import express from 'express';
import { crearJson, obtenerJsonPorNombre, actualizarJsonPorNombre, eliminarJsonPorNombre, obtenerTodosJson, insertarArchivoJson } from '../controllers/jsonController.js';
import multer from 'multer';

// Configuración de almacenamiento en memoria para multer
const storage = multer.memoryStorage(); 
// Configuración de multer para manejar la subida de archivos utilizando la configuración de almacenamiento definida anteriormente
const upload = multer({ storage }); 
// Creación de un enrutador de Express
const Jsonrouter = express.Router(); 

// Definición de rutas y asignación de controladores
Jsonrouter.post('/crearjson', crearJson);
Jsonrouter.post('/archivojson', upload.single('archivojson'), insertarArchivoJson);
Jsonrouter.post('/actualizarjson/:nombre', actualizarJsonPorNombre);
Jsonrouter.post('/eliminarjson/:nombre', eliminarJsonPorNombre);
Jsonrouter.get('/', obtenerTodosJson);
Jsonrouter.post('/buscarjson', obtenerJsonPorNombre);

// Renderiza la vista 'insertarjson'
Jsonrouter.get('/insertarjson', function(req, res) {
    res.render('insertarjson'); 
});

// Renderiza la vista 'diseño' con un título y Renderiza la vista de error en caso de una excepción
Jsonrouter.get('/222', async (req2, res) => {
    try {
        res.render('diseño', { title: 'Ver Colecciones' }); 

    } catch (error) {
        res.status(500).render('error', { error: 'Error al recuperar documentos' }); 
    }
});

// Renderiza la vista 'diseñoFormulario.ejs' con un título y Renderiza la vista de error en caso de una excepción
Jsonrouter.get('/1', async (req2, res) => {
    try {
        res.render('diseñoFormulario.ejs', { title: 'Ver Colecciones' }); 

    } catch (error) {
        res.status(500).render('error', { error: 'Error al recuperar documentos' }); 
    }
});
// Exporta el enrutador
export default Jsonrouter; 
