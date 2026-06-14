    import { create } from 'zustand';
    import { axiosInstance } from '../lib/axios.js';
    import toast from "react-hot-toast";

    export const useChatStore = create((set,get) => ({
        allContacts: [],
        chats: [],
        messages: [],
        activeTab: 'chats',
        selectedUser: null,
        isUsersLoading: false,
        isMessagesLoading:false,
        isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,
        toggleSound : () => {
            localStorage.setItem("isSoundEnabled", !get().isSoundEnabled)
            set({isSoundEnabled: !get().isSoundEnabled})
        },

        setActiveTab: (tab) => set({activeTab:tab}),
        setSelectedUser: (selectedUser) => set({selectedUser}),

        getAllContacts :async() => {
            set({ isUsersLoading : true });
            try {
                const res = await axiosInstance.get("api/messages/contacts");
                console.log("Contacts:", res.data);
                set({allContacts:res.data});
            }  catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message || "Something went wrong");
            }finally{
                set({isUsersLoading:false});
            }
        },
        getMyChatPartners: async() => {
            set({isUsersLoading:true});
            try {
                const res = await axiosInstance.get("api/messages/chats");
                console.log("Chats:", res.data);
                set({chats: res.data});
            } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message || "Something went wrong");
            }finally{
                set({ isUsersLoading: false })
            }
        },
    }));