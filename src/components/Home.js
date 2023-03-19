import { useEffect } from 'react';
import { Container } from "@mui/material";
import Navigation from "./Navigation";
import Chat from "./Chat";
import socket from '../socket';

const Home = () => {
	useEffect(() => {
		const sessionId = localStorage.getItem('sessionId');

		if (sessionId) {
			socket.auth = { sessionId };
		} else {
			socket.auth = { token: localStorage.getItem('loginToken')};
		}
		socket.connect();
	}, [])
	return (
		<Container maxWidth="xl" sx={{ pt: 2 }}>
			<Navigation />
			<Chat />
		</Container>
	);
};

export default Home;
