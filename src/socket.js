import { io } from 'socket.io-client';

const URL = 'https://luvit-backend.onrender.com';
const socket = io(URL, { autoConnect: false });

// socket.onAny((event, ...args) => {
//   console.log(event, args);
// });

socket.on('connect_error', (err) => {
  localStorage.removeItem('sessionId');
	if (err.message == 'invalid user'){
		alert('Invalid User socket.io connect failed');
	}
})

socket.on('session', ({ sessionId, userEmail }) => {
  // attach the sessionId to the next reconnection attempts
  socket.auth = { sessionId };
  localStorage.setItem('sessionId', sessionId);
  socket.userEmail = userEmail;
})

socket.on("user connected", (user) => {
  this.users.push(user);
});

export default socket;