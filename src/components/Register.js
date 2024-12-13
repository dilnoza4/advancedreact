import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({ onSuccess, onError }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await fetch('https://reqres.in/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                onSuccess(data.token);
            } else {
                onError(data.error || 'Registration failed');
            }
        } catch (error) {
            onError('An error occurred during registration.');
        }
    };

    return (
        <div className="card shadow p-4 mt-5 mx-auto" style={{ maxWidth: '400px' }}>
            <h3 className="text-center text-primary">Register</h3>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className="btn btn-primary w-100 mb-3" onClick={handleRegister}>
                Register
            </button>
            <div className="text-center">
                <p>
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary fw-bold">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
