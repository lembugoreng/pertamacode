import React, { useEffect, useState } from "react";
import axios from "../axios";
import {
  Container,
  Typography,
  Button,
  CircularProgress,
  Box,
  Grid,
  Alert,
  Stack,
  IconButton,
  Switch,
  Divider,
  TextField,
} from "@mui/material";
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
      window.location.href = "/login";
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
        image: post.image || "https://via.placeholder.com/400x200",
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
      <Divider sx={{ mb: 4 }} />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">
          {userName} ({userRole})
        </Typography>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button onClick={handleLogout} variant="contained" color="error">
            Logout
          </Button>
        </Stack>
      </Stack>

      <Typography
        variant="h2"
        gutterBottom
        align="center"
        sx={{ mt: 4, fontWeight: "bold" }}
      >
        THE BLOG
      </Typography>
      <Divider sx={{ mb: 4 }} />
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
        sx={{ mb: 2 }}
      >
        {(userRole === "admin" || userRole === "editor") && (
          <Stack direction="row" spacing={2}>
            <AIContentGenerator onPostCreated={() => fetchPosts(currentPage)} />
            <Button
              onClick={() => navigate("/create")}
              variant="contained"
              color="primary"
            >
              Create New Post
            </Button>
          </Stack>
        )}
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h5">Recent blog posts</Typography>
      </Stack>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} md={6} lg={4} key={post.id}>
            <BlogPostCard
              post={post}
              userRole={userRole}
              onPostDeleted={() => fetchPosts(currentPage)}
              onPostUpdated={handlePostUpdated}
            />
          </Grid>
        ))}
      </Grid>

      <Stack direction="row" justifyContent="center" sx={{ mb: 4, mt: 5 }}>
        {totalPages > 1 && (
          <Stack
            direction="row"
            spacing={1}
            sx={{ textAlign: "center", mt: 2 }}
          >
            {Array.from({ length: totalPages }).map((_, index) => (
              <Button
                key={index}
                variant={index + 1 === currentPage ? "contained" : "outlined"}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </Stack>
        )}
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mb: 4, mt: 5 }}>
        <TextField
          label="Enter your email to receive updates on new blog posts"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSubscribe}>
          Subscribe
        </Button>
      </Stack>
      {subscriptionMessage && (
        <Alert severity="info" sx={{ mt: 2 }}>
          {subscriptionMessage}
        </Alert>
      )}
    </Container>
  );
};

export default Home;
