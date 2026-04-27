import React, { useEffect } from 'react'
import { Navigate,Route,Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import { useAuthStore } from './store/userAuthStore.js'
import { Toaster } from "react-hot-toast";

function App() {

const {authUser, isCheckingAuth,checkAuth} = useAuthStore();

useEffect(()=>{
  checkAuth()
},[checkAuth])

console.log({ authUser });

// if(isCheckingAuth) return <PageLoader />

return (
   <>
    <Routes>
      <Route path='/' element={authUser ? <ChatPage/> : <Navigate to={"/login"}/>} />
      <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to={"/"}/>} />
      <Route path='/signup' element={!authUser ? <SignUpPage/> : <Navigate to={"/"}/>} />
    </Routes>
    <Toaster position="top-center" />
   </>
  )
}

export default App