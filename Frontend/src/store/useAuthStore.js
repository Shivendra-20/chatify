import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/api/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in authCheck:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });

    try {
      const res = await axiosInstance.post("/api/auth/signup", data);

      set({ authUser: res.data });

      toast.success("Account created successfully!");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });

    try {
      const res = await axiosInstance.post("/api/auth/login", data);

      set({ authUser: res.data });

      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/api/auth/logout");

      get().disconnectSocket();

      set({
        authUser: null,
        onlineUsers: [],
      });

      toast.success("Logged out successfully");
    } catch (error) {
      console.log("Logout error:", error);
      toast.error("Error logging out");
    }
  },

  updateProfile: async (data) => {
    try {
      const res = await axiosInstance.put(
        "/api/auth/update-profile",
        data
      );

      set({ authUser: res.data });

      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in update profile:", error);
      toast.error(error.response?.data?.message || "Update failed");
    }
  },

  connectSocket: () => {
    const { authUser } = get();

    if (!authUser) return;

    if (get().socket?.connected) return;

    const socket = io(BASE_URL, {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected:", reason);
    });

    socket.on("connect_error", (err) => {
      console.log("🚨 Socket error:", err.message);
    });

    socket.on("getOnlineUsers", (userIds) => {
      console.log("Online Users:", userIds);
      set({ onlineUsers: userIds });
    });

    set({ socket });
  },

  disconnectSocket: () => {
    const socket = get().socket;

    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));