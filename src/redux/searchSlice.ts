import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name:'searchSlice',
    initialState: {
        searchInvoke: 0,
        searchInvokeOld: 0,
    },
    reducers:{
        setSearchInvoke: (state) => {
            if (state.searchInvoke === 0) {
                state.searchInvoke = state.searchInvoke + 1
            }
            else {
                state.searchInvoke = state.searchInvoke + 1
                state.searchInvokeOld = state.searchInvokeOld + 1
            }
        },
    },

});
export const { setSearchInvoke } = searchSlice.actions;
export default searchSlice.reducer;
