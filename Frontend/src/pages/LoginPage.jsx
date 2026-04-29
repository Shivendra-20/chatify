import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useAuthStore } from '../store/userAuthStore.js';

function LoginPage() {

  const [formData, setFormData] = useState({ email:"", password:"" });
  const { login, isLoggingIn } = useAuthStore();

 const handleInputChange = (e)=>{
      setFormData({...formData,[e.target.name]:e.target.value})
 };

  const handleSubmit = (e) => {
    e.preventDefault();
    login({email: formData.email,
          password : formData.password
    });
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-gray-800 px-4 py-10 flex items-center justify-center">
      {/* <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center opacity-30" /> */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-100/80 via-slate-100/90 to-indigo-100/80" /> */}
      {/* <div className="absolute -top-16 -left-10 h-64 w-64 rounded-full bg-cyan-300/40 blur-3xl animate-pulse" /> */}
      {/* <div className="absolute -bottom-16 right-0 h-72 w-72 rounded-full bg-violet-300/35 blur-3xl animate-pulse" /> */}

      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/60 p-8 shadow-2xl backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-slate-900 text-center">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-600 text-center">
          Sign in to continue to Chatify.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full rounded-xl bg-blue-600 py-2.5 font-semibold text-white transition hover:bg-blue-700"
          >
            {isLoggingIn ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          New to Chatify?{" "}
          <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-700">
            Create account
          </Link>
        </p>
      </div>
    </section>
  )
}

export default LoginPage