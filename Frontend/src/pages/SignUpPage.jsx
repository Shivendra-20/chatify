import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/userAuthStore.js";
import toast from "react-hot-toast";

function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
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
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      return;
    }
    signup({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-100 px-4 py-10 flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center opacity-30" />
      {/* <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/80 via-slate-100/90 to-cyan-100/80" /> */}
      {/* <div className="absolute -top-20 left-0 h-72 w-72 rounded-full bg-blue-300/35 blur-3xl animate-pulse" /> */}
      {/* <div className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-fuchsia-300/30 blur-3xl animate-pulse" /> */}

      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/60 p-8 shadow-2xl backdrop-blur-sm">
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-bold text-slate-900">Create account</h1>
          <p className="mt-2 text-sm text-slate-600">
            Join Chatify and start chatting in seconds.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="John Doe"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="name@example.com"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Confirm
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSigningup}
            className="mt-2 w-full rounded-xl bg-blue-600 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSigningup ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-700">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default SignUpPage;