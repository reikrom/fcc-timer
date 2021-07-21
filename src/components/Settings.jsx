import React from 'react';

const Setings = ({ settingsOpen, handleReset }) => {
    const button =
        'py-2 px-4 bg-gray-800 rounded-lg mt-4 border text-center shadow transition duration-200 ease-in-out transform hover:-translate-y-px hover:shadow-md cursor-pointer font-semibold text-white';

    return (
        <div
            className={` bg-white transition-all rounded-md text-black w-full absolute z-10 p-10 max-w-sm   ${
                settingsOpen ? 'top-16' : 'hiddensdsd -top-96'
            }`}
        >
            <div className="text-3xl underline -mt-5 mb-5">Settings</div>
            <div>
                <div id="break-label" className="mt-4 mb-2">
                    Break Length
                </div>

                <button onClick={() => {}} id="break-decrement">
                    <i className="fa fa-arrow-down text-3xl"></i>
                </button>
                <span className="mx-3" id="break-length">
                    5:00
                </span>
                <button onClick={() => {}} id="break-increment">
                    <i className="fa fa-arrow-up text-3xl"></i>
                </button>
            </div>
            <div className="session-controls">
                <div className="mt-4 mb-2" id="session-label">
                    Session Length
                </div>
                <button onClick={() => {}} id="session-decrement">
                    <i className="fa fa-arrow-down text-3xl"></i>
                </button>
                <span className="mx-3" id="session-length">
                    25:00
                </span>
                <button onClick={() => {}} id="session-increment">
                    <i className="fa fa-arrow-up text-3xl"></i>
                </button>
            </div>
            <button className={button} onCick={handleReset} id="reset">
                reset
            </button>
        </div>
    );
};

export default Setings;
