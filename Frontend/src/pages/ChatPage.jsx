import React from 'react'
import { useAuthStore } from '../store/userAuthStore.js'

function ChatPage() {

  const { logout } = useAuthStore();
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-100 px-4 py-6">
      {/* <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-10" /> */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-sky-100/80 via-slate-100/90 to-violet-100/70" /> */}
      {/* <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-cyan-300/30 blur-3xl animate-pulse" /> */}
     {/* <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-indigo-300/25 blur-3xl animate-pulse" /> */}

      <div className="relative mx-auto flex h-[calc(100vh-3rem)] w-full max-w-6xl rounded-2xl border border-white/70 bg-white/90 shadow-2xl backdrop-blur-sm">
        <aside className="hidden w-80 border-r border-slate-200 p-4 md:block">
          <h2 className="text-lg font-semibold text-slate-800">Chats</h2>
          <p className="mt-2 text-sm text-slate-500">Select a conversation to start messaging.</p>
          <button className='m-5 bg-red-400 p-3 rounded-2xl cursor-pointer' onClick={logout}>Logout</button>
        </aside>
        <main className="flex-1 p-6">
          <h1 className="text-xl font-semibold text-slate-800">Welcome to Chatify</h1>
          <p className="mt-2 text-slate-600">Your chat interface will appear here.</p>
        </main>
      </div>
    </section>
  )
}

export default ChatPage