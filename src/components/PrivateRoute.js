import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../App';

const PrivateRoute = ({ children, ...rest }) => {
	const auth = useContext(AuthContext);


	return (
		<Route
			{...rest}
			render={() => {
				return auth.isAuthenticated === true ? (
					children
				) : (
					<Redirect to="/signin" />
				);
			}}
		/>
	);
};

export default PrivateRoute;
