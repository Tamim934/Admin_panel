import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton} from "@mui/material";
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { saveToken } from '../../utilities/Token';

const Login = () => {

  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  async function Login() {
    const newObj = {
      email: email,
      password: password,
    };
    try {
      const { data } = await axios.post("http://localhost:3000/api/login", newObj);
      saveToken(data.accessToken);

      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  

  const images = [
    "/src/assets/login image.png",
    "/src/assets/pexels-eberhard-grossgasteiger-1624496 (1).jpg",
    "/src/assets/robert-bagramov-DG5dNWf2v_M-unsplash (1).jpg",
    "/src/assets/toma-georgian-mihai-e54Xpr--gB8-unsplash (1).jpg",

];
const [imgSrc, setImgSrc] = useState('');

useEffect(() => {
  const index = Math.floor(Math.random() * images.length);
  setImgSrc(images[index]);
}, []);


  return (
    <>

<div className='flex dark:text-white'>

<div className='max:hidden'>
            <img className='h-[100%]' src={imgSrc} alt="" />
        </div>

<div>


</div>


<div className=' max:flex-wrap m-auto max:m-auto '>
<h1 className='text-[27px] font-bold'>Login</h1>
<h1 className=' underline text-[18px] mt-[10px]' >Forgot your password</h1>

<div className='flex flex-col gap-[20px] mt-[30px]'>
  
        <TextField value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email or phone number" id="outlined-basic" label="Email or phone number" variant="outlined" size='medium' sx={{width: "480px", height: "56px"}} />
        <FormControl size='medium' sx={{ width: "480px", height: "56px", }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput 
            value={password} onChange={(event) => setPassword(event.target.value)}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
   </div>
      <div className='mt-[20px]'>
        <button onClick={() => Login()} className='w-[143px] h-[56px] rounded-[4px] bg-[#282727] text-[#FAFAFA] text-[16px] font-medium leading-[24px]'>Log In</button>
   </div>
   <div className='flex mt-[20px] gap-[20px]'>
   <input type="checkbox" className='w-[20px]' />
   <h1 className=' font-medium'>Keep me logged in - applies to all log in options below.<br></br> More info</h1>
   </div>
   <img className='mt-[20px]' src="/src/assets/style_layer.png" alt="" />

   <div className='flex gap-[30px] max:flex-wrap mt-[30px]'>
    <img src="/src/assets/google.png" alt="" />
    <img src="/src/assets/apple.png" alt="" />
    <img src="/src/assets/facebook.png" alt="" />
   </div>
   <h1 className=' font-medium text-[17px] mt-[30px]'>By clicking 'Log In' you agree to our website KicksClub Terms<br></br> & Conditions, Kicks Privacy Notice and Terms & Conditions.</h1>
    </div>
</div>













    {/* <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    <div className='m-auto flex flex-col gap-[40px] w-[371px]'>
      <div className='flex flex-col gap-[24px]'>
        <h1 className='text-black dark:text-white text-[36px] font-medium leading-[30px] tracking-[1.44px]'>Log in to Exclusive</h1>
        <p className='text-black dark:text-white text-[16px] leading-[24px]'>Enter your details below</p>
      </div>
      <div className='flex flex-col gap-[20px]'>
        <TextField value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email or phone number" id="outlined-basic" label="Email or phone number" variant="outlined" size='medium' sx={{width: "371px", height: "56px"}} />
        <FormControl size='medium' sx={{ width: "371px", height: "56px" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            value={password} onChange={(event) => setPassword(event.target.value)}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </div>
      <div className='flex justify-between items-center'>
        <button onClick={() => Login()} className='w-[143px] h-[56px] rounded-[4px] bg-[#DB4444] text-[#FAFAFA] text-[16px] font-medium leading-[24px]'>Log In</button>
        <span className='text-[#DB4444] text-[16px] leading-[24px]'>Forget Password?</span>
      </div>
    </div> */}
    </>
  )
}

export default Login