import React, { useState, useEffect } from "react";

export default function FetchPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((response) => response.json())
            .then((data) => {
                setPosts(data);
                setLoading(false);
            })
            .catch((error) => console.error("Error fetching posts:", error));
    }, []);

    return (
        <div>
            <h2>Posts</h2>
            {loading ? <p>Loading...</p> : (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>{post.title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}
