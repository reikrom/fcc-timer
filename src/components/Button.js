import React from 'react';

const Button = ({ children, ...rest }) => {
    return (
        <button
            className="py-2 px-4 bg-gray-800 rounded-lg mt-4 border text-center shadow transition duration-200 ease-in-out transform hover:-translate-y-px hover:shadow-md cursor-pointer font-semibold text-white"
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
