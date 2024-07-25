import {createContext, useState} from "react";
import run from "../config/gemini";
export const Context=createContext();
const ContextProvider=(props)=>{
    const [input,setInput]=useState("");
    const [recentPrompt,setrecentPrompt]=useState("")
    const [prevPrompts,setprevprompts]=useState([])
    const  [showResult,setShowResult]=useState(false)
    const  [Loading,setLoading]=useState(false)
    const  [resultData,setResultdata]=useState("")
    const delaypara=(index,nextWord)=>{
            setTimeout(() => {
               setResultdata(prev=>prev+nextWord+" ") 
            }, 75*index);
    }
    


    const onSent=async (prompt)=>{
        setResultdata("");
        setLoading(true);
        setShowResult(true);
        setrecentPrompt(input)
        setprevprompts(prev=>[...prev,input])
        const response=await run(prompt);
        let responseArray=response.split("**")
        let newArray;
        for (let index = 0; index < responseArray.length; index++) {
            if(index=== 0 || index%2!==1){
                newArray+=responseArray[index]
            }
            else{
                newArray+="<b>"+responseArray[index]+"</b>"

            }
            
        }
        let newArray2=newArray.split("*").join("</br>");
        
        // setResultdata(newArray2);
        const newres=newArray2.split(" ")
        for (let index = 0; index < newres.length; index++) {
            delaypara(index,newres[index]);
            
        }
        setLoading(false)
        setInput("")
    }
    // onSent("wht is react")
    const contextValue={
        prevPrompts,setprevprompts,
        onSent,recentPrompt,setrecentPrompt,
        showResult,resultData,setResultdata,setShowResult,
        Loading,setLoading,input,setInput

    }
    return(<Context.Provider value={contextValue}>
            {props.children}
    </Context.Provider>)
}
export default ContextProvider;