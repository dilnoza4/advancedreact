import React, { useState, useEffect } from "react";

export default function PaginatedUsers() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const usersPerPage = 2;

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error fetching users:", error));
    }, []);

    const startIndex = page * usersPerPage;
    const paginatedUsers = users.slice(startIndex, startIndex + usersPerPage);

    return (
        <div>
            <h2>Paginated Users</h2>
            <ul>
                {paginatedUsers.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
            <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                disabled={page === 0}
            >
                Previous
            </button>
            <button
                onClick={() => setPage((prev) => (startIndex + usersPerPage < users.length ? prev + 1 : prev))}
                disabled={startIndex + usersPerPage >= users.length}
            >
                Next
            </button>
        </div>
    );
}
