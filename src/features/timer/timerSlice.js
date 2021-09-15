import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sessionLength: 25,
    breakLength: 5,
};

export const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        incrementSession: (state) => {
            state.sessionLength += 1;
        },
        decrementSession: (state) => {
            state.sessionLength -= 1;
        },
        incrementBreak: (state) => {
            state.breakLength += 1;
        },
        decrementBreak: (state) => {
            state.breakLength -= 1;
        },
        resetSettings: (state) => {
            state.sessionLength = 25;
            state.breakLength = 5;
        },
    },
});

export const {
    incrementSession,
    decrementSession,
    incrementBreak,
    decrementBreak,
    resetSettings,
} = timerSlice.actions;

export default timerSlice.reducer;
