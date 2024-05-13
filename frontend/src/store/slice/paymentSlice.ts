const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const initialState = {
  payments: [],
  loading: false,
  error: null,
};

export const fetchCoursePayments = createAsyncThunk(
  "fetchCoursePayment",
  async (token: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/payment`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("course payment >>>>>>>", response.data);
      return response.data;
    } catch (error: any) {
      throw error?.response?.data;
    }
  }
);


const fetchCoursePaymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {},
  extraReducers: (builder:any) => {
    builder
      
      .addCase(fetchCoursePayments.fulfilled, (state:any, action:any) => {
        state.loading = false;
        state.error = null;
        state.payments = action.payload;
        // console.log("Payment received.........", state.payments)
      })
      
  },
});


export const {} = fetchCoursePaymentSlice.actions;
export default fetchCoursePaymentSlice.reducer;