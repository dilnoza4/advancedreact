import React, { useState, useEffect } from "react";

const DebouncedSearch = () => {
    const [query, setQuery] = useState("");
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            if (query) {
                fetchPosts();
            } else {
                setPosts([]);
            }
        }, 300); // 300ms debounce

        return () => clearTimeout(debounceTimeout);
    }, [query]);

    const fetchPosts = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?q=${query}`);
            if (!response.ok) throw new Error("Failed to fetch posts.");
            const data = await response.json();
            setPosts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h3>Debounced Search</h3>
            <input
                type="text"
                placeholder="Search posts..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {isLoading && <p>Loading posts...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default DebouncedSearch;
