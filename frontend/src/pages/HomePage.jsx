import { useEffect, useState } from "react";
import PostCard from "../components/PostCard.jsx";

// TODO (student): Fetch all posts from the backend and render them.
// Suggested steps:
// 1) Keep local state for posts, loading, and error.
// 2) In useEffect, call GET /api/posts.
// 3) Show loading and error states.
// 4) Map posts into PostCard components.
function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO (student): Replace this placeholder with real fetch logic.
    async function fetchPosts() {
      try {
        setLoading(true);
        const response = await fetch("/api/posts");
        if (!response.ok) {
          throw new Error(`Error fetching posts: ${response.statusText}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) return <p className="status-msg">Loading posts…</p>;
  if (error) return <p className="status-msg error">{error}</p>;

  return (
    <div className="blog-page">
      <div className="page-heading">
        <p className="eyebrow">Blog</p>
        <h1 className="page-title">All posts</h1>
        <p className="page-copy">
          Welcome to the WS06 React blog! This is where we will share updates,
          news, and insights about our journey learning React. Stay tuned for
          exciting content and happy coding!
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="status-msg">
          No posts yet. Click "New Post" to create the first one!
        </p>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post._id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HomePage;
