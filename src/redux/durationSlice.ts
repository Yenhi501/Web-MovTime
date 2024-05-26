import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DurationVIP } from "../model/duration-VIP";


const initialState: DurationVIP[]=[{durationId: 0, time: 0, price: 0}];

const DurationSlice = createSlice({
    name:'durationData',
    initialState: initialState,
    reducers:{
        setDurationData:(state, action:PayloadAction<DurationVIP[]>)=>{
            state = action.payload;
        },
    },

});
export const { setDurationData } = DurationSlice.actions;
export default DurationSlice.reducer;
