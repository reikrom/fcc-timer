import { useEffect, useRef, useState } from 'react';
import Layout from './Layout';
import useInterval from '../hooks/useInterval';
import {
    formatMs,
    formatTimeStampHHMMSS,
    getNow,
    toMs,
} from '../utils/timeHelper';

function Timer() {
    // settings
    const [sessionLength, setSessionLength] = useState(0.1);
    const [breakLength, setBreakLength] = useState(0.2);

    const [isPaused, setIsPaused] = useState(false);

    const audioRef = useRef(null);
    const timerRef = useRef({
        isSession: false,
        isBreak: false,
        session: 'main', // main, break
        isRunning: false,
        startTime: null,
        endTime: null,
    });
    const timer = timerRef.current;

    // useContext for timerRef

    const [timeLeft, setTimeLeft] = useState(toMs(sessionLength));

    const playPause = () => {
        timer.isRunning = true;

        // calculate time left
        timer.endTime = getNow() + timeLeft;
        timer.startTime = getNow();

        setIsPaused(!isPaused);
    };
    const stop = () => {
        timer.isRunning = false;
        timer.startTime = null;
        timer.endTime = null;
        setTimeLeft(toMs(sessionLength));
    };
    const reset = () => {
        timer.isRunning = false;
        timer.session = 'main';

        setTimeLeft(toMs(sessionLength));

        setSessionLength(25);
        setBreakLength(5);
    };

    useInterval(
        () => {
            setTimeLeft(Math.max(0, timer.endTime - getNow()));
        },
        isPaused && timeLeft > 0 ? 200 : null
    );
    
    const incrementSession = () => {
        setSessionLength(sessionLength + 1);
    };
    const decrementSession = () => {
        setSessionLength(sessionLength - 1);
    };
    const breakIncrement = () => {
        setBreakLength(breakLength + 1);
    };
    const breakDecrement = () => {
        setBreakLength(breakLength - 1);
    };

    const playAudio = () => {
        new Audio(audioRef.current.currentSrc).play();
    };

    // when timer finishes, play audio and pause the timer and change it to break
    useEffect(() => {
        // so this works
        // audioRef.current.play()
        if (timeLeft <= 0) {
            playAudio();
            console.log(timer.session, 'timer.session')
            // handle session changes in timer ref
            if (timer.isRunning && timer.session === 'main') {
                timer.session = 'break';
            } else if (timer.isRunning && timer.session === 'break') {
                timer.session = 'main';
            }
        }
    }, [isPaused, timeLeft, timer]);

    useEffect(() => {
        if (timeLeft <= 0) {
            // unpause after a second
            setTimeout(() => {
            if (timer.isRunning  && timer.session === 'break') {
                timer.startTime = getNow();
                timer.endTime = getNow() + toMs(breakLength);
                console.log(timer, 'timer1');
            } else if (timer.isRunning  && timer.session === 'main') {
                timer.startTime = getNow();
                timer.endTime = getNow() + toMs(sessionLength);
                console.log(timer, 'timer2');
            }
            setTimeLeft(Math.max(0, timer.endTime - getNow()));
        }   , 2000);
    }
    }, [breakLength, isPaused, sessionLength, timeLeft, timer]);

    return (
        <>
            startTime: {formatTimeStampHHMMSS(timer.startTime)} <br />
            endTime: {formatTimeStampHHMMSS(timer.endTime)} <br />
            timeLeft: {timeLeft} <br />
            <i
                onClick={() => incrementSession(sessionLength)}
                className="fa fa-arrow-up"
            />
            sessionL: {sessionLength}
            <i
                onClick={() => decrementSession(sessionLength)}
                className="fa fa-arrow-down"
            />
            <br />
            <i
                onClick={() => breakIncrement(breakLength)}
                className="fa fa-arrow-up"
            />
            breakL: {breakLength}
            <i
                onClick={() => breakDecrement(breakLength)}
                className="fa fa-arrow-down"
            />
            <br /> Timer: <br />
            {formatMs(timeLeft)}
            <div onClick={playPause}>Start</div>
            <div onClick={stop}>Stop</div>
            <div onClick={reset}>reset</div>
            <div onClick={playAudio}>paly audio</div>
            {/* <div onClick={b2}>Pause</div>
            <div onClick={b3}>resume</div> */}
            <Layout
                timeLeft={formatMs(timeLeft)}
                playPause={playPause}
                stop={stop}
                reset={reset}
            />
            <audio
                id="beep"
                src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
                preload="auto"
                ref={audioRef}
            ></audio>
        </>
    );
}

export default Timer;
