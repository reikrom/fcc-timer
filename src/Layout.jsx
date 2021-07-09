import React from 'react';

const Layout = () => {
    return (
        <div>
            {/* Settings */}
            <div
                className="controls my-5 text-xl    w-2/5   m-auto"
                style={{ display: 'flex', justifyContent: 'center' }}
            >
                <div className="break-controls">
                    <div id="break-label" className="text-sm">
                        Break Length
                    </div>
                    <button onClick={() => {}} id="break-decrement">
                        v
                    </button>
                    <button onClick={() => {}} id="break-increment">
                        ^
                    </button>
                    <div id="break-length">5:00</div>
                </div>
                <div className="session-controls">
                    <div className="text-sm" id="session-label">
                        Session Length
                    </div>
                    <button onClick={() => {}} id="session-decrement">
                        v
                    </button>
                    <button onClick={() => {}} id="session-increment">
                        ^
                    </button>
                    <div id="session-length">25:00</div>
                </div>
            </div>
            {/* Display */}
            <div id="timer-label">Session</div>
            <div id="time-left">mm:ss</div>
            <button onClick={handleStartStop} id="start_stop">
                play / pause
            </button>
            <button onCick={handleReset} id="reset">
                reset
            </button>
            <div className="stars "></div>
            <div className="twinkling"></div>
        </div>
    );
};

export default Layout;
