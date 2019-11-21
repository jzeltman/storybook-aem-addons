import React from 'react';

const Centered = props => {
    const parentStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };
    const childStyles = {
        margin: '1rem',
    };
    return (
        <div className="wrapper" style={parentStyles}>
            <div className="centered" style={childStyles}>{props.children}</div>
        </div>
    );
}
export default Centered;