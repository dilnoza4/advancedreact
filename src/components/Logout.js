import React from 'react';

const Logout = ({ onLogout }) => (
    <div className="mt-4">
        <h3>You are logged in</h3>
        <button className="btn btn-danger" onClick={onLogout}>
            Logout
        </button>
    </div>
);

export default Logout;
