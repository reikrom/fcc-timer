import React, { useState } from 'react';
import Settings from './Settings';

const Layout = ({ audioRef }) => {
    const handleStartStop = (params) => {
        setPlaying((state) => !state);
    };
    const handleReset = (params) => {};

    const [playing, setPlaying] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);

    const handleSettings = () => {
        setSettingsOpen((state) => !state);
    };

    return (
        <div className="App noselect text-white m-auto h-screen flex items-center justify-center">
            <i
                onClick={handleSettings}
                className="fa fa-gear text-6xl absolute right-3 top-3"
            />
            {/* Settings */}
            <Settings settingsOpen={settingsOpen} handleReset={handleReset} />
            {/* Display */}
            <div className="">
                <label className="text-4xl" id="timer-label">
                    25 + 5 Timer
                </label>
                <div
                    className="font-orbitron font-bold text-8xl"
                    id="time-left"
                >
                    25:00
                </div>
                <button
                    className="relative text-3xl border-white w-16 rounded-full h-16 border-2 mt-5"
                    onClick={handleStartStop}
                    id="start_stop"
                >
                    {playing ? (
                        <i
                            className="fa fa-play absolute"
                            style={{ top: '26%', left: '36%' }}
                        />
                    ) : (
                        <i className="fa fa-pause" />
                    )}
                </button>
            </div>
            <audio
                id="beep"
                src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
                preload="auto"
                ref={audioRef}
            />

            <div className="stars "></div>
            <div className="twinkling"></div>
        </div>
    );
};

export default Layout;
