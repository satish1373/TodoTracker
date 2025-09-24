// Title.js
import React from 'react';

const Title = ({ text }) => {
    return (
        <h1 className="text-2xl font-bold uppercase">
            {text}
        </h1>
    );
};

export default Title;
