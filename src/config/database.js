import { Client } from 'cassandra-driver';

// Creación de un cliente Cassandra con la configuración especificada
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

// Exportación del cliente para su uso en otros módulos
export default client; 
