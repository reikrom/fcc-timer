import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sessionLength: 0.1,
    breakLength: 5,
    isPaused: true,
    isRunning: false,
};

export const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        incrementSession: (state) => {
            if (state.sessionLength < 60) {
                state.sessionLength += 1;
            }
        },
        decrementSession: (state) => {
            if (state.sessionLength > 1) {
                state.sessionLength -= 1;
            }
        },
        incrementBreak: (state) => {
            if (state.breakLength < 60) {
                state.breakLength += 1;
            }
        },
        decrementBreak: (state) => {
            if (state.breakLength > 1) {
                state.breakLength -= 1;
            }
        },
        resetSettings: (state) => {
            state.sessionLength = 25;
            state.breakLength = 5;
        },
        startTimer: (state) => {
            state.isRunning = true;
            state.isPaused = false;
        },
        stopTimer: (state) => {
            state.isRunning = false;
            state.isPaused = true;
        },
        playPauseTimer: (state) => {
            state.isPaused = !state.isPaused;
        },
    },
});

export const {
    incrementSession,
    decrementSession,
    incrementBreak,
    decrementBreak,
    resetSettings,
    startTimer,
    stopTimer,
    playPauseTimer,
} = timerSlice.actions;

export default timerSlice.reducer;
