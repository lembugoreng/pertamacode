import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axios";
import { Typography, Container, Button, Box } from "@mui/material";

const BlogPostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/blog-posts/${id}`);
        console.log("post", response);
        setPost(response.data);
      } catch (error) {
        console.error("Failed to fetch the post:", error);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <Container>

      <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/home")}
        >
          Back to Home
        </Button>
      </Box>

      <Typography variant="h3" gutterBottom>
        {post.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {post.big_content}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Posted by: {post.authorName}
      </Typography>
    </Container>
  );
};

export default BlogPostDetail;
