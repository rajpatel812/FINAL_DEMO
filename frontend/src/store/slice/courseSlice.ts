const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");
import { deleteCookie, setCookie } from "cookies-next";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllCourses = createAsyncThunk(
  "getAllCourses",
  async (id?: number) => {
    try {
      let query;
      if (id) {
        console.log("called", id);
        query = axios.get(`${BASE_URL}/courses?category=${id}`);
      } else {
        query = axios.get(`${BASE_URL}/courses`);
      }
      const courses = await query;
      // console.log("sdsdsds", courses.data);
      const data = courses.data;
      // console.log("...........", data);

      return data;
    } catch (error: any) {
      throw error?.response?.data;
    }
  }
);

export const getCourse = createAsyncThunk("getCourse", async (id?: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/courses/${id}`);
    // console.log(response.data);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
});

export const searchCourse = createAsyncThunk(
  "searchCourse",
  async (query?: any) => {
    try {
      const response = await axios.get(`${BASE_URL}/courses`);

      if (query) {
        // console.log("object");
        const regex = new RegExp(query, "i"); // "i" flag for case-insensitive search
        // Filter courses based on the regex pattern
        const filteredCourses = response.data.filter((course: any) =>
          regex.test(course.title)
        );
        return filteredCourses;
      } else {
        return response.data;
      }
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

export const isALlCourses = createAsyncThunk("isALlCourses", async () => {
  try {
    return;
  } catch (error: any) {
    throw error?.response?.data;
  }
});

const initialState = {
  courses: [],
  isAllCourses: false,
};

const courseSlice = createSlice({
  name: "course",

  initialState,
  extraReducers: (builder: any) => {
    builder
      .addCase(getAllCourses.fulfilled, (state: any, action: any) => {
        state.courses = action.payload;
      })
      .addCase(isALlCourses.fulfilled, (state: any, action: any) => {
        state.isAllCourses = !state.isAllCourses;
      })
      .addCase(searchCourse.fulfilled, (state: any, action: any) => {
        state.courses = action.payload;
      });
  },
});

export const { logout } = courseSlice.actions;
export default courseSlice.reducer;
