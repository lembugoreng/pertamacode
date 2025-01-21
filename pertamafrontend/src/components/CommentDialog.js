import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  DialogActions,
  Box,
  CircularProgress, 
  Typography,
  Chip,
} from "@mui/material";
import axios from "../axios";

const CommentDialog = ({ postId, open, onClose }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (open) {
      fetchComments();
    }
  }, [open]);

  // Fetch comments with sentiment analysis
  const fetchComments = async () => {
    setLoading(true); 
    try {
      const response = await axios.get(`/blog-posts/${postId}/comments`);
      setComments(response.data.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false); 
    }
  };

  // Add new comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `/blog-posts/${postId}/comments`,
        { comment_text: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNewComment("");
      fetchComments(); // Refetch comments to get the correct user data with sentiment
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Function to determine the sentiment label color
  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return "success";
      case "negative":
        return "error";
      case "neutral":
      default:
        return "warning";
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Comments</DialogTitle>
      <DialogContent>
        {loading ? ( 
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : comments.length > 0 ? ( 
          <List>
            {comments.map((comment) => (
              <ListItem key={comment.id} alignItems="flex-start">
                <ListItemText
                  primary={comment.user ? comment.user.name : "Unknown User"}
                  secondary={comment.comment_text}
                />
                <Chip 
                  label={comment.sentiment || "No Sentiment"} 
                  color={getSentimentColor(comment.sentiment)}
                  sx={{ ml: 2 }}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No comments yet.
          </Typography>
        )}
        <Box mt={2}>
          <TextField
            label="Add a comment"
            fullWidth
            multiline
            rows={2}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
        <Button onClick={handleAddComment} variant="contained" color="primary">
          Post Comment
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommentDialog;
