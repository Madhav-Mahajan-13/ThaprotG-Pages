import {Server} from 'socket.io';

const socketSetup = (server) => {
	const io = new Server(server);

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