import { configureStore } from '@reduxjs/toolkit';
import timerSlice from '../features/timer/timerSlice';

export const store = configureStore({
    reducer: {
        timer: timerSlice,
    },
});
