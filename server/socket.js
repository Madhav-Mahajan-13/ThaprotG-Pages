import {Server} from 'socket.io';


const allowedOrigins = [
    "http://localhost:3000",  // Local React frontend
    "http://localhost:5173",  // Local React frontend
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
		console.log("A new User connected");

		socket.on('disconnect',() => {
			console.log("User has disconnected");
		})

		socket.on('suspend',(msg) => {
			io.emit('suspend',msg);
		})

		socket.on('active',(msg) => {
			console.log(`${msg.id} activated`);
		})
	})

	return io;
}

export default socketSetup;