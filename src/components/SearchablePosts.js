import React, { useState, useEffect } from "react";

export default function SearchablePosts() {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((response) => response.json())
            .then((data) => setPosts(data))
            .catch((error) => console.error("Error fetching posts:", error));
    }, []);

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h2>Search Posts</h2>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title"
            />
            <ul>
                {filteredPosts.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
}
