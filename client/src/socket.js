import {backendHost} from "./config";
import {io} from 'socket.io-client';

const socket = io(backendHost);

export default socket;