import { useState } from "react";
import "./Dashboard.css";

export default function PostForm({ post, onSubmit, onClose, saving }) {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [author, setAuthor] = useState(post?.author || "");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = "Título é obrigatório.";
    if (!content.trim()) e.content = "Conteúdo é obrigatório.";
    if (!author.trim()) e.author = "Autor é obrigatório.";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    onSubmit({ title: title.trim(), content: content.trim(), author: author.trim() });
  };

  const isEdit = !!post;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box teacher-theme" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2 className="form-title">{isEdit ? "Editar post" : "Novo post"}</h2>

        <div className="form-field">
          <label>Título</label>
          <input
            type="text"
            placeholder="Título do post"
            value={title}
            onChange={(e) => { setTitle(e.target.value); setErrors((ev) => ({ ...ev, title: "" })); }}
          />
          {errors.title && <span style={{ color: "#f87171", fontSize: 12 }}>{errors.title}</span>}
        </div>

        <div className="form-field">
          <label>Autor</label>
          <input
            type="text"
            placeholder="Nome do autor"
            value={author}
            onChange={(e) => { setAuthor(e.target.value); setErrors((ev) => ({ ...ev, author: "" })); }}
          />
          {errors.author && <span style={{ color: "#f87171", fontSize: 12 }}>{errors.author}</span>}
        </div>

        <div className="form-field">
          <label>Conteúdo</label>
          <textarea
            placeholder="Escreva o conteúdo do post..."
            value={content}
            rows={8}
            onChange={(e) => { setContent(e.target.value); setErrors((ev) => ({ ...ev, content: "" })); }}
          />
          {errors.content && <span style={{ color: "#f87171", fontSize: 12 }}>{errors.content}</span>}
        </div>

        <div className="form-actions">
          <button className="btn-cancel" onClick={onClose}>Cancelar</button>
          <button className="btn-submit" onClick={handleSubmit} disabled={saving}>
            {saving ? "Salvando..." : isEdit ? "Salvar alterações" : "Publicar post"}
          </button>
        </div>
      </div>
    </div>
  );
}
