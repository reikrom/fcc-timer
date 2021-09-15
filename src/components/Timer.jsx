import { useEffect, useRef, useState } from 'react';
import Layout from './Layout';
import useInterval from '../hooks/useInterval';
import { formatMs, getNow, toMs } from '../utils/timeHelper';
import { useDispatch, useSelector } from 'react-redux';

function Timer() {
    // settings
    // const [sessionLength, setSessionLength] = useState(0.1);
    // const [breakLength, setBreakLength] = useState(0.2);
    const { sessionLength, breakLength } = useSelector((state) => state.timer);
    const dispatch = useDispatch();

    // dispaly time
    const [timeLeft, setTimeLeft] = useState(toMs(sessionLength));

    const [isPaused, setIsPaused] = useState(true);
    const [sessionFinished, setSessionFinished] = useState(false);

    const audioRef = useRef(null);
    const timerRef = useRef({
        session: 'main', // main, break
        isRunning: false,
        startTime: null,
        endTime: null,
    });
    const timer = timerRef.current;

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

            // wait for the audio to finish
            setTimeout(() => {
                function calcEndTime(session) {
                    const timeBuffer = 900;
                    return getNow() + toMs(session) + timeBuffer;
                }

                if (timer.session === 'main') {
                    timer.endTime = calcEndTime(breakLength);
                    timer.session = 'break';
                } else {
                    timer.endTime = calcEndTime(sessionLength);
                    timer.session = 'main';
                }
                setSessionFinished(false);
            }, 2500);
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

            // rei @TODO: add a stop button to set isRunning false etc
            timer.isRunning = true;
            setIsPaused(!isPaused);
        }
    };

    // const reset = () => {
    //     timer.isRunning = false;
    //     timer.session = 'main';

    //     setTimeLeft(toMs(sessionLength));
    // };

    // ticking logic
    useInterval(
        () => {
            const remainder = Math.max(0, timer.endTime - getNow());

            !sessionFinished && setTimeLeft(remainder);
        },
        !isPaused && !sessionFinished ? 200 : null
    );

    let displayTime;
    if (timer.isRunning) {
        displayTime = formatMs(timeLeft);
    } else {
        displayTime =
            timer.session === 'main'
                ? `${sessionLength}:00`
                : `${breakLength}:00`;
    }
    return (
        <>
            <Layout
                timeLeft={displayTime}
                playPause={playPause}
                isPaused={isPaused}
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
