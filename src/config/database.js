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

export default client;