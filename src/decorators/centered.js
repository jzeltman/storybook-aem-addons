import React from 'react';

const Centered = story => {
    const wrapperStyles = {

    };

    const centeredStyles = {

    }
    return (
        <div className="wrapper" style={wrapperStyles}>
            <div className="centered" style={centeredStyles}>{story}</div>
        </div>
    );
}
export default Centered;