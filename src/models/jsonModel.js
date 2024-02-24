import { Client } from 'cassandra-driver';

const client = new Client({
    contactPoints: ['127.0.0.1'],
    localDataCenter: 'datacenter1',
    keyspace: 'jsonfiles'
});

async function conectarCassandra() {
    try {
        await client.connect();
        console.log('Conectado a Cassandra');
    } catch (error) {
        console.error('Error al conectar a Cassandra:', error);
    }
}

async function insertarJson(nombre, contenido) {
    const query = 'INSERT INTO files (nombre, contenido) VALUES (?, ?)';
    try {
        const contenidoJson = JSON.parse(contenido);
        await client.execute(query, [nombre, JSON.stringify(contenidoJson)]);
        console.log('Archivo JSON insertado correctamente.');
    } catch (error) {
        console.error('Error al insertar el archivo JSON:', error);
    }
}

async function insertarArchivo(nombre, contenido) {
    try {
        const query = 'INSERT INTO files (nombre, contenido) VALUES (?, ?)';
        await client.execute(query, [nombre, contenido]);
        console.log('Archivo JSON insertado correctamente.');
    } catch (error) {
        console.error('Error al insertar el archivo JSON:', error);
    }
}

async function obtenerTodoJson() {
    const query = 'SELECT nombre, contenido FROM files';
    try {
        const result = await client.execute(query);
        if (result.rows.length > 0) {
            return result;
        } else {
            console.log('No se encontró ningún archivo JSON.');
            return null;
        }
    } catch (error) {
        console.error('Error al obtener el archivo JSON:', error);
        return null;
    }
}

async function obtenerJson(nombre) {
    const query = 'SELECT nombre, contenido FROM files WHERE nombre = ?';
    try {
        const result = await client.execute(query, [nombre]);
        if (result.rows.length > 0) {
            return result.rows[0];
        } else {
            console.log('No se encontró ningún archivo JSON con ese nombre.');
            return null;
        }
    } catch (error) {
        console.error('Error al obtener el archivo JSON:', error);
        return null;
    }
}

async function actualizarJson(nombre, contenido) {
    const query = 'UPDATE files SET contenido = ? WHERE nombre = ?';
    try {
        await client.execute(query, [contenido, nombre]);
        console.log('Archivo JSON actualizado correctamente.');
    } catch (error) {
        console.error('Error al actualizar el archivo JSON:', error);
    }
}

async function eliminarJson(nombre) {
    const query = 'DELETE FROM files WHERE nombre = ?';
    try {
        await client.execute(query, [nombre]);
        console.log('Archivo JSON eliminado correctamente.');
    } catch (error) {
        console.error('Error al eliminar el archivo JSON:', error);
    }
}

export { conectarCassandra, insertarJson, obtenerJson, actualizarJson, eliminarJson, obtenerTodoJson, insertarArchivo };
