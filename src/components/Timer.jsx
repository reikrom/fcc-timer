import { useEffect, useRef } from 'react';
import Layout from './Layout';
import useInterval from '../hooks/useInterval';
import { formatMs, getNow } from '../utils/timeHelper';
import { useDispatch, useSelector } from 'react-redux';
import {
    startTimer,
    pauseTimer,
    resumeTimer,
    startBreak,
    sessionFinished,
    startMainSession,
    setTimeLeft,
} from '../features/timer/timerSlice';

function Timer() {
    const d = useDispatch();
    const t = useSelector((state) => state.timer);
    const audioRef = useRef(null);

    if (t.playAudio && audioRef) {
        audioRef.current.play();
    }

    // for tests
    if (!t.isRunning && audioRef && audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    }

    if (t.sessionFinished) {
        if (t.sessionType === 'main') {
            d(startBreak());
        } else {
            d(startMainSession());
        }
    }

    // ticking logic
    useInterval(
        () => {
            const remainder = Math.max(0, t.endTime - getNow());
            d(setTimeLeft(remainder));
        },
        t.isRunning && !t.isPaused && !t.sessionFinished ? 200 : null
    );

    // initiate session end
    useEffect(() => {
        if (!t.isPaused && t.timeLeft <= 0 && !t.sessionFinished) {
            d(sessionFinished());
        }
    }, [d, t.isPaused, t.sessionFinished, t.timeLeft]);

    const handlePlayPause = () => {
        if (!t.isRunning) {
            d(startTimer());
        } else if (t.isPaused) {
            d(resumeTimer());
        } else {
            d(pauseTimer());
        }
    };

    let displayTime;
    if (t.isRunning) {
        displayTime = formatMs(t.timeLeft);
    } else {
        displayTime =
            t.sessionType === 'main'
                ? `${t.mainSessionLength}:00`
                : `${t.breakLength}:00`;
    }

    return (
        <>
            <Layout
                displayTime={displayTime}
                handlePlayPause={handlePlayPause}
                isPaused={t.isPaused}
                sessionType={t.sessionType}
                audioRef={audioRef}
            />
        </>
    );
}

export default Timer;
