
import type { ChangeEvent, FormEvent, MouseEvent } from 'react';
import { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  Divider
  // Button,
} from '@mui/material';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
// import { Link, useNavigate } from 'react-router-dom';
// import BlobsBackground from '../../design/BlobsBackground';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router';
// import dayjs from 'dayjs';


interface FormData {

  email: string;
  password: string;
  confirmpassword: string;
 
}

interface FormErrors {


  email?: string;
  password?: string;
  confirmpassword?: string;

}

export default function Home() {
  const navigate = useNavigate()
  const [showSignup, setShowSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [, setLoading] = useState(false);

  const [form, setForm] = useState<FormData>({
    email: '',
    password: '',
    confirmpassword: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    
    if (!form.email) errors.email = 'Email is required';
    else if (!emailRegex.test(form.email)) errors.email = 'Invalid email format';
    if (!form.password) errors.password = 'Password is required';
    else if (form.password.length < 6) errors.password = 'Password must be at least 6 characters';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);


  const submitRegister = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    const formData = new FormData();
    formData.append("email", form.email);
    formData.append("password", form.password);
  
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  
      toast.success(res.data.message);
      setTimeout(() => navigate("profile"), 1000);
    } catch (error: any) {
      console.error("Error:", error.response || error.message);
      const { response } = error;
      if (response?.status === 409 && response.data?.redirectToLogin) {
        toast.warning(response.data.message);
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(response?.data?.message || "Registration failed");
      }
    } finally {
      setLoading(false); // stop loading
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative px-4">
      <img src="/animated-background.svg" alt="" className="fixed -z-40 w-full" />

      {/* Page Content Box */}
      <div className="z-10 text-center gap-14 flex flex-col bg-white bg-opacity-25 rounded-3xl 
        shadow-[0px_1px_12px_11px_rgba(0,0,0,0.25)] px-10 py-24 ">

        {/* Conditionally Render Content */}
        {!showSignup ? (
          // Welcome Card
          <div className="flex gap-2 flex-col justify-center text-center">
            <h1 className="text-3xl md:text-5xl font7 font-bold text-white ">🙏🏻Welcome</h1>
            <span className="text-xl md:text-lg font7 text-white">to </span>
            <span className="text-3xl md:text-5xl font7 font-bold text-white" >ArchVid</span>
            <Divider />
            <button
              onClick={() => setShowSignup(true)}
              className="bg-[#2563eb] bg-opacity-30 text-2xl font-semibold font7 py-3 w-2/3 ml-12  text-white rounded-xl 
              shadow-[inset_0px_1px_12px_11px_rgba(0,0,0,0.25)]"
            >
              Get Started
            </button>

          
           
          </div>
        ) : (
          // Signup Card
// inside Signup Card
<form onSubmit={submitRegister} className="flex flex-col gap-4">
  <h1 className="text-3xl md:text-5xl font7 font-bold text-white mb-4">📝 Signup</h1>

  {/* Email */}
  <TextField
    required
    name="email"
    label="Email or Phone no."
    variant="filled"
    value={form.email}
    onChange={handleChange}
    error={!!formErrors.email}
    helperText={formErrors.email}
    className="hover:shadow-none"
  />

  {/* Password */}
  <FormControl fullWidth variant="outlined">
    <InputLabel htmlFor="password">Password</InputLabel>
    <OutlinedInput
      id="password"
      type={showPassword ? 'text' : 'password'}
      name="password"
      value={form.password}
      onChange={handleChange}
      error={!!formErrors.password}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            onMouseUp={handleMouseUpPassword}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }
      label="Password"
    />
    {formErrors.password && (
      <p className="text-red-600 text-sm mt-1">{formErrors.password}</p>
    )}
  </FormControl>

  {/* Confirm Password */}
  <TextField
    required
    name="confirmpassword"
    label="Confirm Password"
    type="password"
    variant="filled"
    value={form.confirmpassword}
    onChange={handleChange}
    error={!!formErrors.confirmpassword}
    helperText={formErrors.confirmpassword}
  />

  {/* Submit Button */}
  <button
    type="submit"
    className="bg-[#2563eb] bg-opacity-30 text-2xl font-semibold font7 py-3 w-full text-white rounded-xl 
      shadow-[inset_0px_1px_12px_11px_rgba(0,0,0,0.25)]"
  >
    Register
  </button>

  <span className="text-white font7 text-left font-thin text-xs">
    Already have account?{" "}
    <Link to="/login" className="text-blue-500">
      Login here
    </Link>
  </span>

  <button
    type="button"
    onClick={() => setShowSignup(false)}
    className="mt-2 text-white text-right"
  >
    ⬅ Back
  </button>
</form>

        )}
      </div>
    </div>
    
  );
}

