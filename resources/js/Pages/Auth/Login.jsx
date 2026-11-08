import AlertMessageComponents from "@/Components/AlertMassageCompononets";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiArrowLeft, FiShield, FiTrendingUp, FiAward } from "react-icons/fi";

/**
 * Login – premium split-screen design.
 * Left: brand panel with project image. Right: sign-in form.
 */
export default function Login({ general }) {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
    remember: false, // the controller reads `remember`
  });
  const [showPass, setShowPass] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    post(route("login"), { preserveScroll: true });
  };

  const logo = general?.logo ? `/${general.logo}` : null;
  const title = general?.title || "Defender Hotels & Resorts";

  return (
    <>
      <Head title="Login" />

      <div className="dh-auth">
        {/* ---- Brand panel ---- */}
        <aside className="dh-auth__brand" aria-hidden="false">
          <div className="dh-auth__brand-top">
            <Link href="/" className="dh-auth__logo" aria-label={title}>
              {logo ? <img src={logo} alt={title} /> : <strong>{title}</strong>}
            </Link>
          </div>

          <div className="dh-auth__brand-body">
            <p className="dh-auth__eyebrow">Owner &amp; Admin Portal</p>
            <h1>Manage your premium hospitality investments.</h1>
            <p className="dh-auth__lead">
              Securely access your dashboard, ownership details and the latest updates from {title}.
            </p>

            <ul className="dh-auth__points">
              <li><span><FiShield /></span> Secure &amp; documented ownership</li>
              <li><span><FiTrendingUp /></span> Long-term income opportunity</li>
              <li><span><FiAward /></span> Exclusive owner stay benefits</li>
            </ul>
          </div>

          <p className="dh-auth__copy">© {new Date().getFullYear()} {title}</p>
        </aside>

        {/* ---- Form panel ---- */}
        <main className="dh-auth__main">
          <div className="dh-auth__card">
            <Link href="/" className="dh-auth__back">
              <FiArrowLeft aria-hidden="true" /> Back to website
            </Link>

            {logo && (
              <img className="dh-auth__mobile-logo" src={logo} alt={title} />
            )}

            <h2>Welcome back 👋</h2>
            <p className="dh-auth__sub">Sign in to continue to your account.</p>

            <AlertMessageComponents status={errors.status} message={errors.message} />

            <form onSubmit={submit} noValidate>
              <div className="dh-auth__field">
                <label htmlFor="loginEmail">Email address</label>
                <div className={`dh-auth__input ${errors.email ? "has-error" : ""}`}>
                  <FiMail aria-hidden="true" />
                  <input
                    id="loginEmail"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    required
                    autoFocus
                  />
                </div>
                {errors.email && <span className="dh-auth__error">{errors.email}</span>}
              </div>

              <div className="dh-auth__field">
                <div className="dh-auth__label-row">
                  <label htmlFor="loginPassword">Password</label>
                  <Link href={route("forgotPassword")} className="dh-auth__forgot">Forgot password?</Link>
                </div>
                <div className={`dh-auth__input ${errors.password ? "has-error" : ""}`}>
                  <FiLock aria-hidden="true" />
                  <input
                    id="loginPassword"
                    type={showPass ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="dh-auth__eye"
                    onClick={() => setShowPass((v) => !v)}
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    {showPass ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.password && <span className="dh-auth__error">{errors.password}</span>}
              </div>

              <label className="dh-auth__remember">
                <input
                  type="checkbox"
                  checked={data.remember}
                  onChange={(e) => setData("remember", e.target.checked)}
                />
                <span>Keep me signed in</span>
              </label>

              <button type="submit" className="dh-auth__submit" disabled={processing}>
                {processing ? "Signing in..." : "Sign in"}
                {!processing && <FiArrowRight aria-hidden="true" />}
              </button>
            </form>

            <p className="dh-auth__help">
              Need help? Call <a href={`tel:${(general?.mobile || "").replace(/[^\d+]/g, "")}`}>{general?.mobile || "us"}</a>
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
