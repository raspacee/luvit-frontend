import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { Container, Grid, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../static/logo.png"
import './styles/Navigation.css';
import { AuthContext } from '../App';

const Navigation = () => {
	const auth = useContext(AuthContext);
	const history = useHistory();

	return (
		<Grid container>
			<Grid item xs={6}>
				<img src={logo} className="navbar-logo" />
			</Grid>
			<Grid item xs={6}>
				<Stack direction="row" justifyContent="space-around">
					<Link to="/home" className="navbar-link">
						HOME
					</Link>
					<Link to="/settings" className="navbar-link">
						SETTINGS
					</Link>
					<Link to="/add_friends" className="navbar-link">
						ADD FRIENDS
					</Link>
					<Link to='/signin' onClick={() => {
						auth.logout() 
						localStorage.removeItem('loginToken');
						localStorage.removeItem('userInfo');
						localStorage.removeItem('sessionId');
						history.push('/signin');
					}} className="navbar-link">
						LOGOUT
					</Link>
				</Stack>
			</Grid>
		</Grid>
	);
};

export default Navigation;
