import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    decrementBreak,
    decrementSession,
    incrementBreak,
    incrementSession,
    resetSettings,
} from '../features/timer/timerSlice';
import Button from './Button';
import IconButton from './IconButton';
import Label from './Label';

const Setings = ({ settingsOpen, handleReset }) => {
    const { sessionLength, breakLength } = useSelector((state) => state.timer);
    const dispatch = useDispatch();

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
                    onClick={() => dispatch(decrementBreak())}
                    iconName="fa fa-arrow-down"
                />
                <span className="mx-3" id="break-length">
                    {breakLength}
                </span>
                <IconButton
                    id="break-increment"
                    onClick={() => dispatch(incrementBreak())}
                    iconName="fa fa-arrow-up"
                />
            </div>
            <div className="session-controls">
                <Label id="session-label" text="Session Length" />
                <IconButton
                    id="session-decrement"
                    onClick={() => dispatch(decrementSession())}
                    iconName="fa fa-arrow-down"
                />
                <span className="mx-3" id="session-length">
                    {sessionLength}
                </span>
                <IconButton
                    id="session-increment"
                    onClick={() => dispatch(incrementSession())}
                    iconName="fa fa-arrow-up"
                />
            </div>

            <Button onClick={() => dispatch(resetSettings())} id="reset">
                reset
            </Button>
        </div>
    );
};

export default Setings;
