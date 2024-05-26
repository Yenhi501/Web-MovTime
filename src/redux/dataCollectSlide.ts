import { createSlice } from '@reduxjs/toolkit';

const dataCollectSlice = createSlice({
  name: 'dataCollect',
  initialState: {
    dataCollect: [], 
    addedToCollection: false,
  },
  reducers: {
    setDataCollect: (state, action) => {
      state.dataCollect = action.payload;
    },
    setAddedToCollection: (state, action) => {
      state.addedToCollection = action.payload;
    },
   
  },
});

export const { setDataCollect,setAddedToCollection } = dataCollectSlice.actions;

export default dataCollectSlice.reducer;