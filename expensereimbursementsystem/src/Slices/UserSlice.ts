import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IReimbursement } from "../Interfaces/IReimbursement";
import { IUser } from "../Interfaces/IUser";

//Figure out our default state for this slice

interface UserSliceState {
    loading: boolean,
    error: boolean,
    user?: IUser,
    currentProfile?: IUser
    reimbursement?: IReimbursement
}

const initialUserState: UserSliceState = {
    loading: false,
    error: false
}

type Login = {
    userName: string,
    password: string
}

type UserID = {
    userID: any
}

type createReimbursement = {
    reimbursementID: any,
    amount: any,
    submittedDate: any,
    description: any,
    reimbursementAuthor: any,
    reimbursementStatus: any,
    reimbursementType: any
}

export const loginUser = createAsyncThunk(
    'user/login',
    async (credentials:Login, thunkAPI) => {
        try{
            axios.defaults.withCredentials = true;
            const res = await axios.post('http://localhost:8080/user/login', credentials)

            return {
                userID: res.data.userID,
                userName: res.data.userName,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                email: res.data.email,
                role: res.data.role
            } 
        } catch(e){
            return thunkAPI.rejectWithValue('Something went wrong.')
        }
    }
)

export const getUserDetails = createAsyncThunk(
    'employee/get',
    async (id:number | string, thunkAPI) => {
        try{
            axios.defaults.withCredentials = true;
            const res = await axios.get(`http://localhost:8080/employee/view-info/${id}`);

            return{
                userID: res.data.userID,
                userName: res.data.userName,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                email: res.data.email,
                password: res.data.password
            }
        } catch (error) {
            console.log(error);
        }
    } 
)

export const getReimbursementsByID = createAsyncThunk(
    'manager/get',
    async (id:UserID, thunkAPI) => {
        try{
            axios.defaults.withCredentials = true;
            const res = await axios.get(`http://localhost:8080/manager/view-specific-employee-reimbursements/${id}`);

            return{
                reimbursementID: res.data.reimbursementID,
                amount: res.data.amount,
                submittedDate: res.data.submittedDate,
                description: res.data.description,
                reimbursementAuthor: res.data.reimbursementAuthor,
                reimbursementResolver: res.data.reimbursementResolver,
                reimbursementStatus: res.data.reimbursementStatus,
                reimbursementType: res.data.reimbursementType
            }
        } catch (error) {
            console.log(error);
        }
    } 
)

export const createReimbursementUser = createAsyncThunk(
    'employee/create',
    async (createReimbursementInfo:createReimbursement, thunkAPI) => {
        try{
            axios.defaults.withCredentials = true;
            const res = await axios.post('http://localhost:8080/reimbursement/create', createReimbursementInfo)
            return createReimbursementInfo;
        } catch(e){
            return thunkAPI.rejectWithValue('Something went wrong.')
        }
    }
)

export const logout = createAsyncThunk(
    "user/logout",
    async (thunkAPI) => {
        try{
            axios.defaults.withCredentials = true;
            const res = axios.get("http://localhost:8080/user/logout");
        } catch(e){
            console.log(e);
        }
    }
)

//Creating SLice
export const UserSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        toggleError: (state) => {
            state.error = !state.error;
        } 
    },
    extraReducers: (builder) => {
        //This is where reducer logic goes
        builder.addCase(loginUser.pending, (state, action)=> {
            state.loading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action)=> {
            //payload is res.data (return from async thunk above)
            state.user = action.payload;
            state.error = false;
            state.loading = false;
        });
        builder.addCase(loginUser.rejected, (state, action)=> {
            state.error = true;
            state.loading = false;
        })
        builder.addCase(getUserDetails.pending, (state, action)=> {
            state.loading = true;
        });
        builder.addCase(getUserDetails.fulfilled, (state, action)=> {
            state.loading = false;
            state.currentProfile = action.payload;
        });
        builder.addCase(getReimbursementsByID.fulfilled, (state, action)=> {
            state.error = false;
            state.loading = false;
        });
        builder.addCase(createReimbursementUser.fulfilled, (state, action)=> {
            state.error = false;
            state.loading = false;
        });
        builder.addCase(logout.fulfilled, (state, action)=> {
            state.user = undefined;
        });
    }
})

//If there was normal action reducers, they would be handled like this
export const {toggleError} = UserSlice.actions;

export default UserSlice.reducer;