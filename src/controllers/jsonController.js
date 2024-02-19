import { conectarCassandra, insertarJson, obtenerJson, actualizarJson, eliminarJson, obtenerTodoJson, insertarArchivo } from '../models/jsonModel.js';

async function crearJson(req, res) {
    const { nombre, contenido } = req.body;
    await conectarCassandra();
    await insertarJson(nombre, contenido);
    const mensaje = 'Archivo JSON creado correctamente.';
    res.send(`<script>alert('${mensaje}'); window.location.href = '/';</script>`);
}

async function insertarArchivoJson(req, res) {
    const nombre = req.file.originalname;
    const contenido = req.file.buffer.toString('utf8');
    await conectarCassandra();
    await insertarArchivo (nombre, contenido);
    const mensaje = 'Archivo JSON creado correctamente.';
    res.send(`<script>alert('${mensaje}'); window.location.href = '/';</script>`);
}

async function obtenerTodosJson(req, res) {
    await conectarCassandra();
    const json = await obtenerTodoJson();
    if (json) {
        res.render('index', { json });
    } else {
        const mensaje = 'No se encontró ningún archivo JSON.';
        res.status(404).send(`<script>alert('${mensaje}'); window.location.href = '/';</script>`);
    }
}

async function obtenerJsonPorNombre(req, res) {
    const { nombre } = req.body;
    await conectarCassandra();
    const json = await obtenerJson(nombre);
    if (json) {
        res.render('vistajson', { json:json });
    } else {
        const mensaje = 'No se encontró ningún archivo JSON con ese nombre.';
        res.status(404).send(`<script>alert('${mensaje}'); window.location.href = '/';</script>`);
    }
}

async function actualizarJsonPorNombre(req, res) {
    const { nombre } = req.params;
    const { contenido } = req.body;
    await conectarCassandra();
    await actualizarJson(nombre, contenido);
    const mensaje = 'Archivo JSON actualizado correctamente.';
    res.send(`<script>alert('${mensaje}'); window.location.href = '/';</script>`);
}

async function eliminarJsonPorNombre(req, res) {
    const nombre = req.params.nombre;
    await conectarCassandra();
    await eliminarJson(nombre);
    const mensaje = 'Archivo JSON eliminado correctamente.';
    res.send(`<script>alert('${mensaje}'); window.location.href = '/';</script>`);
}

export { crearJson, obtenerJsonPorNombre, actualizarJsonPorNombre, eliminarJsonPorNombre, obtenerTodosJson, insertarArchivoJson };
