import { Link } from "@mui/material";

const FormLink = (props) => {
	return (
		<Link
			href={props.href}
			underline="hover"
			sx={{
				fontFamily: "Roboto",
				fontWeight: "medium",
				color: "#FFC062",
				letterSpacing: 2,
			}}
		>
			{props.label}
		</Link>
	);
};

export default FormLink;
