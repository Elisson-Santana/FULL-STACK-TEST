import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import logo from "./auth/img/alunoeprof.png";

export default function HomePage() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleStudentAccess = () => {
    login("student", "Aluno");
    navigate("/student");
  };

  const handleProfessorAccess = () => {
    navigate("/professor-login");
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.decorLine} />
      <div style={styles.card}>
        <div style={styles.logoArea}>
          <span><img src={logo} alt="logo" style={styles.logo} /></span>
          <h1 style={styles.title}>BlogSchool</h1>
          <p style={styles.subtitle}>Blog colaborativo da turma</p>
        </div>

        <div style={styles.divider} />

        <p style={styles.introText}>
          Escolha como deseja acessar:
        </p>

        <div style={styles.buttonContainer}>
          <button
            style={{ ...styles.btn, ...styles.studentBtn }}
            onClick={handleStudentAccess}
          >
            <div style={styles.btnIcon}>👨‍🎓</div>
            <div style={styles.btnLabel}>Aluno</div>
            <div style={styles.btnSubtext}>Acessar posts</div>
          </button>

          <button
            style={{ ...styles.btn, ...styles.professorBtn }}
            onClick={handleProfessorAccess}
          >
            <div style={styles.btnIcon}>👨‍🏫</div>
            <div style={styles.btnLabel}>Professor</div>
            <div style={styles.btnSubtext}>Gerenciar posts</div>
          </button>
        </div>

        <div style={styles.divider} />

        <p style={styles.footer}>
          Ambiente seguro para compartilhamento de conhecimento
        </p>
      </div>

      <div style={styles.bgPattern} aria-hidden="true" />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.5s ease both; }
      `}</style>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--bg)",
    position: "relative",
    overflow: "hidden",
  },
  decorLine: {
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: "4px",
    background: "linear-gradient(90deg, var(--accent), var(--accent2))",
  },
  bgPattern: {
    position: "absolute",
    inset: 0,
    backgroundImage: `radial-gradient(circle, rgba(193,68,14,0.06) 1px, transparent 1px)`,
    backgroundSize: "32px 32px",
    zIndex: 0,
    pointerEvents: "none",
  },
  card: {
    position: "relative",
    zIndex: 1,
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-lg)",
    boxShadow: "var(--shadow-lg)",
    padding: "48px 40px",
    width: "100%",
    maxWidth: "480px",
    animation: "fadeUp 0.5s ease both",
  },
  logoArea: {
    textAlign: "center",
    marginBottom: "24px",
  },
  logo: {
    width: "100%",
    maxWidth: "150px",
    height: "auto",
    display: "block",
    margin: "0 auto 8px",
  },
  title: {
    fontFamily: "var(--font-display)",
    fontSize: "28px",
    fontWeight: 700,
    color: "var(--ink)",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: "13px",
    color: "var(--ink-muted)",
    marginTop: "4px",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  },
  divider: {
    height: "1px",
    background: "var(--border)",
    margin: "24px 0",
  },
  introText: {
    fontSize: "14px",
    color: "var(--ink)",
    textAlign: "center",
    marginBottom: "24px",
    fontWeight: 500,
  },
  buttonContainer: {
    display: "flex",
    gap: "16px",
    flexDirection: "column",
  },
  btn: {
    padding: "24px",
    borderRadius: "var(--radius)",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    fontWeight: 500,
  },
  btnIcon: {
    fontSize: "40px",
  },
  btnLabel: {
    fontSize: "16px",
    fontWeight: 600,
  },
  btnSubtext: {
    fontSize: "12px",
    opacity: 0.7,
    marginTop: "4px",
  },
  studentBtn: {
    background: "linear-gradient(135deg, #2d6a4f, #1b4332)",
    color: "#fff",
  },
  professorBtn: {
    background: "linear-gradient(135deg, #c1440e, #7f2704)",
    color: "#fff",
  },
  footer: {
    marginTop: "12px",
    fontSize: "12px",
    color: "var(--ink-muted)",
    textAlign: "center",
    lineHeight: 1.5,
  },
};
