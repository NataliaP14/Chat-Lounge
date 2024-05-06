import "./chat.css"
import EmojiPicker from "emoji-picker-react"
import { useState, useEffect, useRef } from "react"
import { db } from "../../lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";

const Chat = () => {
const [open, setOpen] = useState(false);
const [text, setText] = useState("");
const [chat, setChat] = useState()
const { chatId } = useChatStore();

const endRef = useRef(null);

useEffect(() => {
    endRef.current?.scrollIntoView({behavior:"smooth"});
}, []);

useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (response) => {
        setChat(response.data());

        
    })

    return () => {
        unSub();
    };
}, [chatId]);

const handleEmoji = e => {
    setText(prev=>prev + e.emoji);
    
}

    return (
        <div className='chat'>
            <div className="top">
                <div className="user">
                    <img src="./avatar.png" alt="" />
                    <div className = "texts">
                        <span>John Doe</span>
                        <p>Hello nice to meet you</p>
                    </div>
                </div>
                <div className="icons">
                    <img src="./phone.png" alt="" />
                    <img src="./video.png" alt="" />
                    <img src="./info.png" alt="" />
                </div>
            </div>
            <div className="center">
            {chat?.messages?.map(message => (
                <div className="message own" key ={message?.createAt}>
                    <div className="texts">
                    {message.img && <img 
                    src={message.img} alt="" />}
                        <p>
                        {message.text}
                        </p>
                       {/* <span>{message}</span>*/}
                    </div>
                </div>
            ))
                
            }  
                <div ref={endRef}></div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <img src="./img.png" alt="" />
                    <img src="./camera.png" alt="" />
                    <img src="./mic.png" alt="" />
                </div>
                <input type="text" placeholder="Type a message"  value={text} onChange={e=>setText(e.target.value)}/>
                <div className="emoji">
                    <img src="./emoji.png" alt="" onClick={()=> setOpen((prev) => !prev)}/>
                    <div className="picker">
                    <EmojiPicker open ={open} onEmojiClick={handleEmoji}/>
                    </div>
                </div>
                <button className="sendButton">Send</button>
            </div>
        </div>
    )
}

export default Chat