import { conectarCassandra, insertarJson, obtenerJson, actualizarJson, eliminarJson } from '../models/jsonModel.js';

async function crearJson(req, res) {
    const { nombre, contenido } = req.body;
    await conectarCassandra();
    await insertarJson(nombre, contenido);
    res.send('Archivo JSON creado correctamente.');
}

async function obtenerJsonPorNombre(req, res) {
    const nombre = req.params.nombre;
    await conectarCassandra();
    const json = await obtenerJson(nombre);
    if (json) {
        res.json(json);
    } else {
        res.status(404).send('No se encontró ningún archivo JSON con ese nombre.');
    }
}

async function actualizarJsonPorNombre(req, res) {
    const { nombre } = req.params;
    const { contenido } = req.body;
    await conectarCassandra();
    await actualizarJson(nombre, contenido);
    res.send('Archivo JSON actualizado correctamente.');
}

async function eliminarJsonPorNombre(req, res) {
    const nombre = req.params.nombre;
    await conectarCassandra();
    await eliminarJson(nombre);
    res.send('Archivo JSON eliminado correctamente.');
}

export { crearJson, obtenerJsonPorNombre, actualizarJsonPorNombre, eliminarJsonPorNombre };
