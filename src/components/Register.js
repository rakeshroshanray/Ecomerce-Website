import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import { useHistory } from "react-router-dom";
import "./Register.css";
import LoadingComponent from "./Loading/Loading";
import {Link} from "react-router-dom"

const Register = () => {
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')
  const [success,setSuccess]=useState(false)
  const { enqueueSnackbar } = useSnackbar();
  const navigate=useHistory()
  const [loading,setLoading] = useState(false);

  // const toast=useToast()


  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const register = async (formData) => {
    const url = config.endpoint;
    //console.log(url)
    // Event.preventDefault()
    //console.log("hi")
    if(!validateInput({username,password,confirmPassword})){
      return;
    }
    setLoading(true)
    try{
      const response=await axios.post(`${url}/auth/register`,{
        username,
        password,
        
      })
    setSuccess(true)
    setLoading(false)
    //console.log(response)
    if(response.status === 201 && response.data.success){
      setUsername("")
      setPassword("")
      setConfirmPassword("")
      enqueueSnackbar("Registered Successfully",{variant:"success"})
      setLoading(false)
      navigate.push("/login")

    }
    else{
      enqueueSnackbar("Something went wrong. Please try again.",{variant:"error"})
      setLoading(false)
    }
    
  }
  catch(err){
    if(err.response){
      enqueueSnackbar(err.response.data.message,{variant:"error"})
      setLoading(false)
    }
    else{
      enqueueSnackbar("Something went wrong. Check that the backend is running and retuns valid JSON.",{variant:"error"})
      setLoading(false)
    }
  }  
  };




  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    if(data.username === ""){
      enqueueSnackbar("Username is required field.",{variant:"error"})
      return false;
    }
    if(data.password === ""){
      enqueueSnackbar("Password is required field.",{variant:"error"})
      return false;
    }
    if(data.username.length < 6){
      enqueueSnackbar("Username must be atleast 6 characters.",{variant:"error"})
      return false;
    }
    if(data.password.length < 6){
      enqueueSnackbar("Password must be atleast 6 characters.",{variant:"error"})
      return false;
    }
    if(data.password !== data.confirmPassword){
      enqueueSnackbar("Passwords do not match",{variant:"error"})
      return false;
    }
    return true;
  };

  return (
    <>
    {
      loading ? <LoadingComponent/>:
      <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
    
      
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
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
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            onChange={(e)=>setPassword(e.target.value)}
          />
          <TextField
            value={confirmPassword}
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            onChange={(e)=>setConfirmPassword(e.target.value)}

          />
           <Button className="button" variant="contained" onClick={register}>
            Register Now
           </Button>
          
          <p className="secondary-action">
            Already have an account?{" "}
            
            <Link to='/login'>
            Login here
            </Link>
              
           
          </p>  

        </Stack>
      </Box>
      <Footer />
    </Box>
   
    }
   
   </>
    
  );
};

export default Register;
