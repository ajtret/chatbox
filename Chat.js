import React, { useState } from 'react'
import "./chat.css"
import { Avatar,IconButton} from '@material-ui/core';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import axios from "./axios";


function Chat({ messages }) {
    console.log(messages)
    const[input,setInput]=useState("") ;

    const sendMessage =(e) =>{
        e.preventDefault();
        axios.post("/messages/new",{
            message:input,
            name:"you",
            timestamp:"Just now!",
            received: true,
    });
    setInput("")
};
    return (
        <div className="chatbox">
            <div className="chat_header">
                <Avatar />
            
                <div className="chat_headerinfo">
                    <h3>Room Name</h3>
                    <p>Last seen at ....</p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlinedIcon/>
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>

                </div>  
            </div>
        <div className="chat_body">
            {messages.map((message) => (
                 <p className={`chat_message ${message.received && "chat_receiver"}`}> 
                 <span className="chat_name">
                     {message.name}
                 </span>
                 {message.message}
                 <span className="chat_timestamp">
                     {message.timestamp}
                 </span>
             </p>

            ))}
           

           
        </div>
        <div className="chat_footer">
            <InsertEmoticonIcon />
            <form>
                <input value={input} onChange={e => setInput(e.target.value)}
                 placeholder="Type a Message" type="text" />
                <button onClick={sendMessage} type="Submit">Send a Message </button>
            </form>
            <MicIcon/>
        </div>
    </div>
    )
}

export default Chat
