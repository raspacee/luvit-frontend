import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
	Grid,
	Box,
	Typography,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Input,
	TextField,
	IconButton,
} from "@mui/material";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
import socket from "../socket";

const theme = createTheme({
	palette: {
		primary: {
			main: "#06BB39",
		},
		secondary: {
			main: "#D10000",
		},
	},
});

const Chat = () => {
	const [friends, setFriends] = useState(null);
	const [tabIndex, setTabIndex] = useState(0);

	const handleTabChange = (id) => {
		const idx = friends.findIndex((friend) => {
			return friend._id == id;
		});
		setTabIndex(idx);
	};

	useEffect(() => {
		socket.on("private message", (message) => {
			console.log(message);
			setFriends((oldfriends) => {
				const index = oldfriends.findIndex((f) => f.email == message.from);
				addMessage(message, index);
				let tmp = [...oldfriends]
				return tmp;
			});
		});

		socket.on("friends", (friends) => {
			console.log(friends);
			setFriends(friends);
		});

		return () => {
			socket.off("connect");
			socket.off("disconnect");
			socket.off("message");
		};
	}, []);

	const addMessage = (message, index) => {
		setFriends((oldfriends) => {
			// console.log(friends);
			let newFriends = [...oldfriends];
			// let fromSelf;
			// fromSelf = from == socketID;
			// const newMessage = {
			// 	message,
			// 	fromSelf,
			// 	fromUsername,
			// 	time,
			// };
			// newUsers[chatIndex].chat.push(newMessage);
			newFriends[index].chat.push(message);
			return newFriends;
		});
	};

	const sendMessageHandler = (message) => {
		addMessage({ message, from: localStorage.getItem('userInfo').email, time: new Date().toLocaleString() }, tabIndex);

		socket.emit("private message", {
			message,
			to: friends[tabIndex].email,
			time: new Date().toLocaleString(),
		});
	};

	return (
		<ThemeProvider theme={theme}>
			<Grid container spacing={5} sx={{ mt: 0 }}>
				<Grid item xs={4}>
					<ChatList
						friends={friends}
						handleTabChange={handleTabChange}
					/>
				</Grid>
				<Grid item xs={8}>
					<ChatBox
						friends={friends}
						tabIndex={tabIndex}
						sendMessageHandler={sendMessageHandler}
					/>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
};
export default Chat;
