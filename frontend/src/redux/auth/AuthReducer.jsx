
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLoginStatus, updateUser } from '../../services/Authservice';
import toast from 'react-hot-toast';

const name = JSON.parse(localStorage.getItem("name"));
const initialState = {
  isLoggedIn: false,
  name: name ? name : "",
  user: {
    name: "",
    email: "",
    phone: "",
    bio: "",
    photo: "",
    role :"",
  },
};
//update user details thunk
export const updateUserData = createAsyncThunk(
  "usersDetails/updateUser",
  async (data, thunkAPI) => {
    debugger;
    try {
      const {_id, formData} = data;
      const response = await updateUser(_id,formData);
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.error(message); 
      return thunkAPI.rejectWithValue(message); 
    }
  }
);



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action) {
      localStorage.setItem("name", JSON.stringify(action.payload));
      state.name = action.payload;
    },
    SET_USER(state, action) {
      debugger;
      const profile = action.payload;
      console.log(profile)
      state.user.name = profile.name;
      state.user.email = profile.email;
      state.user.phoneNumber = profile.phoneNumber;
      state.user.bio = profile.bio;
      state.user.photo = profile.photo;
      state.user.role= profile.role;
    },
  },
  extraReducers : (builder)=>{
    builder
    //pending cases
    .addCase(updateUserData.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    })
      //fulfilled cases
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("user updated successfully");
    })
    //rejected cases
    .addCase(updateUserData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
    });
  }
});
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Persist only the 'auth' slice
};
const persistedReducer = persistReducer(persistConfig, authSlice.reducer);
export const { SET_LOGIN, SET_NAME, SET_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;

export default persistedReducer;
