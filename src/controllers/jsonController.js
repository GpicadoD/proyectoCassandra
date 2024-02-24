import fs from 'fs';
import {
    actualizarJson,
    conectarCassandra,
    eliminarJson,
    insertarArchivo,
    insertarJson,
    obtenerJson,
    obtenerTodoJson
} from '../models/jsonModel.js';

async function crearJson(req, res) {
    const {nombre, contenido} = req.body;
    await conectarCassandra();
    await insertarJson(nombre, contenido);
    const mensaje = 'Archivo JSON creado correctamente.';
    res.send(`<script>alert('${mensaje}'); window.location.href = '/';</script>`);
}

async function insertarArchivoJson(req, res) {
    if (req.file == null) {
        return res.send(`<script>alert('${"El json no tiene ningun contenido"}'); window.location.href = '/insertarJson';</script>`);
    }
    const nombre = req.file.originalname;
    const contenido = req.file.buffer.toString('utf8');

    try {
        verificarArchivoEsJsonValido(contenido)
    } catch (error) {
        return res.send(`<script>alert('${"El json no tiene un formato valido"}'); window.location.href = '/insertarJson';</script>`);
    }
    await conectarCassandra();
    await insertarArchivo(nombre, contenido);
    const mensaje = 'Archivo JSON creado correctamente.';
    return res.send(`<script>alert('${mensaje}'); window.location.href = '/';</script>`);
}

function verificarArchivoEsJsonValido(contenido) {
    const objeto = JSON.parse(contenido);
}

async function obtenerTodosJson(req, res) {
    await conectarCassandra();
    let json = await obtenerTodoJson();
    if (!json) {
        json = { rows: [] };
    }
    let contenido = json.rows.map(row => {
        return {
            nombre: row.nombre,
            contenidoFormateado: JSON.parse(row.contenido)
        };
    });
    
    res.render('index', { json: contenido });
}


async function obtenerJsonPorNombre(req, res) {
    const {nombre} = req.body;
    await conectarCassandra();
    const json = await obtenerJson(nombre);
    if (json) {
        res.render('vistajson', {json: json});
    } else {
        const mensaje = 'No se encontró ningún archivo JSON con ese nombre.';
        res.status(404).send(`<script>alert('${mensaje}'); window.location.href = '/';</script>`);
    }
}

async function actualizarJsonPorNombre(req, res) {
    const {nombre} = req.params;
    const {contenido} = req.body;
    try{
        await conectarCassandra();
        verificarArchivoEsJsonValido(contenido);
        await actualizarJson(nombre, contenido);
        const mensaje = 'Archivo JSON actualizado correctamente.';
        res.send(`<script>alert('${mensaje}'); window.location.href = '/';</script>`);
    }catch(error){
        return res.send(`<script>alert('${"El json no tiene un formato valido"}'); window.location.href = '/';</script>`);
    }
}

async function eliminarJsonPorNombre(req, res) {
    const nombre = req.params.nombre;
    await conectarCassandra();
    await eliminarJson(nombre);
    const mensaje = 'Archivo JSON eliminado correctamente.';
    res.send(`<script>alert('${mensaje}'); window.location.href = '/';</script>`);
}

export {
    crearJson,
    obtenerJsonPorNombre,
    actualizarJsonPorNombre,
    eliminarJsonPorNombre,
    obtenerTodosJson,
    insertarArchivoJson
};
