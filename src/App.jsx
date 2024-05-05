import List from "./components/list/list";
import Chat from "./components/chat/chat";
import Details from "./components/details/details";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useEffect } from "react";
import { useUserStore } from "./lib/userStore";


const App = () => {

  const {currentUser, isLoading, fetchUserInfo} = useUserStore()

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
        fetchUserInfo(user?.uid);

    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  console.log(currentUser);

  if (isLoading) return <div className = "loading">Loading...</div>

  return (
    <div className='container'>
      {
        //if there is a user, go to list chat and details, else go to login page
        currentUser ? (
        <>
          <List/>
          <Chat/>
          <Details/>
        </>
        ) : (<Login/>)
      }
      <Notification/>
    

    </div>
  )
}

export default App