import { createSlice } from '@reduxjs/toolkit';
import { getNow, toMs } from '../../utils/timeHelper';

const initialState = {
    mainSessionLength: 25,
    breakLength: 5,
    isPaused: true,
    isRunning: false,
    sessionType: 'main', // main or break
    sessionFinished: false,

    startTime: null,
    endTime: null,
    timeLeft: null,

    playAudio: false,
};

export const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        incrementSession: (state) => {
            if (state.mainSessionLength < 60) {
                state.mainSessionLength += 1;
            }
        },
        decrementSession: (state) => {
            if (state.mainSessionLength > 1) {
                state.mainSessionLength -= 1;
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
        startTimer: (state) => {
            state.isRunning = true;
            state.isPaused = false;
            state.startTime = getNow();
            state.endTime = getNow() + toMs(state.mainSessionLength);
            state.timeLeft = Math.max(0, state.endTime - getNow());
        },
        sessionFinished: (state) => {
            state.sessionFinished = true;
            state.playAudio = true;
        },
        startBreak: (state) => {
            state.sessionFinished = false;
            state.playAudio = false;
            state.sessionType = 'break';
            state.startTime = getNow();
            state.endTime = getNow() + toMs(state.breakLength);
            state.timeLeft = Math.max(0, state.endTime - getNow());
        },
        startMainSession: (state) => {
            state.sessionType = 'main';
            state.sessionFinished = false;
            state.playAudio = false;
            state.startTime = getNow();
            state.endTime = getNow() + toMs(state.mainSessionLength);
            state.timeLeft = Math.max(0, state.endTime - getNow());
        },
        pauseTimer: (state) => {
            state.isPaused = true;
            state.endTime = getNow() + state.timeLeft;
        },
        resumeTimer: (state) => {
            state.isPaused = false;
            state.endTime = getNow() + state.timeLeft;
        },
        setTimeLeft: (state, action) => {
            const { payload } = action;
            state.timeLeft = payload;
        },
        endSession: (state) => {
            state.sessionFinished = false;
        },
        resetTimer: (state) => {
            state.isRunning = false;
            state.isPaused = true;
            state.sessionFinished = false;
            state.sessionType = 'main';
            state.playAudio = false;
            state.startTime = null;
            state.endTime = null;
            state.timeLeft = null;
            state.mainSessionLength = 25;
            state.breakLength = 5;
        },
    },
});

export const {
    incrementSession,
    decrementSession,
    incrementBreak,
    decrementBreak,
    startTimer,
    sessionFinished,
    startBreak,
    startMainSession,
    pauseTimer,
    resumeTimer,
    setTimeLeft,
    endSession,
    resetTimer,
} = timerSlice.actions;

export default timerSlice.reducer;
