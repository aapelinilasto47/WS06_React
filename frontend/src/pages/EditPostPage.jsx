import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm.jsx";

// TODO (student): Implement edit flow.
// Suggested steps:
// 1) Fetch existing post with GET /api/posts/:id.
// 2) Pass fetched data to PostForm as initialData.
// 3) On submit, send PUT /api/posts/:id.
// 4) Navigate back to /posts/:id after successful save.
function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

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

  async function handleSubmit(e) {
    e.preventDefault();
    // TODO (student): Implement PUT /api/posts/:id and navigate(`/posts/${id}`).
    try {
      setSubmitting(true);
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: e.target.title.value,
          content: e.target.content.value,
          author: e.target.author.value,
        }),
      });
      if (!response.ok) {
        throw new Error(`Error updating post: ${response.statusText}`);
      }
      navigate(`/posts/${id}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <p className="status-msg">Loading…</p>;
  if (error && !post) return <p className="status-msg error">{error}</p>;
  if (!post) return <p className="status-msg">Post not found.</p>;

  return (
    <div>
      <h1 className="page-title">Edit post</h1>
      {error && <p className="status-msg error">{error}</p>}
      <PostForm
        key={post._id}
        initialData={post}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </div>
  );
}

export default EditPostPage;
