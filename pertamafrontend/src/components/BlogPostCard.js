import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  IconButton,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  CardMedia,
  Box,
} from "@mui/material";
import axios from "../axios";
import CommentDialog from "./CommentDialog";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const BlogPostCard = ({ post, userRole, onPostDeleted, onPostUpdated }) => {
  const [editMode, setEditMode] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [authorName, setAuthorName] = useState("Unknown");

  // Form state for editing
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [bigContent, setBigContent] = useState(post.big_content);

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await axios.get(`/users/${post.user_id}`);
        setAuthorName(response.data.name);
      } catch (error) {
        console.error("Failed to fetch the author's name:", error);
      }
    };

    if (post.user_id) {
      fetchAuthor();
    }
  }, [post.user_id]);

  const handleDelete = () => {
    const token = localStorage.getItem("token");

    axios
      .delete(`/blog-posts/${post.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setSnackbar({
          open: true,
          message: "Post deleted successfully!",
          severity: "success",
        });
        onPostDeleted(post.id);
      })
      .catch(() => {
        setSnackbar({
          open: true,
          message: "Failed to delete the post. Please try again.",
          severity: "error",
        });
      });
  };

  const handleEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/blog-posts/${post.id}`,
        { title, content, big_content: bigContent },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSnackbar({
        open: true,
        message: "Post updated successfully!",
        severity: "success",
      });
      setEditMode(false);
      onPostUpdated(post.id, { title, content, big_content: bigContent });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to update the post.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Card
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
        mb: 3,
        display: "flex",
        flexDirection: "column",
        height: "100%", // Ensure cards take up equal height
      }}
    >
      <CardMedia
        component="div" // Use "div" to set it as a background image
        sx={{
          height: 200, // Ensure height is specified
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(${"https://uscredentialing.com/wp-content/uploads/2014/06/placeholder.png"})`,
        }}
        alt={post.title}
      />
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {post.content.substring(0, 100)}...
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Posted by: {authorName}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          mt: "auto", // Push actions to the bottom
          mb: 2, // Margin at the bottom
        }}
      >
        <Button
          size="small"
          variant="outlined"
          color="primary"
          onClick={() => (window.location.href = `/posts/${post.id}`)}
        >
          Read More
        </Button>
        <Box>
          {userRole === "admin" && (
            <>
              <Button
                onClick={() => setEditMode(true)}
                color="secondary"
                size="small"
              >
                Edit
              </Button>
              <Button onClick={handleDelete} color="error" size="small">
                Delete
              </Button>
            </>
          )}
          {userRole === "editor" && (
            <Button
              onClick={() => setEditMode(true)}
              color="secondary"
              size="small"
            >
              Edit
            </Button>
          )}
          <IconButton onClick={() => setCommentsOpen(true)} color="primary">
            <ChatBubbleOutlineIcon />
          </IconButton>
        </Box>
      </CardActions>

      <Dialog
        open={editMode}
        onClose={() => setEditMode(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Summary"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <TextField
            label="Full Content (Big Content)"
            fullWidth
            margin="normal"
            multiline
            rows={8}
            value={bigContent}
            onChange={(e) => setBigContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditMode(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEdit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <CommentDialog
        postId={post.id}
        open={commentsOpen}
        onClose={() => setCommentsOpen(false)}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default BlogPostCard;
