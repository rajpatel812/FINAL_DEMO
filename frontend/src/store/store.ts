import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import courseSlice from "./slice/courseSlice";
import cartSlice from "./slice/cartSlice";
import paymentSlice from "./slice/paymentSlice";

const store = configureStore({
    reducer: {
        user: authSlice,
        course: courseSlice,
        cart: cartSlice,
        payments: paymentSlice,
    },
})

export default store;