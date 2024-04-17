import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Login.css";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const navigate=useHistory()
  // TODO: CRIO_TASK_MODULE_LOGIN - Fetch the API response
  /**
   *
   * Example for successful response from backend:
   * HTTP 201
   * {
   *      "success": true,
   *      "token": "testtoken",
   *      "username": "criodo",
   *      "balance": 5000
   * }
   *
   * Example for failed response from backend:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Password is incorrect"
   * }
   *
   */
  const login = async (formData) => {
    const url = config.endpoint;
    
    //setLoading(true)
    if(!validateInput({username,password})){
      return;
    }
      try{
        const response = await axios.post(`${url}/auth/login`,{
          username,
          password,
        })
        //console.log('kya beta')
        enqueueSnackbar("Logged in successfully",{variant:"success"})
         console.log(response.data)
        //localStorage.setItem('token',response.data.token)
        persistLogin(response.data.token,response.data.username,response.data.balance);
        navigate.push('/')
         
      //setSuccess(true)
      //setLoading(false)
      }
      catch(err){
        if(err.response){
          enqueueSnackbar(err.response.data.message, {variant:"error"})
          //setLoading(false)
        }
        else{
          enqueueSnackbar("Something went wrong. Check that the backend is running and retuns valid JSON.",{variant:"error"})
          //setLoading(false)
        }
      }  
    
    
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Validate the input
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false and show warning message if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that password field is not an empty value - "Password is a required field"
   */
  const validateInput = (data) => {
    
    if(data.password === ""){
      enqueueSnackbar("Password is required field.",{variant:"error"})
      return false;
    }
    if(data.username === ""){
      enqueueSnackbar("Username is required field.",{variant:"error"})
      return false;
    }
    return true;
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Persist user's login information
  /**
   * Store the login information so that it can be used to identify the user in subsequent API calls
   *
   * @param {string} token
   *    API token used for authentication of requests after logging in
   * @param {string} username
   *    Username of the logged in user
   * @param {string} balance
   *    Wallet balance amount of the logged in user
   *
   * Make use of localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
   * -    `token` field in localStorage can be used to store the Oauth token
   * -    `username` field in localStorage can be used to store the username that the user is logged in as
   * -    `balance` field in localStorage can be used to store the balance amount in the user's wallet
   */
  const persistLogin = (token, username, balance) => {

    localStorage.setItem("token",token);
    localStorage.setItem('username',username);
    localStorage.setItem('balance',balance);
    navigate.push("/")
  };
  

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
        <h2 style = {{color : "#00a278"} }>Login</h2>
        <TextField
            value={username}
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            onChange={(e)=>setUsername(e.target.value)}
          />
          <TextField
            value={password}
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
           // helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            onChange={(e)=>setPassword(e.target.value)}
          />
          <Button className="button" variant="contained" onClick={login}>
          LOGIN TO QKART
           </Button>
           <p className="secondary-action">
            Don't have an account?{""}
            
            <Link to='/'>
            Register Now
            </Link>
           
          </p> 
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login;
