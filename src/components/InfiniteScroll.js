import React, { useState, useEffect } from "react";

const InfiniteScroll = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
                const data = await response.json();
                setPosts((prevPosts) => [...prevPosts, ...data]);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, [page]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 5) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div>
            <h3>Infinite Scrolling</h3>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
            {isLoading && <p>Loading more posts...</p>}
        </div>
    );
};

export default InfiniteScroll;
