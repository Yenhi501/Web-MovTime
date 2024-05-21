import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const VIPPaymentSlice = createSlice({
    name: 'VIPPayment',
    initialState: {
        subscriptionTypeId: 0,
        durationId: 0,
        namePackage: '',
        durationValue: 0,
        totalPrice: 0,
        methodPayment: 0,
    },
    reducers: {
        setIdSelectedInfoPackage: (state, action: PayloadAction<number>) => {
            state.subscriptionTypeId = action.payload;
        },
        setIdSelectedInfoDuration: (state, action: PayloadAction<number>) => {
            state.durationId = action.payload;
        },
        setNamePackage: (state, action: PayloadAction<string>) => {
            state.namePackage = action.payload;
        },
        setDurationValue: (state, action: PayloadAction<number>) => {
            state.durationValue = action.payload;
        },
        setTotalPrice: (state, action: PayloadAction<number>) => {
            state.totalPrice = action.payload;
        },
        setMethodPayment: (state, action: PayloadAction<number>) => {
            state.methodPayment = action.payload;
        },
    },
});

export const {
    setIdSelectedInfoPackage,
    setIdSelectedInfoDuration,
    setNamePackage,
    setDurationValue,
    setTotalPrice,
    setMethodPayment,
} = VIPPaymentSlice.actions;

export default VIPPaymentSlice.reducer;
