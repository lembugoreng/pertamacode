import React, { useState, useEffect } from "react";
import axios from "../axios";
import CommentDialog from "./CommentDialog";
import Modal from "./Modal";

const BlogPostCard = ({ post, userRole, onPostDeleted, onPostUpdated }) => {
  const [editMode, setEditMode] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [authorName, setAuthorName] = useState("Unknown");

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [bigContent, setBigContent] = useState(post.big_content);
  const [commentCount, setCommentCount] = useState(0);

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

    const fetchCommentCount = async () => {
      try {
        const response = await axios.get(`/blog-posts/${post.id}/comments`);
        setCommentCount(response?.data?.data?.length || 0);
      } catch (error) {
        console.error("Failed to fetch comment count:", error);
      }
    };

    if (post.user_id) {
      fetchAuthor();
    }
    fetchCommentCount();
  }, [post.user_id, post.id]);

  const handleDelete = () => {
    const token = localStorage.getItem("token");

    axios
      .delete(`/blog-posts/${post.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setSnackbar({ open: true, message: "Post deleted successfully!", severity: "success" });
        onPostDeleted(post.id);
      })
      .catch(() => {
        setSnackbar({ open: true, message: "Failed to delete the post. Please try again.", severity: "error" });
      });
  };

  const handleEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/blog-posts/${post.id}`,
        { title, content, big_content: bigContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSnackbar({ open: true, message: "Post updated successfully!", severity: "success" });
      setEditMode(false);
      onPostUpdated(post.id, { title, content, big_content: bigContent });
    } catch (error) {
      setSnackbar({ open: true, message: "Failed to update the post.", severity: "error" });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="flex h-full flex-col rounded-xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="h-48 w-full overflow-hidden rounded-t-xl">
        <img src={post.image || "https://via.placeholder.com/800x400?text=Post"} alt={post.title} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1 line-clamp-2 text-lg font-semibold">{post.title}</h3>
        <p className="mb-2 line-clamp-3 text-sm text-black/70 dark:text-white/70">{post.content?.substring(0, 140)}...</p>
        <span className="text-xs text-black/50 dark:text-white/50">Posted by: {authorName}</span>

        <div className="mt-auto flex items-center justify-between pt-4">
          <button
            className="rounded-md border border-black/20 px-3 py-1.5 text-sm hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/5"
            onClick={() => (window.location.href = `/posts/${post.id}`)}
          >
            Read More
          </button>
          <div className="flex items-center gap-2">
            {(userRole === "admin" || userRole === "editor") && (
              <button
                onClick={() => setEditMode(true)}
                className="rounded-md px-2 py-1 text-sm hover:bg-black/5 dark:hover:bg-white/5"
              >
                Edit
              </button>
            )}
            {userRole === "admin" && (
              <button
                onClick={handleDelete}
                className="rounded-md px-2 py-1 text-sm text-red-600 hover:bg-red-500/10 dark:text-red-400"
              >
                Delete
              </button>
            )}
            <button onClick={() => setCommentsOpen(true)} className="relative rounded-md px-3 py-1.5 text-sm hover:bg-black/5 dark:hover:bg-white/5">
              Comments
              {commentCount > 0 && (
                <span className="absolute -right-2 -top-2 inline-flex min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-[10px] leading-4 text-white dark:bg-white dark:text-black">
                  {commentCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <Modal
        open={editMode}
        onClose={() => setEditMode(false)}
        title="Edit Post"
        actions={(
          <>
            <button onClick={() => setEditMode(false)} className="rounded-md px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5">Cancel</button>
            <button onClick={handleEdit} className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/90">Save</button>
          </>
        )}
      >
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-sm">Title</label>
            <input
              className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-black dark:border-white/10 dark:bg-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm">Summary</label>
            <textarea
              rows={4}
              className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-black dark:border-white/10 dark:bg-black"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm">Full Content (Big Content)</label>
            <textarea
              rows={8}
              className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-black dark:border-white/10 dark:bg-black"
              value={bigContent}
              onChange={(e) => setBigContent(e.target.value)}
            />
          </div>
        </div>
      </Modal>

      <CommentDialog
        postId={post.id}
        open={commentsOpen}
        onClose={() => setCommentsOpen(false)}
      />

      {snackbar.open && (
        <div className={`m-3 rounded-md px-3 py-2 text-sm ${snackbar.severity === 'error' ? 'bg-red-500/10 text-red-600 dark:text-red-400' : 'bg-green-500/10 text-green-600 dark:text-green-400'}`} onAnimationEnd={handleCloseSnackbar}>
          {snackbar.message}
        </div>
      )}
    </div>
  );
};

export default BlogPostCard;
