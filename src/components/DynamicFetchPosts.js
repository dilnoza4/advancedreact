import React, { useState } from "react";

export default function DynamicFetchPosts() {
    const [userId, setUserId] = useState("");
    const [posts, setPosts] = useState([]);

    const fetchPosts = () => {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            .then((response) => response.json())
            .then((data) => setPosts(data))
            .catch((error) => console.error("Error fetching posts:", error));
    };

    return (
        <div>
            <h2>Fetch Posts by User ID</h2>
            <input
                type="number"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter User ID"
            />
            <button onClick={fetchPosts}>Fetch Posts</button>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
}
