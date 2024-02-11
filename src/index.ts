import cluster from 'cluster';
import { Server, createServer } from 'http';
import { cpus } from 'os';
import { router } from './router/router';
import { UsersRepository } from './users/repository';

const DEFAULT_PORT = 4000;
const numCPUs = cpus().length;

let server: Server;
const usersRepository = new UsersRepository([]); 

if (process.env.MODE === 'cluster' && cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork({ workerId: i + 1, usersRepository: JSON.stringify(usersRepository) }); 
    }
} else {
    const workerId = Number(process.env.workerId);
    const PORT = DEFAULT_PORT + (workerId || 0);
    server = createServer(router(usersRepository)); 

    server.listen(PORT, () => {
        console.log(`Worker ${process.pid} started and listening on port ${PORT}`);
    });
}

export { server };
