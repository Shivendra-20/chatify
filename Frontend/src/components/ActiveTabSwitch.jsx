import { useChatStore } from '../store/useChatStore.js'

function ActiveTabSwitch() {

  const { activeTab, setActiveTab } = useChatStore();
  
  return (
    <div className='tabs tabs-boxed bg-transparent p-2 px-2 mx-10 flex'>
      <button 
      onClick={() => setActiveTab("chats")}
      className={`tab ${activeTab === "chats" ? "bg-cyan-800":"text-slate-400" } mx-1 rounded-2xl`}
      >
        Chats
      </button>
      <button 
      onClick={() => setActiveTab("contacts")}
      className={`tab ${activeTab==='contacts' ? "bg-cyan-800":"text-slate-400" } mx-1 rounded-2xl`}
      >
        Contacts
      </button>
      </div>
  )
}

export default ActiveTabSwitch