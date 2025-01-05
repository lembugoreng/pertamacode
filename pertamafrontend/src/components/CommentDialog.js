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


  // get comments
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

  //add new comment
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
      fetchComments(); //  refetch comments to get the correct user data
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Comments</DialogTitle>
      <DialogContent>
        {loading ? ( // ✅ Show a loading spinner while comments are being fetched
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : comments.length > 0 ? ( // ✅ Show comments if available
          <List>
            {comments.map((comment) => (
              <ListItem key={comment.id}>
                <ListItemText
                  primary={comment.user ? comment.user.name : "Unknown User"}
                  secondary={comment.comment_text}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          // ✅ Show this message if there are no comments
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
