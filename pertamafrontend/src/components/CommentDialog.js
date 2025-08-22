import React, { useState, useEffect } from "react";
import Modal from "./Modal";
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
      fetchComments();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const sentimentClass = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-500/10 text-green-600 dark:text-green-400";
      case "negative":
        return "bg-red-500/10 text-red-600 dark:text-red-400";
      default:
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Comments" actions={(
      <>
        <button onClick={onClose} className="rounded-md px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5">Close</button>
        <button onClick={handleAddComment} className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/90">Post Comment</button>
      </>
    )}>
      {loading ? (
        <div className="flex justify-center py-4">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-black/20 border-t-black dark:border-white/20 dark:border-t-white" />
        </div>
      ) : comments.length > 0 ? (
        <ul className="divide-y divide-black/10 dark:divide-white/10">
          {comments.map((comment) => (
            <li key={comment.id} className="flex items-start justify-between gap-3 py-3">
              <div>
                <div className="text-sm font-medium">{comment.user ? comment.user.name : "Unknown User"}</div>
                <div className="text-sm text-black/70 dark:text-white/70">{comment.comment_text}</div>
              </div>
              <span className={`rounded-md px-2 py-1 text-xs ${sentimentClass(comment.sentiment)}`}>
                {comment.sentiment || "No Sentiment"}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="py-2 text-sm text-black/70 dark:text-white/70">No comments yet.</div>
      )}

      <div className="mt-3">
        <label className="mb-1 block text-sm">Add a comment</label>
        <textarea
          rows={2}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-black dark:border-white/10 dark:bg-black"
        />
      </div>
    </Modal>
  );
};

export default CommentDialog;
