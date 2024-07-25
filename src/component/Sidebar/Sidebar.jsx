import "./Sidebar.css";
import {useContext, useState}from "react"
import { assets } from "../../assets/assets"
import { Context } from "../../context/Context";
function Sidebar() {
    const[extended,setextended]=useState(true);
const{prevPrompts,setrecentPrompt,setShowResult,setInput,setprevprompts}=useContext(Context)
const reset=()=>{
    setrecentPrompt("");
    setShowResult(false);
    setInput("")
    setprevprompts([])
    window.location.reload();
}
  return (
    <div className="sidebar">
        <div className="top">
            <img onClick={()=>setextended(!extended)} className="menu" src={assets.menu_icon} alt="assets.menu_icon"/>
            <div className="new-chat" onClick={reset}>
                <img src={assets.plus_icon} alt="assets.plus_icon"/>
               {extended &&<p>New chat</p>}
            </div>
            {extended && 
            <div className="recent">
                <div className="recent-title">Recent</div>
                {
                prevPrompts.map((item,index)=>{
                    return(
                        <div className="recent-entry" id={index} >
                        <img src={assets.message_icon} alt="" />
                        <p>{item.slice(0,15)}...</p>
                    </div>
                    )
                })}
                
            </div>}
        </div>


        <div className="bottom">
            <div className="bottom-item recent-entry">
                <img src={assets.question_icon} alt="" />
                {extended && <p>Help</p>}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.history_icon} alt="" />
                {extended && <p>Activity</p>} 
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.setting_icon} alt="" />
                {extended && <p>Setting</p>}
            </div>
            
        </div>
    </div>
  )
}

export default Sidebar
