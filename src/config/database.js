import { Client } from 'cassandra-driver';

const client = new Client({
    contactPoints: ['127.0.0.1'], // Puedes especificar aquí los nodos de tu clúster de Cassandra
    localDataCenter: 'datacenter1', // Especifica el datacenter local si es relevante para tu configuración
    keyspace: 'jsonfiles' // Especifica el keyspace que quieres utilizar
});

// Función para conectar a Cassandra
async function conectarCassandra() {
    try {
        await client.connect();
        console.log('Conectado a Cassandra');
    } catch (error) {
        console.error('Error al conectar a Cassandra:', error);
    }
}

export default client;