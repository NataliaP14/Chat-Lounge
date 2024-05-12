import "./details.css"
import { auth, db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const Details = () => {

    const {chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore();
    const { currentUser } = useUserStore();

    const handleBlock = async () => {
        if (!user) return;
        const userDocRef = doc(db,"users", currentUser.id)
        try {
            await updateDoc(userDocRef, {
                blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
            });
            changeBlock()

        } catch(error) {
            console.log(error)
        }

    }
    return (
        <div className='details'>
            <div className="user">
                <img src= {user?.avatar || "./avatar.png"} alt="" />
                <h2>{user.username}</h2>
                <p>Hello nice to meet you</p>
            </div>
            <div className="info">
              
                <button onClick = {handleBlock}>{
                isCurrentUserBlocked ? "You are Blocked" : isReceiverBlocked ? "User Blocked" : "Block User"}</button>
                
            </div>
        </div>
    )
}

export default Details