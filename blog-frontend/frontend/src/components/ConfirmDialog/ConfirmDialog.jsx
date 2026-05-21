import "../../pages/professor/Dashboard.css";

export default function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box" style={{ maxWidth: 400 }} onClick={(e) => e.stopPropagation()}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 22,
          color: "#f5f0e8",
          margin: "0 0 12px"
        }}>{title}</h2>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, margin: "0 0 28px", lineHeight: 1.5 }}>
          {message}
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button className="btn-cancel" onClick={onCancel}>Cancelar</button>
          <button
            style={{
              background: "#f87171",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "11px 22px",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onClick={onConfirm}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
