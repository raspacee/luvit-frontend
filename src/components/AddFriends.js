import { useState, useEffect } from "react";
import {
	Box,
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Container,
	Grid,
	Typography,
	Divider,
	Button,
	TextField,
	IconButton,
	Card,
	CardMedia,
	CardActions,
	CardContent,
	Modal,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navigation from "./Navigation";
import SearchIcon from "@mui/icons-material/Search";
import { api } from '../api';

const theme = createTheme({
	palette: {
		primary: {
			main: "#76599B",
		},
		secondary: {
			main: "#2952BA",
		},
		green: {
			main: "#06BB39",
		},
	},
});

const AddFriends = () => {
	const [open, setOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [returnedQuery, setReturnedQuery] = useState(null);
	const [friends, setFriends] = useState([]);
	const [pendingRequests, setPendingRequests] = useState(null);

	useEffect(() => {
		const fetchFriends = async () => {
			const response = await fetch(api.friendsUrl, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"loginToken"
					)}`,
				},
			});
			const data = await response.json();
			setFriends(data.friends);
		};

		const fetchRequests = async () => {
			const response = await fetch(api.friendRequestsUrl, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"loginToken"
					)}`,
				},
			});
			const data = await response.json();
			if (data.requests.length) {
				setPendingRequests(data.requests);
			}
		};
		fetchFriends();
		fetchRequests();
	}, []);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const friendsRendered = friends.map((friend) => {
		return (
			<>
				<ListItem key={friend.email}>
					<ListItemAvatar sx={{ mr: 3 }}>
						<Avatar
							sx={{
								bgcolor: "orange",
								height: 60,
								width: 60,
							}}
						>
							TC
						</Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={
							<Typography
								sx={{
									color: "#fff",
									fontWeight: "bold",
									fontSize: 19,
								}}
							>
								{friend.username}
							</Typography>
						}
						secondary={
							<Button
								sx={{
									bgcolor: "#D10000",
									borderRadius: 15,
									width: "7rem",
									height: "1.5rem",
									mt: 1,
									color: "#fff",
								}}
								variant="contained"
							>
								Remove
							</Button>
						}
					/>
				</ListItem>
				<Divider
					variant="inset"
					component="li"
					sx={{ bgcolor: "#DBDBDB" }}
				/>
			</>
		);
	});

	const searchQueryHandler = async () => {
		if (searchQuery != "") {
			const url = `http://localhost:4000/api/search?searchQuery=${searchQuery}`;
			setSearchQuery("");
			const response = await fetch(api.searchUrl + `?searchQuery=${searchQuery}`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"loginToken"
					)}`,
				},
			});
			const data = await response.json();
			if (data.users) {
				setReturnedQuery(data.users);
			}
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<Container maxWidth="xl" sx={{ pt: 2 }}>
				<Navigation />
				<Grid container spacing={5} sx={{ mt: 0 }}>
					<Grid item xs={4} sx={{ textAlign: "center" }}>
						<Typography
							sx={{ color: "#fff", ml: -5, mb: 3 }}
							variant="h6"
						>
							FRIENDS
						</Typography>
						<Box sx={{ bgcolor: "#76599B", borderRadius: 7, p: 3 }}>
							<List
								sx={{
									width: "100%",
								}}
							>
								{friendsRendered}
							</List>
						</Box>
						<Button
							sx={{
								mt: 4,
								width: "100%",
								borderRadius: 25,
								height: "2.5rem",
							}}
							variant="contained"
							color="secondary"
							onClick={handleOpen}
						>
							Show pending requests
						</Button>
					</Grid>
					<Grid item xs={8} sx={{ textAlign: "center" }}>
						<TextField
							id="outlined-basic"
							variant="outlined"
							placeholder="Enter Name"
							sx={{
								bgcolor: "#fff",
								borderRadius: 25,
								width: "50%",
							}}
							value={searchQuery}
							onChange={(e) => {
								setSearchQuery(e.target.value);
							}}
						/>
						<IconButton onClick={searchQueryHandler}>
							<SearchIcon sx={{ fontSize: "3rem", ml: 2 }} />
						</IconButton>
						<Box sx={{ display: "flex" }}>
							{returnedQuery == null ? (
								<Typography sx={{ color: "#fff" }} variant="h3">
									Try searching some people from above...
								</Typography>
							) : (
								returnedQuery.map((user) => {
									return (
										<Card
											sx={{
												width: "50%",
												bgcolor: "#76599B",
												pt: "2rem",
												pb: "2rem",
												borderRadius: 10,
											}}
											key={user.username}
										>
											<CardMedia
												children={
													<Avatar
														sx={{
															bgcolor: "orange",
															height: 90,
															width: 90,
															margin: "auto",
														}}
													>
														TC
													</Avatar>
												}
												alt="green iguana"
											/>
											<CardContent>
												<Typography
													sx={{
														color: "#fff",
														fontWeight: "bold",
														fontSize: 20,
													}}
												>
													{user.username}
												</Typography>
											</CardContent>
											<CardActions>
												<Button
													variant="contained"
													color="green"
													sx={{
														color: "#fff",
														borderRadius: 25,
														width: "60%",
														margin: "auto",
													}}
													onClick={async () => {
														const response =
															await fetch(api.friendRequestsUrl, {
																method: "POST",
																headers: {
																	Authorization: `Bearer ${localStorage.getItem(
																		"loginToken"
																	)}`,
																	"Content-Type":
																		"application/json",
																},
																body: JSON.stringify(
																	{
																		receiverEmail:
																			user.email,
																	}
																),
															});
														alert(
															"Friend request sent!"
														);
													}}
												>
													Add To Friends
												</Button>
											</CardActions>
										</Card>
									);
								})
							)}
						</Box>
					</Grid>
				</Grid>
			</Container>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					sx={{
						borderRadius: 15,
						width: "50%",
						height: "60%",
						background: "#76599B",
						margin: "auto",
						mt: "10%",
						p: 3,
					}}
				>
					{pendingRequests == null ? (
						<Typography variant="h5" sx={{ color: "#fff" }}>
							Empty requests, No one wants to be friend with
							you...
						</Typography>
					) : (
					pendingRequests.map((user) => {
						return (
						<List
							sx={{
								width: "100%",
							}}
						>
							<ListItem key={user.email}>
								<ListItemText
									primary={
										<Typography
											sx={{
												color: "#fff",
												fontWeight: "bold",
												fontSize: 19,
											}}
										>
										{user.username}
										</Typography>
									}
									secondary={
										<div>
											<Button
												sx={{
													bgcolor: "#06BB39",
													borderRadius: 15,
													width: "7rem",
													height: "1.5rem",
													mt: 1,
													color: "#fff",
												}}
												variant="contained"
												onClick={async () => {
													const response = await fetch(api.friendRequestsUrl, {
														method: 'PATCH',
														headers: {
															'Authorization': `Bearer ${localStorage.getItem('loginToken')}`,
															'Content-Type': 'application/json'
														},
														body: JSON.stringify({
															friendRequestId: user.friendRequestId,
															choice: 'ACCEPT'
														})
													})
													const data = await response.json();
													if (data.result === 'SUCCESS') {
														alert('Successfully accepted request');
													}
												}}
											>
												Accept
											</Button>
											<Button
												sx={{
													bgcolor: "#D10000",
													borderRadius: 15,
													width: "7rem",
													height: "1.5rem",
													mt: 1,
													color: "#fff",
													ml: 3,
												}}
												variant="contained"
												onClick={async () => {
													const response = await fetch(api.friendRequestsUrl, {
														method: 'PATCH',
														headers: {
															'Authorization': `Bearer ${localStorage.getItem('loginToken')}`,
															'Content-Type': 'application/json'
														},
														body: JSON.stringify({
															friendRequestId: user.friendRequestId,
															choice: 'REJECT'
														})
													})
													const data = await response.json();
													if (data.result === 'SUCCESS') {
														alert('Successfully reject request');
													}
												}}
											>
												Remove
											</Button>
										</div>
									}
								/>
							</ListItem>
							<Divider
								variant="middle"
								component="li"
								sx={{ bgcolor: "#DBDBDB" }}
							/>
						</List>

						)	
					})
					)}
				</Box>
			</Modal>
		</ThemeProvider>
	);
};

export default AddFriends;
