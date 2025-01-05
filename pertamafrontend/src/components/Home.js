import React, { useEffect, useState } from "react";
import axios from "../axios";
import { Container, Typography, Button, CircularProgress, Box, Grid, Alert, Stack } from "@mui/material";
import BlogPostCard from "./BlogPostCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("Loading...");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ✅ Fetch user data and posts on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    } else {
      fetchUserData();
    }

    fetchPosts(currentPage);
  }, [currentPage]);

  // ✅ Fetch the logged-in user's name and role
  const fetchUserData = async () => {
    try {
      const response = await axios.get("/user");
      setUserName(response.data.name);
      setUserRole(response.data.role);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to load user data.");
    }
  };

  // ✅ Fetch blog posts
  const fetchPosts = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`/blog-posts?page=${page}`);
      setPosts(response.data.data);
      setTotalPages(response.data.meta.last_page);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      setError("Failed to load blog posts.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/auth/login");
  };

  // ✅ Handle Post Deletion
  const handlePostDeleted = async (postId) => {
    try {
      // First, filter out the deleted post locally
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));

      // Then, re-fetch posts to ensure the grid layout is correct
      await fetchPosts(currentPage);

      // If the current page becomes empty, go back one page
      if (posts.length === 1 && currentPage > 1) {
        setCurrentPage((prevPage) => prevPage - 1);
      }
    } catch (error) {
      console.error("Error handling post deletion:", error);
    }
  };

  // ✅ Handle Post Update
  const handlePostUpdated = (postId, updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === postId ? { ...post, ...updatedPost } : post))
    );
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "background.default",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "background.default",
        }}
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Container>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Blog Posts
        </Typography>
        <Button onClick={handleLogout} variant="contained" color="error">
          Logout
        </Button>
      </Stack>

      <Typography variant="h6" gutterBottom>
        Logged in as: {userName} ({userRole})
      </Typography>

      {(userRole === "admin" || userRole === "editor") && (
        <Button
          onClick={() => navigate("/create")}
          variant="contained"
          color="primary"
          style={{ marginBottom: "20px" }}
        >
          Create New Post
        </Button>
      )}

      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} md={6} key={post.id}>
            <BlogPostCard
              post={post}
              userRole={userRole}
              onPostDeleted={handlePostDeleted}
              onPostUpdated={handlePostUpdated}
            />
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <Button
              key={index}
              variant={index + 1 === currentPage ? "contained" : "outlined"}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Home;
