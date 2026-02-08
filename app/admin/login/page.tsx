import { login } from "./actions";

export default function AdminLoginPage({
  searchParams
}: {
  searchParams?: { error?: string };
}) {
  const hasError = searchParams?.error === "1";

  return (
    <div className="login">
      <div className="card login-card">
        <div className="section-title">Admin Login</div>
        <div className="muted">Masukkan password untuk mengakses dashboard.</div>
        {hasError ? <div className="login-error">Password salah.</div> : null}
        <form action={login} className="form-grid">
          <label className="field">
            <span>Password</span>
            <input type="password" name="password" placeholder="Password" required />
          </label>
          <button className="button primary" type="submit">
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
