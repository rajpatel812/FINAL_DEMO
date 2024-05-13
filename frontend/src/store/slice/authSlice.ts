const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");
import { deleteCookie, setCookie } from "cookies-next";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const userRegister = createAsyncThunk(
  "userRegister",
  async (val: object) => {
    try {
      const createUser = await axios.post(`${BASE_URL}/user/register`, val);
      // console.log(createUser.data);
      // ToastSuccess(createUser.data.message)
      return createUser.data.message;
    } catch (error: any) {
      // console.log(error.response.data?.email[0]);
      // ToastError(error.response.data.message)
      throw error.response.data?.email[0];
    }
  }
);

export const userLogin = createAsyncThunk("userLogin", async (val: object) => {
  try {
    const existingUser = await axios.post(`${BASE_URL}/user/login`, val);
    // console.log(existingUser);
    const data = existingUser?.data;
    localStorage.setItem("token", data.tokens.access);
    // ToastSuccess(data.message)
    return data;
  } catch (error: any) {
    // console.log("................................");
    // console.log(error.response?.data.errors);

    // ToastError(error.response.data.message)
    throw error.response?.data.errors;
  }
});

export const userLogout = createAsyncThunk("userLogout", async () => {
  try {
    // console.log("sdsd");
    deleteCookie("token");
    window.location.reload();
    return ;
  } catch (error: any) {
    throw error.response?.data.errors;
  }
});

export const getUserProfile = createAsyncThunk(
  "getUser",
  async (userToken: string) => {
    try {
      // console.log("dsdsd");
      const existingUser = await axios.get(`${BASE_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      // localStorage.setItem('userData', JSON.stringify(existingUser.data.data))
      const data = await existingUser.data;
      return data;
    } catch (error: any) {
      // ToastError(error.response.data.message)
      throw error?.response?.data;
    }
  }
);

interface UserUpdateData {
  userToken: string;
  updatedata: object;
}

export const updateUserProfile = createAsyncThunk(
  "updateUserProfile",
  async ({ userToken, updatedata }: UserUpdateData) => {
    // console.log(userToken, "userToken")
    // console.log(updatedata, "updatedata")
    try {
      const existingUser = await axios.patch(
        `${BASE_URL}/user/profile`,
        updatedata,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = await existingUser.data;
      // console.log("...........", data);

      // ToastSuccess(data.message)
      return data;
    } catch (error: any) {
      // ToastError(error.response.data.message)
      throw error?.response?.data;
    }
  }
);

const initialState = {
  token: [],
  user: [],
  error: null,
  userProfile: {},
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state: any, action: any) => {
      state.token = null;
      state.user = null;
      deleteCookie("token");
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(userRegister.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(userRegister.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
      })
      .addCase(userRegister.rejected, (state: any, action: any) => {
        state.status = "failed";
        // console.log(action);
        state.error = action.error.message;
      })
      .addCase(userLogin.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(userLogin.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
        // console.log(action.payload.message)
        state.token = action.payload.tokens?.access;
        setCookie("token", action.payload.tokens?.access);
      })
      .addCase(userLogin.rejected, (state: any, action: any) => {
        state.status = "failed";
        // console.log(action.error.errors);
        state.error = action.error;
      })
      .addCase(getUserProfile.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(getUserProfile.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
        // console.log(action.payload);
        state.userProfile = { ...action.payload };
        // console.log(state.userProfile);
      })
      .addCase(getUserProfile.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateUserProfile.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(updateUserProfile.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
        // console.log(action.payload);
        state.userProfile = { ...action.payload };
        // state.user = action.payload.data
      })
      .addCase(updateUserProfile.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.error.message;
        // console.log("rejected", state);
      })
      .addCase(userLogout.fulfilled, (state: any, action: any) => {
        // console.log("DDSS");
        return {};
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
