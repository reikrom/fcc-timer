import { useEffect, useRef, useState } from 'react';
import './App.css';
import Layout from './components/Layout';
import useInterval from './hooks/useInterval';

function App() {
    // settings
    const [sessionLength, setSessionLength] = useState(0.1);
    const [breakLength, setBreakLength] = useState(0.2);

    const [isPaused, setIsPaused] = useState(false);

    const audioRef = useRef(null);
    const timerRef = useRef({
        isSession: false,
        isBreak: false,
        isRunning: false,
        startTime: null,
        endTime: null,
    });
    const timer = timerRef.current;

    const [isAudioPlaying, setIsAudioPlaying] = useState(false);

    const getNow = () => new Date().getTime();

    const toMs = (minutes) => {
        return minutes * 60 * 1000;
    };
    const [timeLeft, setTimeLeft] = useState(toMs(sessionLength));

    const formatMs = (ms) => {
        let m = Math.floor(ms / 60000);
        let s = Math.floor(ms / 1000) % 60;
        s = (s < 10 ? '0' : '') + s;
        return m + ':' + s;
    };
    const playPause = () => {
        timer.isSession = true;
        timer.isRunning = true;

        if (!isPaused) {
            timer.endTime = getNow() + toMs(sessionLength);
        } else {
            timer.endTime = getNow() + timeLeft;
        }
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

        setTimeLeft(toMs(sessionLength));

        setSessionLength(25);
        setBreakLength(5);
    };

    useInterval(
        () => {
            setTimeLeft(Math.max(0, timer.endTime - getNow()));
        },
        timer.isRunning ? 500 : null
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
    // formate timestamp to hh:mm:ss
    const formatTimeStamp = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const time =
            (hours < 10 ? '0' : '') +
            hours +
            ':' +
            (minutes < 10 ? '0' : '') +
            minutes +
            ':' +
            (seconds < 10 ? '0' : '') +
            seconds;
        return time;
    };

    const playAudio = () => {
        new Audio(audioRef.current.currentSrc).play();
    };

    useEffect(() => {
        isAudioPlaying && new Audio(audioRef.current.currentSrc).play();
        return () => {
            setIsAudioPlaying(false);
        };
    }, [isAudioPlaying]);

    useEffect(() => {
        if (timeLeft <= 0) {
            setIsAudioPlaying(true);
            setTimeout(() => {
                if (timer.isSession) {
                    // set up new time for a break
                    timer.isBreak = true;
                    timer.isSession = false;
                    timer.startTime = getNow();
                    timer.endTime = getNow() + toMs(breakLength);
                    setIsPaused(false);
                } else {
                    // set up new time for a session
                    timer.isBreak = false;
                    timer.isSession = true;
                    timer.startTime = getNow();
                    timer.endTime = getNow() + toMs(sessionLength);
                    setIsPaused(false);
                }
            }, 1000);
        }
    }, [breakLength, sessionLength, timeLeft, timer]);

    return (
        <>
            startTime: {formatTimeStamp(timerRef.current.startTime)} <br />
            endTime: {formatTimeStamp(timerRef.current.endTime)} <br />
            timeLeft: {timeLeft} <br />
            <i
                onClick={() => incrementSession(sessionLength)}
                className="fa fa-arrow-up"
            />
            sessionL: {sessionLength}
            <i
                onClick={() => decrementSession(sessionLength)}
                className="fa fa-arrow-down"
            />{' '}
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
            {/* <Layout leTime={'s'} />{' '} */}
            <audio
                id="beep"
                src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
                preload="auto"
                ref={audioRef}
            ></audio>
        </>
    );
}

export default App;
