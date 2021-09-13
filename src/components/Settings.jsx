import React from 'react';
import Button from './Button';
import IconButton from './IconButton';
import Label from './Label';

const Setings = ({ settingsOpen, handleReset }) => {
    return (
        <div
            className={` bg-white transition-all rounded-md text-black w-full absolute z-10 p-10 max-w-sm   ${
                settingsOpen ? 'top-16' : '-top-96'
            }`}
        >
            <div className="text-3xl underline -mt-5 mb-5">Settings</div>
            <div>
                <Label id="break-label" text="Break Length" />

                <IconButton
                    id="break-decrement"
                    onClick={() => {}}
                    iconName="fa fa-arrow-down"
                />
                <span className="mx-3" id="break-length">
                    5:00
                </span>
                <IconButton
                    id="break-increment"
                    onClick={() => {}}
                    iconName="fa fa-arrow-up"
                />
            </div>
            <div className="session-controls">
                <Label id="session-label" text="Session Length" />
                <IconButton
                    id="session-decrement"
                    onClick={() => {}}
                    iconName="fa fa-arrow-down"
                />
                <span className="mx-3" id="session-length">
                    25:00
                </span>
                <IconButton
                    id="session-increment"
                    onClick={() => {}}
                    iconName="fa fa-arrow-up"
                />
            </div>

            <Button onClick={handleReset} id="reset">
                reset
            </Button>
        </div>
    );
};

export default Setings;
