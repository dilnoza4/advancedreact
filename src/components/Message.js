import React from 'react';

const Message = ({ text }) => {
    return text ? <div className="alert alert-info mt-4">{text}</div> : null;
};

export default Message;
