import { useState, useEffect } from "react";

export default function PostModal({ post, onSave, onClose }) {
  const isEditing = Boolean(post?._id);
  const [form, setForm] = useState({ title: "", content: "", author: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (post) setForm({ title: post.title || "", content: post.content || "", author: post.author || "" });
  }, [post]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Título é obrigatório.";
    if (!form.content.trim()) e.content = "Conteúdo é obrigatório.";
    if (!form.author.trim()) e.author = "Autor é obrigatório.";
    return e;
  };

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((err) => ({ ...err, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await onSave(form);
      onClose();
    } catch (err) {
      setErrors({ global: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.modalTitle}>{isEditing ? "Editar post" : "Novo post"}</h2>
          <button style={styles.closeBtn} onClick={onClose} aria-label="Fechar">✕</button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <Field label="Título" error={errors.title}>
            <input style={fieldStyle(errors.title)} value={form.title} onChange={handleChange("title")} placeholder="Título do post" />
          </Field>
          <Field label="Autor" error={errors.author}>
            <input style={fieldStyle(errors.author)} value={form.author} onChange={handleChange("author")} placeholder="Seu nome" />
          </Field>
          <Field label="Conteúdo" error={errors.content}>
            <textarea style={{ ...fieldStyle(errors.content), minHeight: "140px", resize: "vertical" }} value={form.content} onChange={handleChange("content")} placeholder="Escreva o conteúdo aqui..." />
          </Field>

          {errors.global && <p style={styles.globalError}>{errors.global}</p>}

          <div style={styles.footer}>
            <button type="button" style={styles.btnCancel} onClick={onClose}>Cancelar</button>
            <button type="submit" style={styles.btnSubmit} disabled={loading}>
              {loading ? "Salvando…" : isEditing ? "Salvar alterações" : "Publicar post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-muted)" }}>{label}</label>
      {children}
      {error && <span style={{ fontSize: "12px", color: "var(--accent)" }}>{error}</span>}
    </div>
  );
}

const fieldStyle = (hasError) => ({
  background: "var(--surface2)",
  border: `1px solid ${hasError ? "var(--accent)" : "var(--border)"}`,
  borderRadius: "var(--radius)",
  padding: "10px 12px",
  fontSize: "14px",
  color: "var(--ink)",
  width: "100%",
});

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(26,22,17,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    padding: "16px",
    backdropFilter: "blur(2px)",
  },
  modal: {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-lg)",
    boxShadow: "var(--shadow-lg)",
    width: "100%",
    maxWidth: "540px",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "24px 28px 0",
    marginBottom: "20px",
  },
  modalTitle: {
    fontFamily: "var(--font-display)",
    fontSize: "22px",
    fontWeight: 700,
    color: "var(--ink)",
  },
  closeBtn: {
    background: "none",
    color: "var(--ink-muted)",
    fontSize: "16px",
    padding: "4px 8px",
    borderRadius: "var(--radius)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "0 28px 28px",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "8px",
  },
  btnCancel: {
    padding: "10px 18px",
    background: "transparent",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius)",
    fontSize: "13px",
    color: "var(--ink-muted)",
  },
  btnSubmit: {
    padding: "10px 20px",
    background: "var(--ink)",
    color: "#fff",
    borderRadius: "var(--radius)",
    fontSize: "13px",
    fontWeight: 500,
  },
  globalError: {
    fontSize: "13px",
    color: "var(--accent)",
    padding: "10px 14px",
    background: "var(--accent-light)",
    borderRadius: "var(--radius)",
  },
};
