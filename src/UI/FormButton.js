import { Button } from "@mui/material";

const FormButton = (props) => {
	return (
		<Button
			sx={{
				fontWeight: "bold",
				fontSize: 20,
				height: 50,
				borderRadius: 25,
				bgcolor: props.bgcolor,
			}}
			variant="contained"
			onClick={() => props.onClick()}
		>
		{props.label}
		</Button>
	);
};

export default FormButton;
