import React from 'react';

const Label = ({ text, ...rest }) => {
    return (
        <div className="mt-4 mb-2" {...rest}>
            {text}
        </div>
    );
};

export default Label;
