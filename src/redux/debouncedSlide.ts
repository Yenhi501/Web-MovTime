import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DebouncedState {
    value: string;
}
const initialState: DebouncedState={
    value:'',
};

const debouncedSlice = createSlice({
    name:'debounced',
    initialState,
    reducers:{
        setDebouncedValue:(state, action:PayloadAction<string>)=>{
            state.value = action.payload;
        },
    },

});
export const { setDebouncedValue } = debouncedSlice.actions;
export default debouncedSlice.reducer;
