import { useState } from 'react';
import {
  Grid,
  Box,
  Stack,
  Divider,
  Typography,
} from "@mui/material";
import FormLayout from "../UI/FormLayout";
import FormTextField from "../UI/FormTextField";
import FormButton from '../UI/FormButton';
import FormLink from '../UI/FormLink';
import "./styles/Register.css";
import register_jpg from '../static/register.jpg';
import { api } from '../api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const registerHandler = async () => {
    if (username != '' && email != '' && password != '' && password === confirmPassword) {
      const response = await fetch(api.registerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
      })
      const data = await response.json();
      if (data.result === 'SUCCESS') {
        alert('Account created login now!')
      } else {
        alert('Something went wrong, try again')
      }
    }
  }

  return (
    <FormLayout>
      <Box sx={{ minHeight: "100%", minWidth: "70%" }}>
        <Grid container spacing={0}>
          <Grid className="form-picture" item sm={5} sx={{ height: 600 }} >
          <img className="form-picture-jpg" src={register_jpg} alt="Synthwave picture"/>
          </Grid>
          <Grid className="form-form" item sm={7} sx={{ pt: 7 }}>
            <Stack spacing={2} maxWidth="80%" margin="auto">
              <Typography
                variant="h4"
                component="h3"
                fontWeight="500"
                margin="auto"
              >
                REGISTER
              </Typography>
              <FormTextField value={username} onChange={(e) => setUsername(e.target.value) } label="Username"/>
              <FormTextField value={email} onChange={(e) => setEmail(e.target.value) } label="Email"/>
              <Divider />
              <FormTextField value={password} onChange={(e) => setPassword(e.target.value) } label="Password"/>
              <FormTextField value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value) } label="Confirm Password"/>
              <FormButton label="REGISTER" bgcolor="#06BB39" onClick={registerHandler} />
              <FormLink href="signin" label="SIGN IN INSTEAD"/>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </FormLayout>
  );
};

export default Register;
