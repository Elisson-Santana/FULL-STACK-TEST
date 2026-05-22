import { useState, useEffect } from "react";
import { api } from "../../services/api";
import PostCard from "../../components/PostCard/PostCard";
import PostModal from "../../components/PostModal/PostModal";
import "../professor/Dashboard.css";
export default function StudentDashboard({ user, onLogout }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [selected, setSelected] = useState(null);

  const loadPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.listPosts();
      setPosts(data.data.data); //Maior problema estava aqui, era data.data e não data.data.data
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadPosts(); }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) { loadPosts(); return; }
    setSearching(true);
    setError("");
    try {
      const data = await api.searchPosts(search);
      setPosts(data.data.data); // era data.data

    } catch (e) {
      setError(e.message);
    } finally {
      setSearching(false);
    }
  };

  const clearSearch = () => {
    setSearch("");
    loadPosts();
  };



  return (
    <div className="dash-root student-theme">
      <header className="dash-header">
        <div className="dash-header-inner">
          <div className="dash-brand">
            <span className="dash-logo">✏️</span>
            <span className="dash-title">Blog Escolar</span>
          </div>
          <div className="dash-user">
            <span className="user-badge student">🎒 {user.name}</span>
            <button className="logout-btn" onClick={onLogout}>Sair</button>
          </div>
        </div>
      </header>

      <main className="dash-main">
        <div className="dash-hero">
          <h2 className="dash-welcome">Olá, <em>{user.name}</em> 👋</h2>
          <p className="dash-welcome-sub">Explore os posts do blog da sua turma.</p>
        </div>

        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Buscar por título, conteúdo ou autor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button type="button" className="search-clear" onClick={clearSearch}>✕</button>
          )}
          <button type="submit" className="search-btn" disabled={searching}>
            {searching ? "..." : "Buscar"}
          </button>
        </form>

        {error && <div className="dash-error">{error}</div>}

        {loading ? (
          <div className="dash-loading">
            <div className="loader"></div>
            <span>Carregando posts...</span>
          </div>
        ) : posts.length === 0 ? (
          <div className="dash-empty">
            <span>📭</span>
            <p>Nenhum post encontrado.</p>
            {search && <button onClick={clearSearch} className="link-btn">Ver todos os posts</button>}
          </div>
        ) : (
          <>
            <p className="post-count">{posts.length} post{posts.length !== 1 ? "s" : ""}</p>
            <div className="posts-grid">
              {posts.map((post, i) => (
                <PostCard
                  key={post._id}
                  post={post}
                  index={i}
                  onClick={() => setSelected(post)}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {selected && (
        <PostModal post={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
