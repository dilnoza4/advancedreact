import React, { useState } from "react";

const ErrorHandler = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/invalid-endpoint");
            if (!response.ok) {
                throw new Error("Failed to fetch data from the API.");
            }
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h3>Error Handler</h3>
            {isLoading && <p>Loading...</p>}
            {error && (
                <div>
                    <p>Error: {error}</p>
                    <button onClick={fetchData}>Retry</button>
                </div>
            )}
            {data && (
                <div>
                    <h4>Data Fetched Successfully</h4>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
            {!data && !isLoading && !error && (
                <button onClick={fetchData}>Fetch Data</button>
            )}
        </div>
    );
};

export default ErrorHandler;
