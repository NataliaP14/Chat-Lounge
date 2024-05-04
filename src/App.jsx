import List from "./components/list/list"
import Chat from "./components/chat/chat"
import Details from "./components/details/details"
import Login from "./components/login/Login"
import Notification from "./components/notification/Notification"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./lib/firebase";

const App = () => {

  const user = false

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      console.log(user);
    });

    return () => {
      unSub();
    };
  }, []);

  return (
    <div className='container'>
      {
        //if there is a user, go to list chat and details, else go to login page
        user ? (
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