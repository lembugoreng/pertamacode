import React, { useEffect, useState } from "react";
import axios from "../axios";
import BlogPostCard from "./BlogPostCard";
import AIContentGenerator from "./AIContentGenerator";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("Loading...");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [subscriptionMessage, setSubscriptionMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/auth/login";
    } else {
      fetchUserData();
    }

    fetchPosts(currentPage);
  }, [currentPage]);

  const handleSubscribe = async () => {
    try {
      const response = await axios.post("/subscribe", { email });
      setSubscriptionMessage(response.data.message);
    } catch (error) {
      setSubscriptionMessage(
        error.response?.data?.message || "Subscription failed."
      );
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get("/user");
      setUserName(response.data.name);
      setUserRole(response.data.role);
    } catch (error) {
      setError("Failed to load user data.");
    }
  };

  const fetchPosts = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`/blog-posts?page=${page}`);
      const updatedPosts = response.data.data.map((post) => ({
        ...post,
        image: post.image || "https://via.placeholder.com/800x400?text=Post",
      }));
      setPosts(updatedPosts);
      setTotalPages(response.data.meta.last_page);
    } catch (error) {
      setError("Failed to load blog posts.");
    } finally {
      setLoading(false);
    }
  };

  const handlePostUpdated = (postId, updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, ...updatedPost } : post
      )
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/auth/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-black/20 border-t-black dark:border-white/20 dark:border-t-white" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="rounded-md bg-red-500/10 px-4 py-2 text-red-600 dark:text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="text-sm text-black/70 dark:text-white/70">{userName} ({userRole})</div>
        <div className="flex items-center gap-3">
          <button onClick={handleLogout} className="rounded-md bg-black px-3 py-2 text-sm text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/90">Logout</button>
        </div>
      </div>

      <h1 className="mb-4 text-center text-4xl font-extrabold tracking-tight">THE BLOG</h1>

      {(userRole === "admin" || userRole === "editor") && (
        <div className="mb-6 flex flex-wrap items-center justify-end gap-3">
          <AIContentGenerator onPostCreated={() => fetchPosts(currentPage)} />
          <button
            onClick={() => navigate("/create")}
            className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            Create New Post
          </button>
        </div>
      )}

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recent blog posts</h2>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogPostCard
            key={post.id}
            post={post}
            userRole={userRole}
            onPostDeleted={() => fetchPosts(currentPage)}
            onPostUpdated={handlePostUpdated}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`${index + 1 === currentPage ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-transparent text-black dark:text-white border border-black/20 dark:border-white/20'} rounded-md px-3 py-1 text-sm`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row">
        <input
          type="email"
          placeholder="Enter your email to receive updates on new blog posts"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm outline-none placeholder:text-black/40 focus:border-black dark:border-white/10 dark:bg-black dark:placeholder:text-white/40"
        />
        <button onClick={handleSubscribe} className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/90">Subscribe</button>
      </div>

      {subscriptionMessage && (
        <div className="mt-3 rounded-md bg-blue-500/10 px-3 py-2 text-sm text-blue-700 dark:text-blue-400">{subscriptionMessage}</div>
      )}
    </div>
  );
};

export default Home;
