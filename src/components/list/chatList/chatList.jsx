import "./chatList.css"
import { useState, useEffect } from "react";
import AddUser from "./addUser/Adduser";
import { useUserStore } from "../../../lib/userStore";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../../lib/firebase";


const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);

  const {currentUser} = useUserStore();
  useEffect (() => {
    const unSub = onSnapshot(doc(db, "userchats", currentUser.id), (doc) => {
      console.log("Current Data: ", doc.data());
    });

    return () => {
      unSub();
    }
  }, []);


    return (
      <div className='chatList'>
        <div className="search">
          <div className="searchBar">
            <img src="./search.png" alt=""/>
            <input type="text" placeholder="Search"/>
          </div>
          <img src={addMode ? "./minus.png" : "./plus.png"} alt="" className= "add"
          onClick={() => setAddMode ((prev) => !prev)}/>
         
        </div>
        <div className="item">
          <img src="./avatar.png" alt=""/>
          <div className="texts">
          <span>John Doe</span>
          <p>Hello</p>
        </div>
        </div>
        <div className="item">
          <img src="./avatar.png" alt=""/>
          <div className="texts">
          <span>John Doe</span>
          <p>Hello</p>
        </div>
        </div>
        <div className="item">
          <img src="./avatar.png" alt=""/>
          <div className="texts">
          <span>John Doe</span>
          <p>Hello</p>
        </div>
        </div>
        <div className="item">
          <img src="./avatar.png" alt=""/>
          <div className="texts">
          <span>John Doe</span>
          <p>Hello</p>
        </div>
        </div>
        <div className="item">
          <img src="./avatar.png" alt=""/>
          <div className="texts">
          <span>John Doe</span>
          <p>Hello</p>
        </div>
        </div>
        <div className="item">
          <img src="./avatar.png" alt=""/>
          <div className="texts">
          <span>John Doe</span>
          <p>Hello</p>
        </div>
        </div>
        {addMode && <AddUser/>}
      </div>
    )
  }
  
  export default ChatList