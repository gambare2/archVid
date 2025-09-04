import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import axios from "axios";
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  Divider,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  identifier: string;
  password: string;
  confirmpassword: string;
  email?: string;
  phoneno?: string;
}

interface FormErrors {
  identifier?: string;
  password?: string;
  confirmpassword?: string;
}

export default function Home() {
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [, setLoading] = useState(false);
  const [showCnfPassword, setShowCnfPassword] = useState(false);

  const [form, setForm] = useState<FormData>({
    identifier: "",
    password: "",
    confirmpassword: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!form.identifier) {
      errors.identifier = "Email or Phone is required";
    } else if (form.identifier.includes("@")) {
      if (!emailRegex.test(form.identifier)) {
        errors.identifier = "Invalid email format";
      }
    } else {
      if (!phoneRegex.test(form.identifier)) {
        errors.identifier = "Invalid phone number format";
      }
    }

    if (!form.password) {
      errors.password = "Password is required";
    } else if (form.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!form.confirmpassword) {
      errors.confirmpassword = "Confirm Password is required";
    } else if (form.password !== form.confirmpassword) {
      errors.confirmpassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleShowCnfPassword = () =>
    setShowCnfPassword((show) => !show);

  const submitRegister = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    const formData: Partial<FormData> = {
      password: form.password,
    };
  
    if (form.identifier.includes("@")) {
      formData.email = form.identifier;
    } else {
      formData.phoneno = form.identifier;
    }
  
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3000/auth/register",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
  
      // ✅ Save token to localStorage
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        console.log("✅ Token saved after register:", res.data.token);
      } else {
        console.warn("⚠️ No token returned from backend");
      }
  
      toast.success(res.data.message);
  
      // Navigate directly to edit profile (already authenticated)
      setTimeout(() => navigate("/editProfile"), 1000);
    } catch (error: any) {
      const { response } = error;
      if (response?.status === 409 && response.data?.redirectToLogin) {
        toast.warning(response.data.message);
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(response?.data?.message || "Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-gradient-to-br  to-indigo-900 relative overflow-hidden">
      {/* Animated Background */}
      <motion.img
        src="/animated-background.svg"
        alt="background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="fixed inset-0 w-full h-full object-cover -z-10"
      />


      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white/20 backdrop-blur-lg rounded-3xl shadow-lg px-6 sm:px-10 py-10 sm:py-16 flex flex-col gap-6"
      >
        <AnimatePresence mode="wait">
          {!showSignup ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-6 text-center"
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-white">
                🙏🏻 Welcome
              </h1>
              <span className="text-lg sm:text-xl text-white">
                to <span className="font-bold">ArchVid</span>
              </span>
              <Divider />
              <button
                onClick={() => setShowSignup(true)}
                className="bg-blue-500/60 hover:bg-blue-600/70 transition text-xl sm:text-2xl font-semibold py-3 w-full sm:w-2/3 mx-auto text-white rounded-xl shadow-md"
              >
                Get Started
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="signup"
              onSubmit={submitRegister}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-4"
            >
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                📝 Signup
              </h1>

              <TextField
                required
                name="identifier"
                label="Email or Phone no."
                variant="filled"
                value={form.identifier}
                onChange={handleChange}
                error={!!formErrors.identifier}
                helperText={formErrors.identifier}
                className=" rounded-md"
              />

              {/* Password */}
              <FormControl fullWidth variant="outlined">
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  error={!!formErrors.password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                {formErrors.password && (
                  <p className="text-red-600 text-sm mt-1">
                    {formErrors.password}
                  </p>
                )}
              </FormControl>

              {/* Confirm Password */}
              <FormControl fullWidth variant="outlined">
                <InputLabel>Confirm Password</InputLabel>
                <OutlinedInput
                  type={showCnfPassword ? "text" : "password"}
                  name="confirmpassword"
                  value={form.confirmpassword}
                  onChange={handleChange}
                  error={!!formErrors.confirmpassword}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowCnfPassword} edge="end">
                        {showCnfPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                />
                {formErrors.confirmpassword && (
                  <p className="text-red-600 text-sm mt-1">
                    {formErrors.confirmpassword}
                  </p>
                )}
              </FormControl>

              <button
                type="submit"
                className="bg-blue-500/70 hover:bg-blue-600/80 transition text-xl font-semibold py-3 w-full text-white rounded-xl shadow-md"
              >
                Register
              </button>

              <span className="text-white text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-300 underline">
                  Login here
                </Link>
              </span>

              <button
                type="button"
                onClick={() => setShowSignup(false)}
                className="mt-2 text-white text-right hover:underline"
              >
                ⬅ Back
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
