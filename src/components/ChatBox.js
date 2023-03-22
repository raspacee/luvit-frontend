import { useState, useRef, useEffect } from "react";
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
import SendIcon from "@mui/icons-material/Send";
import moment from "moment";

const ChatBox = (props) => {
	const [message, setMessage] = useState("");
	const userEmail = localStorage.getItem("userInfo").email;
	const messagesEndRef = useRef();

	const scrollToBottom = () => {
		console.log('called')
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}

	useEffect(() => {
		scrollToBottom();	
	}, [props.friends])

	if (props.friends == null) {
		return (
			<Typography variant="h3" sx={{ color: "#fff" }}>
				Sad :(, such a barren chat
			</Typography>
		);
	}

	const messagesRendered = props.friends[props.tabIndex].chat.map(
		(message, idx) => {
			const flexDecision =
				userEmail === message.from ? "flex-end" : "flex-start";
			return (
				<ListItem
					key={idx}
					style={{
						display: "flex",
						justifyContent: `${flexDecision}`,
					}}
				>
					{localStorage.getItem("userInfo").email === message.from ? (
						<Box
							sx={{
								color: "#fff",
								fontFamily: "Roboto",
								bgcolor: "#D19957",
								p: 3,
								borderRadius: 6,
							}}
						>
							{message.message}
						</Box>
					) : (
						<>
							<Typography
								variant="button"
								gutterBottom
								sx={{ color: "#fff", mr: 1.5 }}
							>
								{moment(message.time).format("h:mm a")}
							</Typography>
							<Box
								sx={{
									color: "#fff",
									fontFamily: "Roboto",
									bgcolor: "#533E6E",
									p: 3,
									borderRadius: 6,
								}}
							>
								{message.message}
							</Box>
						</>
					)}
				</ListItem>
			);
		}
	);
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				minHeight: "15rem",
				bgcolor: "#76599B",
				maxHeight: '28rem',
				borderRadius: 7,
				overflow: 'scroll',
				p: 5,
			}}
		>
			<List>
			{messagesRendered}
			<div ref={messagesEndRef} />
			</List>
			<Box sx={{ display: "flex", alignContent: "center" }}>
				<TextField
					id="outlined-basic"
					label="TYPE A MESSAGE"
					variant="outlined"
					sx={{ bgcolor: "#fff", borderRadius: 25, width: "90%" }}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<IconButton
					sx={{ ml: 3 }}
					onClick={() => {
						if (message != "") {
							props.sendMessageHandler(message);
							setMessage("");
						}
					}}
				>
					<SendIcon fontSize="large" sx={{ color: "#2952BA" }} />
				</IconButton>
			</Box>
		</Box>
	);
};

export default ChatBox;
