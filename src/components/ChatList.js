import { useState, useEffect } from "react";

import {
	Grid,
	Box,
	Stack,
	Avatar,
	Typography,
	Badge,
	Divider,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from "@mui/material";

const ChatList = ({ friends, handleTabChange }) => {
	if (friends == null) {
		return <Typography variant="h3" sx={{ color: '#fff' }}>You are lonely, no friends found</Typography>
	}

	const friendsRendered = friends.map((friend) => {
		return (
			<>
				<ListItem key={friend.username} onClick={() => handleTabChange(friend._id)}>
					<ListItemAvatar sx={{ mr: 3 }}>
						<Badge
							color="primary"
							badgeContent=" "
							overlap="circular"
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "right",
							}}
						>
							<Avatar
								sx={{
									bgcolor: "orange",
									height: 60,
									width: 60,
								}}
							>
								TC
							</Avatar>
						</Badge>
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
							<Typography
								sx={{
									color: "#DBDBDB",
									fontWeight: "light",
									fontSize: 18,
								}}
							>
								Listen to this!
							</Typography>
						}
					/>
					<Typography sx={{ color: "#fff", fontWeight: "medium" }}>
						9:00 PM
					</Typography>
				</ListItem>
				<Divider
					variant="inset"
					component="li"
					sx={{ bgcolor: "#DBDBDB" }}
				/>
			</>
		);
	});
	return (
		<Box sx={{ bgcolor: "#76599B", borderRadius: 7, p: 3 }}>
			<List
				sx={{
					width: "100%",
				}}
			>
				{friendsRendered}
			</List>
		</Box>
	);
};

export default ChatList;
