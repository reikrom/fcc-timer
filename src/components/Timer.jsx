import { useEffect, useRef, useState } from 'react';
import Layout from './Layout';
import useInterval from '../hooks/useInterval';
import { formatMs, getNow, toMs } from '../utils/timeHelper';
import { useDispatch, useSelector } from 'react-redux';
import { startTimer, playPauseTimer } from '../features/timer/timerSlice';

function Timer() {
    // settings
    const { sessionLength, breakLength, isRunning, isPaused } = useSelector(
        (state) => state.timer
    );
    const dispatch = useDispatch();

    const [timeLeft, setTimeLeft] = useState(toMs(sessionLength));
    const [sessionFinished, setSessionFinished] = useState(false);

    const audioRef = useRef(null);
    const timerRef = useRef({
        session: 'session', // session, break
        startTime: null,
        endTime: null,
    });
    const timer = timerRef.current;

    useEffect(() => {
        setTimeLeft(toMs(sessionLength));
    }, [sessionLength]);

    // session has finished
    useEffect(() => {
        if (timeLeft <= 0) {
            // session has finished but timer.isRunning is still true
            setSessionFinished(true);
        }
    }, [timeLeft]);

    // handle session change
    useEffect(() => {
        if (sessionFinished) {
            playAudio();

            function calcEndTime(session) {
                const timeBuffer = 500;
                return getNow() + toMs(session) + timeBuffer;
            }

            // wait for the audio to finish
            // setTimeout(() => {
            if (timer.session === 'session') {
                timer.endTime = calcEndTime(breakLength);
                timer.session = 'break';
            } else {
                timer.endTime = calcEndTime(sessionLength);
                timer.session = 'session';
            }
            setSessionFinished(false);
            // }, 2500);
        }
    }, [breakLength, sessionFinished, sessionLength, timer]);

    const playAudio = () => {
        new Audio(audioRef.current.currentSrc).play();
    };

    const playPause = () => {
        if (!sessionFinished) {
            // calculate time left
            timer.startTime = getNow();
            timer.endTime = getNow() + timeLeft;

            !isRunning ? dispatch(startTimer()) : dispatch(playPauseTimer());
            // setIsPaused(!isPaused);
        }
    };

    // ticking logic
    useInterval(
        () => {
            const remainder = Math.max(0, timer.endTime - getNow());

            !sessionFinished && setTimeLeft(remainder);
        },
        !isPaused && !sessionFinished ? 200 : null
    );

    let displayTime;
    if (isRunning) {
        displayTime = formatMs(timeLeft);
    } else {
        displayTime =
            timer.session === 'session'
                ? `${sessionLength}:00`
                : `${breakLength}:00`;
    }
    return (
        <>
            <Layout
                timeLeft={displayTime}
                playPause={playPause}
                isPaused={isPaused}
                session={timer.session}
            />
            <audio
                id="beep"
                src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
                preload="auto"
                ref={audioRef}
            />
        </>
    );
}

export default Timer;
