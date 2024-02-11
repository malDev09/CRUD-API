import cluster from 'cluster';
import http, { IncomingMessage, ServerResponse } from 'http';
import { cpus } from 'os';

const PORT = 4000;
const numCPUs = cpus().length;

if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork({ workerId: i + 1 }); 
    }
} else {
    const workerId = Number(process.env.workerId);
    const targetPort = PORT + workerId;

    const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
        const targetUrl = `http://localhost:${targetPort}${req.url}`;
        console.log(`Forwarding request to worker ${workerId}, target URL: ${targetUrl}`);

        const proxyReq = http.request(targetUrl, { method: req.method, headers: req.headers });

        proxyReq.on('response', (proxyRes) => {
            res.writeHead(proxyRes.statusCode || 500, proxyRes.headers || {});
            proxyRes.pipe(res, { end: true });
        });

        req.pipe(proxyReq, { end: true });
    });

    server.listen(targetPort, () => {
        console.log(`Worker ${process.pid} started and listening on port ${targetPort}`);
    });
}
