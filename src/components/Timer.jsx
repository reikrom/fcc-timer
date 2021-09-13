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
    // dispaly time
    const [timeLeft, setTimeLeft] = useState(toMs(sessionLength));
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

    const [isPaused, setIsPaused] = useState(false);
    const [sessionFinished, setSessionFinished] = useState(false);
    // const [isBreak, setIsBreak] = useState(false);

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

    // session has finished
    useEffect(() => {
        if (timeLeft <= 0) {
            console.log('session finished');
            setSessionFinished(true);
        }
    }, [timeLeft]);

    // play sound
    useEffect(() => {
        if (sessionFinished) {
            playAudio();
        }
    }, [sessionFinished]);

    const playPause = () => {
        timer.isRunning = true;

        // calculate time left
        timer.startTime = getNow();
        timer.endTime = getNow() + timeLeft;

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

    // ticking logic
    useInterval(
        () => {
            timeLeft > 0 && setTimeLeft(Math.max(0, timer.endTime - getNow()));
        },
        isPaused && !sessionFinished ? 200 : null
    );

    const playAudio = () => {
        new Audio(audioRef.current.currentSrc).play();
        // wait for the audio to finish
        setTimeout(() => {
            console.log('play audio && session finished = false');
            setSessionFinished(false);
        }, 2500);
    };

    // change to the next session type
    useEffect(() => {
        if (timeLeft <= 0 && sessionFinished) {
            if (!timer.isBreak) {
                // set up new time for a break
                timer.startTime = getNow();
                timer.endTime = getNow() + toMs(breakLength);
                console.log(timer, 'set up break times in ref');
            } else {
                // set up new time for a session
                const endTime = getNow() + toMs(sessionLength);

                timer.startTime = getNow();
                timer.endTime = endTime;
                timer.isBreak = false;
                console.log(timer, 'set up main session time in ref');
            }
            setTimeLeft(Math.max(0, timer.endTime - getNow()));
            setTimeout(() => {
                setIsPaused(false);
            }, 1000);
        }
    }, [breakLength, sessionFinished, sessionLength, timeLeft, timer]);

    // useEffect(() => {
    //     if (sessionFinished) {
    //         if (!isBreak) {
    //             timer.startTime = getNow();
    //             timer.endTime = getNow() + toMs(breakLength)
    //         }
    //         else {
    //             timer.startTime =
    //         }
    //     }
    // }, [])

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
