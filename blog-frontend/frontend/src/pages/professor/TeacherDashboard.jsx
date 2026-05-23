import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { UserContext } from "../../UserContext";
import PostCard from "../../components/PostCard/PostCard";
import PostModal from "../../components/PostModal/PostModal";
import PostForm from "./PostForm";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import "./Dashboard.css";

export default function TeacherDashboard({ user }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [selected, setSelected] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.listPosts();
      setPosts(data.data.data);
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
      setPosts(data.data.data);
    } catch (e) {
      setError(e.message);
    } finally {
      setSearching(false);
    }
  };

  const clearSearch = () => { setSearch(""); loadPosts(); };

  const handleCreate = async (body) => {
    setSaving(true);
    try {
      await api.createPost(body);
      showToast("Post criado com sucesso! 🎉");
      setFormOpen(false);
      loadPosts();
    } catch (e) {
      showToast(e.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (body) => {
    setSaving(true);
    try {
      await api.updatePost(editing._id, body);
      showToast("Post atualizado! ✏️");
      setEditing(null);
      loadPosts();
    } catch (e) {
      showToast(e.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await api.deletePost(deleteTarget._id);
      showToast("Post excluído.");
      setDeleteTarget(null);
      loadPosts();
    } catch (e) {
      showToast(e.message, "error");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dash-root teacher-theme">
      <header className="dash-header">
        <div className="dash-header-inner">
          <div className="dash-brand">
            <span className="dash-logo">✏️</span>
            <span className="dash-title">BlogSchool</span>
          </div>
          <div className="dash-user">
            <span className="user-badge teacher">📚 Prof. {user?.name || "Professor"}</span>
            <button className="logout-btn" onClick={handleLogout}>Sair</button>
          </div>
        </div>
      </header>

      <main className="dash-main">
        <div className="dash-hero teacher-hero">
          <div>
            <h2 className="dash-welcome">Olá, Prof. <em>{user?.name || "Professor"}</em> 👋</h2>
            <p className="dash-welcome-sub">Gerencie os posts do blog da sua turma.</p>
          </div>
          <button className="new-post-btn" onClick={() => setFormOpen(true)}>
            + Novo Post
          </button>
        </div>

        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Buscar por título, conteúdo ou autor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && <button type="button" className="search-clear" onClick={clearSearch}>✕</button>}
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
            {search
              ? <button onClick={clearSearch} className="link-btn">Ver todos os posts</button>
              : <button onClick={() => setFormOpen(true)} className="link-btn">Criar o primeiro post</button>
            }
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
                  isTeacher
                  onClick={() => setSelected(post)}
                  onEdit={(e) => { e.stopPropagation(); setEditing(post); }}
                  onDelete={(e) => { e.stopPropagation(); setDeleteTarget(post); }}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {toast && (
        <div className={`toast toast-${toast.type}`}>{toast.msg}</div>
      )}

      {selected && (
        <PostModal post={selected} onClose={() => setSelected(null)} />
      )}

      {(formOpen || editing) && (
        <PostForm
          post={editing}
          onSubmit={editing ? handleUpdate : handleCreate}
          onClose={() => { setFormOpen(false); setEditing(null); }}
          saving={saving}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Excluir post?"
          message={`"${deleteTarget.title}" será removido permanentemente.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
