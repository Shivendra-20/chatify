import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/userAuthStore.js";

function SignUpPage() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { signup, isSigningup } = useAuthStore();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return;
    signup({
      fullname: formData.fullname,
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#1f2a44_0,#0f172a_40%,#020617_100%)]" />
      <div className="absolute top-0 left-1/3 h-56 w-56 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-60 w-60 rounded-full bg-violet-500/20 blur-3xl" />

      <div className="relative w-full max-w-md rounded-2xl border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-bold text-white">Create account</h1>
          <p className="mt-2 text-sm text-slate-300">
            Join Chatify and start chatting in seconds.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-200">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              placeholder="John Doe"
              className="w-full rounded-xl border border-slate-500/60 bg-slate-800/70 px-4 py-2.5 text-white placeholder:text-slate-400 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-200">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="name@example.com"
              className="w-full rounded-xl border border-slate-500/60 bg-slate-800/70 px-4 py-2.5 text-white placeholder:text-slate-400 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-200">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-500/60 bg-slate-800/70 px-4 py-2.5 text-white placeholder:text-slate-400 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-200">
                Confirm
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-500/60 bg-slate-800/70 px-4 py-2.5 text-white placeholder:text-slate-400 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSigningup}
            className="mt-2 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 py-2.5 font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSigningup ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-300">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-cyan-300 hover:text-cyan-200">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default SignUpPage;