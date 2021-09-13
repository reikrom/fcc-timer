import React from 'react';

const IconButton = ({ iconName, ...rest }) => {
    return (
        <button {...rest}>
            <i className={`${iconName} text-3xl`}></i>
        </button>
    );
};

export default IconButton;
