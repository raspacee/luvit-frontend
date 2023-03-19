import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Box,
  Stack,
  Divider,
  Typography,
  FormControlLabel,
  Checkbox,
  Link,
} from "@mui/material";
import FormLayout from "../UI/FormLayout";
import FormTextField from "../UI/FormTextField";
import FormButton from "../UI/FormButton";
import FormLink from "../UI/FormLink";
import "./styles/Register.css";
import signin_jpg from "../static/signin.jpg";
import { AuthContext } from "../App";
import { api } from '../api';

const SignIn = () => {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const signinHandler = async () => {
    // sign in
    if (email !== "" && password !== "") {
      const bodyData = {email: email, password: password};
      const response = await fetch(api.signinUrl, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyData)
      })
      const data = await response.json(); 
      if (data.loginToken) {
        localStorage.setItem('loginToken', data.loginToken); 
        localStorage.setItem('userInfo', JSON.stringify(data.user));
        auth.signin();
        history.push("/home");
      } else {
        alert(data.error)
      }
    }
  };

  return (
    <FormLayout>
      <Box sx={{ minHeight: "100%", minWidth: "70%" }}>
        <Grid container spacing={0}>
          <Grid className="form-picture" item sm={5} sx={{ height: 600 }}>
            <img
              className="form-picture-jpg"
              src={signin_jpg}
              alt="Synthwave picture"
            />
          </Grid>
          <Grid className="form-form" item sm={7} sx={{ pt: 7 }}>
            <Stack spacing={3.5} maxWidth="80%" margin="auto">
              <Typography
                variant="h4"
                component="h3"
                fontWeight="500"
                margin="auto"
              >
                SIGN IN
              </Typography>
              <FormTextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Divider />
              <FormTextField
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormButton
                label="SIGN IN"
                bgcolor="#06BB39"
                onClick={() => signinHandler()}
              />
              <Box display="flex" justifyContent="flex-end">
                <FormControlLabel
                  sx={{ fontWeight: "medium" }}
                  control={<Checkbox defaultChecked />}
                  label="Remember Me"
                />
              </Box>
              <Box display="flex" justifyContent="space-between">
                <FormLink href="register" label="REGISTER INSTEAD" />
                <Link href="#" sx={{ color: "#fff" }} underline="always">
                  Forgot Password?
                </Link>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </FormLayout>
  );
};

export default SignIn;
