import { Box } from "@mui/material";
import "./styles/FormLayout.css";

const FormLayout = ({ children }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      className="form-container"
    >
    {children}
    </Box>
  );
};

export default FormLayout;
