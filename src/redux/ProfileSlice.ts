import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:3000"; // move this to config/env ideally

// Fetch profile
export const fetchProfile = createAsyncThunk("profile/fetch", async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${API}/api/profile/me`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.data; // backend returns full profile
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

// Update profile
export const updateProfile = createAsyncThunk("profile/update", async (formData: any, thunkAPI) => {
  try {
    const res = await axios.post(`${API}/api/profile/editprofile`, formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.data.profile; // backend sends { message, profile }
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

interface ProfileState {
  username: string;
  name: string;
  website: string;
  bio: string;
  gender: string;
  profileimage: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProfileState = {
  username: "",
  name: "",
  website: "",
  bio: "",
  gender: "",
  profileimage: "/profile_image.svg",
  status: "idle",
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchProfile
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        const { username, name, website, bio, gender, profileimage } = action.payload;
        state.username = username || "";
        state.name = name || "";
        state.website = website || "";
        state.bio = bio || "";
        state.gender = gender || "";
        state.profileimage = profileimage || "/profile_image.svg";
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      // updateProfile
      .addCase(updateProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        const { username, name, website, bio, gender, profileimage } = action.payload;
        state.username = username || "";
        state.name = name || "";
        state.website = website || "";
        state.bio = bio || "";
        state.gender = gender || "";
        state.profileimage = profileimage || "/profile_image.svg";
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default profileSlice.reducer;

