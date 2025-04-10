import {Server} from 'socket.io';


const allowedOrigins = [
    "http://localhost:3000",        // Local client
    "http://localhost:5173",        // Local Vite (admin)
    "http://thaprotg.thapar.edu",   // Deployed client
    "https://thaprotg.thapar.edu",
    "http://adminthaprotg.thapar.edu", // Deployed admin
    "https://adminthaprotg.thapar.edu"
  ];

const socketSetup = (server) => {
	const io = new Server(server, {
        cors: {
            origin: allowedOrigins, // ✅ Allow connections from frontend
            methods: ["GET", "POST"], // ✅ Allow necessary HTTP methods
            credentials: true, // ✅ Allow cookies & authentication headers
        }
    });

	io.on('connection',(socket) => {

		socket.on('disconnect',() => {
		})

		socket.on('suspend',(msg) => {
			io.emit('suspend',msg);
		})

		socket.on('active',(msg) => {
		})
	})

	return io;
}

export default socketSetup;