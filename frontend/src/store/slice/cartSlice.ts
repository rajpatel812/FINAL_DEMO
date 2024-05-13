const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchCartItems = createAsyncThunk(
  "fetchCartItems",
  async (token: string) => {
    // console.log("token>>>>>",token)
    try {
      const response = await axios.get(`${BASE_URL}/cart/list/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("cart items >>>>>>>", response.data);
      return response.data;
    } catch (error: any) {
      throw error?.response?.data;
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "removeCartItem",
  async ({ itemId, token }: { itemId: number; token: string }) => {
    console.log(itemId, token);
    try {
      await axios.delete(`${BASE_URL}/cart/remove/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return itemId; // Return the ID of the removed item
    } catch (error: any) {
      throw error.response.data;
    }
  }
);


const initialState = {
  cartItems: [],
  status: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchCartItems.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(fetchCartItems.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
        state.cartItems = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.error.message ?? "Error fetching cart items";
      })
      .addCase(removeCartItem.pending, (state:any) => {
        state.status = "loading";
      })
      .addCase(removeCartItem.fulfilled, (state:any, action:any) => {
        state.status = "succeeded";
        // Remove the item from the cartItems array using filter
        state.cartItems = state.cartItems.filter(
          (item:any) => item.id !== action.payload
        );
      })
      .addCase(removeCartItem.rejected, (state:any, action:any) => {
        state.status = "failed";
        state.error = action.error.message ?? "Error removing item from cart";
      });
  },
});

export default cartSlice.reducer;
