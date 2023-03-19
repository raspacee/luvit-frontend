import { TextField } from '@mui/material'
const FormTextField = (props) => {
	return (
		<TextField
			id="outlined-basic"
			variant="outlined"
			{...props}
			sx={{ bgcolor: "#fff", borderRadius: 25 }}
		/>
	);
};

export default FormTextField;