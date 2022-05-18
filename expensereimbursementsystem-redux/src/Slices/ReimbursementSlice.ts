import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IReimbursement } from "../Interfaces/IReimbursement";
import { Reimbursement } from "../Components/Reimbursement/Reimbursement";

interface ReimbursementSliceState {
    loading: boolean,
    error: boolean,
    reimbursements?: IReimbursement,
}

const initialReimbursementState: ReimbursementSliceState = {
    loading: false,
    error: false
}

export const createReimbursement = createAsyncThunk(
    "reimbursement/create",
   async (newReimbursement: IReimbursement, thunkAPI) => {
       try {
           axios.defaults.withCredentials = true;
           const res = await axios.post("http://localhost:8080/reimbursement/create/", newReimbursement);

           return newReimbursement;
       } catch(e) {
           console.log(e);
       }
   }
);

export const getReimbursements = createAsyncThunk(
    "reimbursement/get",
   async (thunkAPI) => {
       try {
           axios.defaults.withCredentials = true;
           const res = await axios.get("http://localhost:8080/employee/view-resolved-reimbursements");

           return res.data;
       } catch(e) {
           console.log(e);
       }
   }
);

// export const ReimbursementSlice = createReimbursement({
//     name: "reimbursements",
//     initialState: initialReimbursementState,
//     reducers: {
//         clearReimbursements: (state) => {
//             state.reimbursements = undefined;
//         }
//     },
//     extraReducers: (builder) => {
//         builder.addCase(getReimbursements.pending, (state, action) => {
//             state.loading = true;
//         });
//         builder.addCase(getReimbursements.fulfilled, (state, action) => {
//             state.reimbursements = action.payload;
//             state.loading = false;
//             state.error = false;
//         });
//         builder.addCase(getReimbursements.rejected, (state, action) => {
//             state.error = true;
//             state.loading = false;
//         });
//         builder.addCase(createReimbursement.fulfilled, (state, action) => {
//             if(state.reimbursement && action.payload) {
//                 state.reimbursement = [action.payload, ...state.reimbursement];
//             }
//         });
//     }
// });

// export const {clearReimbursements} = ReimbursementSlice.actions;
// export default ReimbursementSlice.reducer;