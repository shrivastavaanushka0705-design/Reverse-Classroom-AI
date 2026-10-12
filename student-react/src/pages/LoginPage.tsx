import { useState } from "react";
import type { FormEvent } from "react";
import { Brand, Icon } from "../components/Brand";
import { authenticate } from "../services/api";

export interface LoginPageProps {
  onDone: (name: string) => void;
}

export default function LoginPage({ onDone }: LoginPageProps) {
  const [register, setRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email address to continue.");
      return;
    }
    if (password.length < 6) {
      setError("Your password should be at least 6 characters.");
      return;
    }
    if (register && name.trim().length < 2) {
      setError("Please enter your name.");
      return;
    }
    setBusy(true);
    try {
      const user = await authenticate(register ? "register" : "login", {
        name: register ? name.trim() : undefined,
        email: email.trim(),
        password,
        role: "STUDENT",
      });
      if (user.role !== "STUDENT") {
        throw new Error("This sign-in is for student accounts. Please use a student account.");
      }
      onDone(user.name.replace(/\b\w/g, character => character.toUpperCase()));
    } catch (cause) {
      setError(cause instanceof TypeError ? "Can't reach the server. Check your connection." : cause instanceof Error ? cause.message : "Sign-in failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return <main className="auth-screen">
    <section className="auth-story">
      <Brand light />
      <div className="story-copy">
        <span className="eyebrow"><span className="eyebrow-dot" /> LEARN A LITTLE DIFFERENTLY</span>
        <h1>Make every lesson<br />a chance to<br /><em>understand.</em></h1>
        <p>Learn at your own pace, check what makes sense, and get a little help when you need it.</p>
        <div className="story-proof"><div className="avatar-stack"><span>J</span><span>M</span><span>A</span><span>+</span></div><span>Learning at your own pace, together.</span></div>
      </div>
      <div className="story-bottom"><Icon name="lock" size={16} /> Your questions stay private. Your progress is yours.</div>
      <div className="story-orb orb-one" /><div className="story-orb orb-two" />
    </section>
    <section className="auth-form-area">
      <div className="auth-mobile-brand"><Brand /></div>
      <div className="auth-card">
        <span className="welcome-label">WELCOME TO YOUR LEARNING SPACE</span>
        <h2>{register ? "Create your account" : "Good to see you."}</h2>
        <p className="auth-subtitle">{register ? "Set up your student profile to get started." : "Sign in to pick up where you left off."}</p>
        <div className="auth-tabs" role="tablist" aria-label="Account access">
          <button type="button" role="tab" aria-selected={!register} className={!register ? "selected" : ""} onClick={() => { setRegister(false); setError(""); }}>Sign in</button>
          <button type="button" role="tab" aria-selected={register} className={register ? "selected" : ""} onClick={() => { setRegister(true); setError(""); }}>Create account</button>
        </div>
        <form onSubmit={submit} noValidate>
          {register && <label className="form-field"><span>Full name</span><input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Alex Morgan" autoComplete="name" /></label>}
          <label className="form-field"><span>Email address</span><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@school.edu" autoComplete="email" /></label>
          <label className="form-field"><span>Password</span><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" autoComplete={register ? "new-password" : "current-password"} /></label>
          {!register && <div className="form-meta"><label className="remember"><input type="checkbox" /> <span>Remember me</span></label><button type="button" className="text-button" onClick={() => setError("Password reset is not connected in this front-end preview.")}>Forgot password?</button></div>}
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="primary-button auth-submit" type="submit" disabled={busy}>{busy ? "Please wait…" : register ? "Create account" : "Sign in"} <Icon name="arrow" size={17} /></button>
        </form>
        <p className="auth-toggle">{register ? "Already have an account?" : "New to Reverse Classroom?"} <button className="text-button" onClick={() => { setRegister(!register); setError(""); }}>{register ? "Sign in" : "Create an account"}</button></p>
        <div className="demo-note"><span className="demo-dot" /> Front-end preview · Sign in with any valid email</div>
      </div>
      <p className="auth-legal">By continuing, you agree to our <button className="text-button" onClick={() => setError("Terms and privacy details will be available when the service launches.")}>Terms</button> and <button className="text-button" onClick={() => setError("Terms and privacy details will be available when the service launches.")}>Privacy Policy</button>.</p>
    </section>
  </main>;
}
