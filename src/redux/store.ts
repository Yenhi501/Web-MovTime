import { configureStore } from '@reduxjs/toolkit';
import debouncedReducer from './debouncedSlide';
import isLoginSlide from './isLoginSlice';
import videoSlice from './videoSlice';
import dataCollectReducer from './dataCollectSlide';
import dataLoveSlide from './dataLoveSlide';
import VIPPaymentReducer from './VIPPaymentSlice';
import DurationVip from './durationSlice';
import SearchInvoke from './searchSlice';

export const store = configureStore({
    reducer: {
        debounced: debouncedReducer,
        user: isLoginSlide,
        videoWatching: videoSlice,
        dataCollect: dataCollectReducer,
        dataLove: dataLoveSlide,
        VIPPayment: VIPPaymentReducer,
        durationData: DurationVip,
        searchSlice: SearchInvoke,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
