import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { activateAPI, loginAPI, registerAPI } from "../../services/authServices";

export const registerSlice = createAsyncThunk(
  "auth/register", async (payload, { rejectWithValue }) => {
    try {
      const data = await registerAPI(payload)
      return data;
    } catch (error) {
      // console.dir(error);
      // const backendMessage =
      //   error.response?.data?.error ||
      //   error.response?.data?.message ||
      //   error.response?.data?.Error ||
      //   error.message; 
      return rejectWithValue(error.response?.data?.message || "Registration failed")
      // return rejectWithValue(backendMessage || "Registration failed")
    }
  }
)
export const loginSlice = createAsyncThunk(
  "auth/login", async (payload, { rejectWithValue }) => {
    try {
      const data = await loginAPI(payload)
      return data;
    } catch (error) {
      // const backendMessage =
      //   error.response?.data?.error ||
      //   error.response?.data?.message ||
      //   error.response?.data?.Error ||
      //   error.message;
      return rejectWithValue(error.response?.data?.message || "Login failed, Try again!")
    }
  }
)
export const activateSlice = createAsyncThunk(
  "auth/activate", async (payload, { rejectWithValue }) => {
    try {
      const data = await activateAPI(payload)
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Activation OTP failed")
    }
  }
)

const initialState = {
  token: null,
  isAuthenticated: false,
  currentUser: null,
  registeredEmail: null,
  isActivationSuccess: false,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthForce: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.currentUser = null;
      state.error = null;
    },
    setRegisteredEmail: (state, action) => {
      state.registeredEmail = action.payload;
    },
    resetActivation: (state) => {
      state.isActivationSuccess = false;
      state.registeredEmail = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // for register
      .addCase(registerSlice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.registeredEmail = action.meta.arg.email;
        // state.registeredEmail = action.payload.email;
      })
      .addCase(registerSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // for login
      .addCase(loginSlice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(loginSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      // for activate otp
      .addCase(activateSlice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(activateSlice.fulfilled, (state) => {
        state.isLoading = false;
        state.isActivationSuccess = true;
      })
      .addCase(activateSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

  }
});

export const { clearAuthForce, setRegisteredEmail, resetActivation } = authSlice.actions
export default authSlice.reducer;
