import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axios";

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
      <div className="flex justify-center py-10">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-black/20 border-t-black dark:border-white/20 dark:border-t-white" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-4">
      <button className="mb-4 rounded-md border border-black/20 px-3 py-1.5 text-sm hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/5" onClick={() => navigate("/home")}>
        Back to Home
      </button>

      <div className="rounded-xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <div className="mt-2 text-sm text-black/60 dark:text-white/60">
          Posted by: {post.authorName} | {new Date(post.created_at).toDateString()}
        </div>

        <div className="my-6 h-px bg-black/10 dark:bg-white/10" />

        <div className="prose max-w-none dark:prose-invert">
          <p className="leading-7">{post.big_content}</p>
        </div>

        <div className="my-6 h-px bg-black/10 dark:bg-white/10" />

        <div className="flex flex-wrap items-center gap-2">
          {['Technology','Innovation','Development'].map((t) => (
            <span key={t} className="rounded-md border border-black/20 px-2 py-1 text-xs dark:border-white/20">{t}</span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <a
            className="rounded-md bg-black px-3 py-1.5 text-sm text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/90"
            href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
            target="_blank"
            rel="noreferrer"
          >
            Share
          </a>
          <a
            className="rounded-md border border-black/20 px-3 py-1.5 text-sm hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/5"
            href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
            target="_blank"
            rel="noreferrer"
          >
            Tweet
          </a>
          <a
            className="rounded-md border border-black/20 px-3 py-1.5 text-sm hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/5"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
            target="_blank"
            rel="noreferrer"
          >
            Share
          </a>
        </div>
      </div>

      <div className="mt-8 text-center">
        <img
          alt={post.authorName}
          src="https://i.pravatar.cc/150?img=8"
          className="mx-auto h-20 w-20 rounded-full"
        />
        <div className="mt-2 text-lg font-semibold">{post.authorName}</div>
        <div className="text-sm text-black/60 dark:text-white/60">Passionate writer in technology and innovation.</div>
      </div>
    </div>
  );
};

export default BlogPostDetail;
