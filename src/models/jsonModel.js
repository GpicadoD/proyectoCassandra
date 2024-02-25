import { Client } from 'cassandra-driver';

// Creación de un cliente Cassandra
const client = new Client({
    contactPoints: ['127.0.0.1'], 
    localDataCenter: 'datacenter1', 
    keyspace: 'jsonfiles' 
});

// Función asincrónica para conectar con Cassandra
async function conectarCassandra() {
    try {
        await client.connect(); 
        console.log('Conectado a Cassandra'); 
    } catch (error) {
        console.error('Error al conectar a Cassandra:', error); 
    }
}

// Función asincrónica para insertar un archivo JSON en Cassandra
async function insertarJson(nombre, contenido) {
    const query = 'INSERT INTO files (nombre, contenido) VALUES (?, ?)'; 
    try {
        const comprobacion = await obtenerJson(nombre); 
        if (comprobacion != null) return "Archivo ya existente"; 
        const contenidoJson = JSON.parse(contenido);
        await client.execute(query, [nombre, JSON.stringify(contenidoJson)]); 
        return 'Archivo JSON insertado correctamente.'; 
    } catch (error) {
        return 'Error al insertar el archivo JSON:'; 
    }
}

// Función asincrónica para insertar un archivo en Cassandra sin analizar el contenido como JSON
async function insertarArchivo(nombre, contenido) {
    try {
        const comprobacion = await obtenerJson(nombre); 
        console.log(comprobacion); 
        if (comprobacion != null) return "Archivo ya existente"; 
        const query = 'INSERT INTO files (nombre, contenido) VALUES (?, ?)'; 
        await client.execute(query, [nombre, contenido]); 
        return 'Archivo JSON insertado correctamente.'; 
    } catch (error) {
        console.error('Error al insertar el archivo JSON:', error);
    }
}

// Función asincrónica para obtener todos los archivos JSON almacenados en Cassandra
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

// Función asincrónica para obtener un archivo JSON por su nombre
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

// Función asincrónica para actualizar un archivo JSON en Cassandra
async function actualizarJson(nombre, contenido) {
    const query = 'UPDATE files SET contenido = ? WHERE nombre = ?'; 
    try {
        await client.execute(query, [contenido, nombre]); 
        console.log('Archivo JSON actualizado correctamente.'); 
    } catch (error) {
        console.error('Error al actualizar el archivo JSON:', error); 
    }
}

// Función asincrónica para eliminar un archivo JSON de Cassandra por su nombre
async function eliminarJson(nombre) {
    const query = 'DELETE FROM files WHERE nombre = ?';
    try {
        await client.execute(query, [nombre]); 
        console.log('Archivo JSON eliminado correctamente.');
    } catch (error) {
        console.error('Error al eliminar el archivo JSON:', error); 
    }
}

// Exportación de las funciones para su uso en otros módulos
export { conectarCassandra, insertarJson, obtenerJson, actualizarJson, eliminarJson, obtenerTodoJson, insertarArchivo };
