import React, { useState } from 'react';
import Settings from './Settings';

const Layout = ({
    isPaused,
    audioRef,
    handlePlayPause,
    displayTime,
    sessionType,
}) => {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const openSettings = () => {
        setSettingsOpen((state) => !state);
    };

    const playPauseButton = isPaused ? (
        <i
            className="fa fa-play absolute"
            style={{ top: '26%', left: '36%' }}
        />
    ) : (
        <i className="fa fa-pause" />
    );

    const sessionTitle = sessionType === 'main' ? 'Session' : 'Break';

    return (
        <div className="App noselect text-white m-auto h-screen flex items-center justify-center">
            <i
                onClick={openSettings}
                className="fa fa-gear text-6xl absolute right-3 top-3 opacity-40 hover:opacity-100"
            />
            {/* Settings */}
            <Settings settingsOpen={settingsOpen} />
            {/* Display */}
            <div className="">
                <label className="text-4xl capitalize " id="timer-label">
                    {sessionTitle}
                </label>
                <div
                    className="font-orbitron font-bold text-8xl"
                    id="time-left"
                >
                    {displayTime}
                </div>
                <button
                    className="relative text-3xl border-white w-16 rounded-full h-16 border-2 mt-5"
                    onClick={handlePlayPause}
                    id="start_stop"
                >
                    {playPauseButton}
                </button>
            </div>
            <audio
                id="beep"
                src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
                preload="auto"
                ref={audioRef}
            />
        </div>
    );
};

export default Layout;
