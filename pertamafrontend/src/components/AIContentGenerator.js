import React, { useState } from "react";
import Modal from "./Modal";
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
          user_id: 1,
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
      <button
        className="rounded-md border border-black/20 px-4 py-2 text-sm hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/5"
        onClick={() => setOpen(true)}
        disabled={loading}
      >
        {loading ? 'Generating…' : 'Generate AI Content'}
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="Generate Blog Post with AI" actions={(
        <>
          <button onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5">Cancel</button>
          <button onClick={handleGenerateContent} className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/90">Generate</button>
        </>
      )}>
        <label className="mb-1 block text-sm">Enter topic</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-black dark:border-white/10 dark:bg-black"
        />
      </Modal>

      {snackbar.open && (
        <div className={`mt-2 rounded-md px-3 py-2 text-sm ${snackbar.severity === 'error' ? 'bg-red-500/10 text-red-600 dark:text-red-400' : 'bg-green-500/10 text-green-600 dark:text-green-400'}`} onAnimationEnd={handleCloseSnackbar}>
          {snackbar.message}
        </div>
      )}
    </>
  );
};

export default AIContentGenerator;
