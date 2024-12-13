import React, { useState } from "react";

export default function FetchWithErrorHandling() {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const fetchData = () => {
        setError(null);
        fetch("https://jsonplaceholder.typicode.com/invalid-endpoint")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                return response.json();
            })
            .then((data) => setData(data))
            .catch((err) => setError(err.message));
    };

    return (
        <div>
            <h2>Error Handling</h2>
            <button onClick={fetchData}>Fetch Data</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {data && <p>Data fetched successfully!</p>}
        </div>
    );
}
