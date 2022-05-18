import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "../Interfaces/IUser";

interface UserSliceState {
    loading: boolean,
    error: boolean,
    user?: IUser,
    currentProfile?: IUser
}

const initialUserState: UserSliceState = {
    loading: false,
    error: false
}

type Login = {
    username: string,
    password: string
}

export const loginUser = createAsyncThunk(
    'user/login',
   async (credentials: Login, thunkAPI) => {
       try {
           const res = await axios.post('http://localhost:8080/user/login', credentials);

           return {
            userID: res.data.userID, 
            userName: res.data.userName,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email
           }
       } catch(e) {
           return thunkAPI.rejectWithValue('Something went wrong');
       }
   }
);

export const getUserDetails = createAsyncThunk(
    'users/get',
   async (id: number | string, thunkAPI) => {
       try {
           const res = await axios.get('http://localhost:8080/user/login/full/${id}');

           return {
            userID: res.data.userID, 
            userName: res.data.userName,
            password: res.data.password,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email,
            role: res.data.role
           }
       } catch(e) {
           console.log(e);
       }
   }
);

export const logout = createAsyncThunk(
    'user/logout',
   async (thunkAPI) => {
       try {
           axios.defaults.withCredentials = true;
           const res = axios.get('http://localhost:8080/user/logout');

       } catch(e) {
           console.log(e);
       }
   }
);

export const UserSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        toggleError: (state) => {
            state.error = !state.error;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state, action) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.user = action.payload;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
        });
        builder.addCase(getUserDetails.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getUserDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.currentProfile = action.payload;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.user = undefined;
        });
    }
});

export const {toggleError} = UserSlice.actions;
export default UserSlice.reducer;   