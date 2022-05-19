import { configureStore } from "@reduxjs/toolkit";

//Import reducers from created slices
import userReducer from "./Slices/UserSlice"

export const store = configureStore({
    reducer: {
        //Different reducers for modyfing state
        user: userReducer
    }
});

//export these two things 
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

