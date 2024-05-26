import { createSlice } from '@reduxjs/toolkit';

const dataLoveSlice = createSlice({
  name: 'dataLove',
  initialState: {
    dataLove: [], 
  },
  reducers: {
    setDataLove: (state, action) => {
      state.dataLove = action.payload;
    },
  },
});

export const { setDataLove} = dataLoveSlice.actions;

export default dataLoveSlice.reducer;