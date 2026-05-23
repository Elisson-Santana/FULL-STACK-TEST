import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../services/api";
import logo from "./img/alunoeprof.png";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginMode, setLoginMode] = useState("code");
  const navigate = useNavigate();

  const TEACHER_CODE = "prof2024";
  const STUDENT_CODE = "aluno2024";

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    if (code === TEACHER_CODE) {
      onLogin("teacher");
    } else if (code === STUDENT_CODE) {
      onLogin("student");
    } else {
      setError("Código inválido.");
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email e senha são obrigatórios.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.loginUser(email, password);
      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        navigate("/student");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Email ou senha incorretos.");
    } finally {
      setLoading(false);
    }
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

        {/* Modo de Login */}
        <div style={styles.modeToggle}>
          <button
            style={{
              ...styles.modeBtn,
              ...(loginMode === "code" ? styles.modeBtnActive : {}),
            }}
            onClick={() => { setLoginMode("code"); setError(""); }}
          >
            Código
          </button>
          <button
            style={{
              ...styles.modeBtn,
              ...(loginMode === "email" ? styles.modeBtnActive : {}),
            }}
            onClick={() => { setLoginMode("email"); setError(""); }}
          >
            Email
          </button>
        </div>

        <div style={styles.divider} />

        {/* Formulário por Código */}
        {loginMode === "code" && (
          <form onSubmit={handleCodeSubmit} style={styles.form}>
            <label style={styles.label}>Código de acesso</label>
            <input
              style={styles.input}
              type="password"
              placeholder="Digite seu código"
              value={code}
              onChange={(e) => { setCode(e.target.value); setError(""); }}
              autoFocus
            />
            {error && <p style={styles.error}>{error}</p>}

            <button type="submit" style={styles.btn}>
              Entrar
            </button>
          </form>
        )}

        {/* Formulário por Email */}
        {loginMode === "email" && (
          <form onSubmit={handleEmailSubmit} style={styles.form}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              disabled={loading}
            />

            <label style={styles.label} style={{ marginTop: "12px" }}>Senha</label>
            <input
              style={styles.input}
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              disabled={loading}
            />

            {error && <p style={styles.error}>{error}</p>}

            <button type="submit" style={styles.btn} disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        )}

        <p style={styles.hint}>
          <span style={{ color: "#c1440e" }}>Professores</span> e{" "}
          <span style={{ color: "#2d6a4f" }}>alunos</span> possuem códigos diferentes.
        </p>

        <p style={styles.footer}>
          Não tem uma conta? <Link to="/register" style={styles.link}>Cadastre-se</Link>
        </p>
      </div>

      <div style={styles.bgPattern} aria-hidden="true" />

      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%,60% { transform: translateX(-6px); }
          40%,80% { transform: translateX(6px); }
        }
        .shake { animation: shake 0.4s ease; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
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
    maxWidth: "400px",
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
  modeToggle: {
    display: "flex",
    gap: "8px",
    marginBottom: "16px",
  },
  modeBtn: {
    flex: 1,
    padding: "10px",
    fontSize: "13px",
    fontWeight: 500,
    border: "1px solid var(--border)",
    background: "var(--surface)",
    color: "var(--ink-muted)",
    borderRadius: "var(--radius)",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  modeBtnActive: {
    background: "var(--ink)",
    color: "#fff",
    borderColor: "var(--ink)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "var(--ink-muted)",
  },
  input: {
    background: "var(--surface2)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius)",
    padding: "12px 14px",
    fontSize: "15px",
    color: "var(--ink)",
    transition: "border-color 0.2s",
  },
  error: {
    fontSize: "13px",
    color: "var(--accent)",
    marginTop: "4px",
    marginBottom: "6px",
  },
  btn: {
    marginTop: "12px",
    background: "var(--ink)",
    color: "#fff",
    borderRadius: "var(--radius)",
    padding: "13px",
    fontSize: "14px",
    fontWeight: 500,
    letterSpacing: "0.04em",
    transition: "background 0.2s, transform 0.1s",
    border: "none",
    cursor: "pointer",
  },
  hint: {
    marginTop: "20px",
    fontSize: "12px",
    color: "var(--ink-muted)",
    textAlign: "center",
    lineHeight: 1.5,
  },
  footer: {
    marginTop: "12px",
    fontSize: "13px",
    color: "var(--ink-muted)",
    textAlign: "center",
    lineHeight: 1.5,
  },
  link: {
    color: "var(--accent)",
    textDecoration: "none",
    fontWeight: 500,
  },
};

