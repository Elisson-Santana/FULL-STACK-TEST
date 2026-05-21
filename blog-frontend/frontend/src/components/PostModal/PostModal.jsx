export default function PostModal({ post, onClose }) {
  if (!post) return null;

  const date = new Date(post.createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h1 style={styles.title}>{post.title}</h1>
          <button style={styles.closeBtn} onClick={onClose} aria-label="Fechar">✕</button>
        </div>

        <div style={styles.body}>
          <div style={styles.meta}>
            <span style={styles.author}>Por {post.author}</span>
            <span style={styles.date}>{date}</span>
          </div>

          <div style={styles.content}>{post.content}</div>
        </div>
      </div>
    </div>
  );
}


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
    maxWidth: "640px",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  header: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: "28px 28px 0",
    marginBottom: "20px",
    gap: "16px",
  },
  title: {
    fontFamily: "var(--font-display)",
    fontSize: "28px",
    fontWeight: 700,
    color: "var(--ink)",
    margin: 0,
  },
  closeBtn: {
    background: "none",
    color: "var(--ink-muted)",
    fontSize: "20px",
    padding: "4px 8px",
    borderRadius: "var(--radius)",
    flexShrink: 0,
    cursor: "pointer",
  },
  body: {
    padding: "0 28px 28px",
  },
  meta: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
    paddingBottom: "16px",
    borderBottom: "1px solid var(--border)",
  },
  author: {
    fontSize: "13px",
    fontWeight: 500,
    color: "var(--accent)",
  },
  date: {
    fontSize: "13px",
    color: "var(--ink-muted)",
  },
  content: {
    fontSize: "15px",
    color: "var(--ink-muted)",
    lineHeight: 1.8,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
};
