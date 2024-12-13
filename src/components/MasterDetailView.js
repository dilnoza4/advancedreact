import React, { useState, useEffect } from "react";

const MasterDetailView = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users");
                if (!response.ok) throw new Error("Failed to fetch users.");
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchUsers();
    }, []);

    const fetchUserDetails = async (userId) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
            if (!response.ok) throw new Error("Failed to fetch user details.");
            const data = await response.json();
            setSelectedUser(data);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h3>Master-Detail View</h3>
            {error && <p>Error: {error}</p>}
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id} onClick={() => fetchUserDetails(user.id)}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {selectedUser && (
                <div>
                    <h4>User Details</h4>
                    <p>Name: {selectedUser.name}</p>
                    <p>Email: {selectedUser.email}</p>
                    <p>Phone: {selectedUser.phone}</p>
                    <p>Website: {selectedUser.website}</p>
                </div>
            )}
        </div>
    );
};

export default MasterDetailView;
