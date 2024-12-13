import React, { useState, useEffect } from "react";

const CachedUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Cache mechanism
    const cache = {};

    const fetchUsers = async () => {
        if (cache.users) {
            setUsers(cache.users);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            if (!response.ok) throw new Error("Failed to fetch users.");
            const data = await response.json();
            cache.users = data; // Cache the results
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (isLoading) return <p>Loading users...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h3>Cached Users</h3>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CachedUsers;
