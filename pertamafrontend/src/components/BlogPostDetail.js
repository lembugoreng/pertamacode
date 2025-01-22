import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axios";
import {
  Typography,
  Container,
  Button,
  Box,
  Paper,
  Avatar,
  Divider,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
} from "@mui/material";
import { Facebook, Twitter, LinkedIn } from "@mui/icons-material";

const BlogPostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/blog-posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Failed to fetch the post:", error);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
        <Button variant="outlined" color="primary" onClick={() => navigate("/home")}>
          Back to Home
        </Button>
      </Box>

      {/* Blog Banner */}


      <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, backgroundColor: "background.paper" }}>
        <Typography variant="h3" sx={{ fontWeight: "bold", color: "primary.main" }}>
          {post.title}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
          Posted by: {post.authorName} | {new Date(post.created_at).toDateString()}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
          {post.big_content}
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Tags */}
        <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
          <Chip label="Technology" color="primary" />
          <Chip label="Innovation" color="secondary" />
          <Chip label="Development" color="success" />
        </Box>

        {/* Social Share Buttons */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
          <Button
            startIcon={<Facebook />}
            variant="contained"
            color="primary"
            href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
            target="_blank"
          >
            Share
          </Button>
          <Button
            startIcon={<Twitter />}
            variant="contained"
            color="info"
            href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
            target="_blank"
          >
            Tweet
          </Button>
          <Button
            startIcon={<LinkedIn />}
            variant="contained"
            color="secondary"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
            target="_blank"
          >
            Share
          </Button>
        </Box>
      </Paper>

      {/* Author Bio */}
      <Box sx={{ mt: 5, textAlign: "center" }}>
        <Avatar
          alt={post.authorName}
          src="https://i.pravatar.cc/150?img=8"
          sx={{ width: 80, height: 80, margin: "0 auto" }}
        />
        <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
          {post.authorName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Passionate writer in technology and innovation.
        </Typography>
      </Box>
    </Container>
  );
};

export default BlogPostDetail;
