import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

// TODO (student): Implement single-post view and delete flow.
// Suggested steps:
// 1) Fetch a single post with GET /api/posts/:id.
// 2) Render title, author, date, and content.
// 3) Add delete handler with DELETE /api/posts/:id.
// 4) Navigate back to /blog after successful delete.
function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    // TODO (student): Replace this placeholder with GET /api/posts/:id fetch logic.
    async function fetchPost() {
      try {
        setLoading(true);
        const response = await fetch(`/api/posts/${id}`);
        if (!response.ok) {
          throw new Error(`Error fetching post: ${response.statusText}`);
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  async function handleDelete() {
    // TODO (student): Implement DELETE /api/posts/:id and navigate('/blog').
    try {
      setDeleting(true);
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error deleting post: ${response.statusText}`);
      }
      navigate("/blog");
    } catch (error) {
      setError(error.message);
    } finally {
      setDeleting(false);
    }
  }

  if (loading) return <p className="status-msg">Loading…</p>;
  if (error && !post) return <p className="status-msg error">{error}</p>;
  if (!post)
    return (
      <p className="status-msg">Post not found. It may have been deleted.</p>
    );

  const date = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("fi-FI", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date missing";

  return (
    <article className="post-detail">
      <div className="post-detail-meta">
        <span className="author">{post.author}</span>
        <time>{date}</time>
      </div>

      <h1 className="post-detail-title">{post.title}</h1>

      <p className="post-detail-content">{post.content}</p>

      <div className="post-detail-actions">
        <Link to={`/posts/${id}/edit`} className="btn btn-secondary">
          Edit
        </Link>
        <button
          className="btn btn-danger"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? "Deleting…" : "Delete"}
        </button>
      </div>
    </article>
  );
}

export default PostPage;
