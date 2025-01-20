import React, { useState } from "react";
import { Button, CircularProgress, Snackbar, Alert, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import axios from "../axios";

const AIContentGenerator = ({ onPostCreated }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleGenerateContent = async () => {
    if (!topic.trim()) {
      setSnackbar({ open: true, message: "Please enter a topic", severity: "error" });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/ai/generate-content", { topic });

      if (response.data) {
        await axios.post("/blog-posts", {
          title: response.data.title,
          content: response.data.content,
          big_content: response.data.big_content,
          status: "published",
          user_id: 1, // Update this to use dynamic user data
        });

        setSnackbar({ open: true, message: "Post created successfully!", severity: "success" });
        onPostCreated();
      }
    } catch (error) {
      setSnackbar({ open: true, message: "Failed to generate content. Please try again.", severity: "error" });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)} disabled={loading}>
        {loading ? <CircularProgress size={24} color="inherit" /> : "Generate AI Content"}
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Generate Blog Post with AI</DialogTitle>
        <DialogContent>
          <TextField
            label="Enter topic"
            fullWidth
            margin="normal"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleGenerateContent} variant="contained" color="primary">
            Generate
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AIContentGenerator;
