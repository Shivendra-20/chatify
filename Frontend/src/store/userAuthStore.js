import { create } from "zustand";
import { axiosInstance } from '../lib/axios.js'
import toast from "react-hot-toast";

export const useAuthStore = create((set) =>({
    authUser :null,
    isCheckingAuth:true,
    isSigningup:false,
    isLoggingIn:false,

    checkAuth:async () =>{
        try {
            const res  = await axiosInstance.get("/auth/check");
            set({authUser:res.data});
        } catch (error) {
            console.log("Error in Authcheck:",error);
            set({authUser:null});
        }finally{
            set({ isCheckingAuth:false });
        }
    },

    signup: async(data)=>{
        set({isSigningup:true})
        try {
            const res = await axiosInstance.post("api/auth/signup",data);
            set({ authUser:res.data });

            toast.success("Account Created Succesfully!");            

        } catch (error) {
            const errorMessage =
                error?.response?.data?.message ||
                error?.response?.data ||
                error?.message ||
                "Signup failed";
            toast.error(errorMessage);
        }finally{
            set({isSigningup:false});
        }
    },

    login: async(data)=>{
        set({isLoggingIn:true})
        try {
            const res = await axiosInstance.post("/api/auth/login",data);
            set({ authUser:res.data });

            toast.success("Login in Succesfully!");            

        } catch (error) {
            const errorMessage =
                error?.response?.data?.message ||
                error?.response?.data ||
                error?.message ||
                "Login failed";
            toast.error(errorMessage);
        }finally{
            set({ isLoggingIn:false });
        }
    },

    logout: async()=>{
        try {
            await axiosInstance.post("api/auth/logout");
            set({authUser:null});
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error("Error logging out");
            console.log("Logout error : ",error);
        }
    }

}));