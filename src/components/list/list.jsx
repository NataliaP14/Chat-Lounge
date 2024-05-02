import "./list.css"
import UserInfo from "./userInfo/userInfo"
import ChatList from "./chatList/chatList"


const List = () => {
    return (
      <div className='list'>
        <UserInfo/>
        <ChatList/>

      </div>
    )
  }
  
  export default List