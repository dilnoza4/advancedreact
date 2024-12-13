import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import FetchUsers from "./components/FetchUsers";
import FetchPosts from "./components/FetchPosts";
import DynamicPosts from "./components/DynamicPosts";
import PaginatedUsers from "./components/PaginatedUsers";
import CachedUsers from "./components/CachedUsers";
import MasterDetailView from "./components/MasterDetailView";
import DebouncedSearch from "./components/DebouncedSearch";
import InfiniteScroll from "./components/InfiniteScroll";
import SearchablePosts from "./components/SearchablePosts";
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import Message from './components/Message';
import ErrorHandler from "./components/ErrorHandler";

function App() {
    const [token, setToken] = useState(null); // State for token
    const [message, setMessage] = useState(''); // State for message
    const navigate = useNavigate(); // Navigation hook

    // Function to handle registration success
    const handleRegisterSuccess = (token) => {
        setToken(token);
        setMessage('Registration successful!');
        navigate('/'); // Redirect to home after successful registration
    };

    // Function to handle login success
    const handleLoginSuccess = (token) => {
        setToken(token);
        setMessage('Login successful!');
        navigate('/'); // Redirect to home after successful login
    };

    // Function to handle logout
    const handleLogout = () => {
        setToken(null); // Clear the token
        setMessage('Logged out successfully!');
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="container py-5">
            <h1 className="text-center">{token ? 'Welcome!' : 'Welcome to Our App'}</h1>

            <Routes>
                {/* Home route */}
                <Route
                    path="/"
                    element={
                        token ? (
                            <div>
                                {/* Fetching Data Section 1 */}
                                <section className="my-5 p-4 border rounded shadow-sm bg-light">
                                    <h2 className="text-center text-primary">Fetching Data 1</h2>
                                    <FetchUsers />
                                    <ErrorHandler />
                                </section>

                                {/* Fetching Data Section 2 */}
                                <section className="my-5 p-4 border rounded shadow-sm bg-light">
                                    <h2 className="text-center text-primary">Fetching Data 2</h2>
                                    <FetchPosts />
                                    <DynamicPosts />
                                    <PaginatedUsers />
                                </section>

                                {/* Fetching Data Section 3 */}
                                <section className="my-5 p-4 border rounded shadow-sm bg-light">
                                    <h2 className="text-center text-primary">Fetching Data 3</h2>
                                    <CachedUsers />
                                    <MasterDetailView />
                                    <DebouncedSearch />
                                    <InfiniteScroll />
                                    <SearchablePosts />
                                </section>

                                {/* Display message */}
                                <Message text={message} />
                            </div>
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                {/* Registration route */}
                <Route
                    path="/register"
                    element={
                        <Register
                            onSuccess={handleRegisterSuccess}
                            onError={setMessage}
                        />
                    }
                />
                {/* Login route */}
                <Route
                    path="/login"
                    element={
                        <Login
                            onSuccess={handleLoginSuccess}
                            onError={setMessage}
                        />
                    }
                />
            </Routes>

            {/* Show messages when not logged in */}
            {!token && <Message text={message} />}

            {/* Logout button at the bottom */}
            {token && (
                <div className="text-center mt-5">
                    <Logout onLogout={handleLogout} />
                </div>
            )}
        </div>
    );
}

export default function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}
