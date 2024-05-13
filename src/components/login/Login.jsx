import "./login.css";
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import upload  from "../../lib/upload";


const Login = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url:""
    })

    const [loading, setLoading] = useState(false)
    const [isLogin, setIsLogin] = useState(true)

    

    const handleAvatar = e => {
        if (e.target.files[0]) {
        setAvatar({
            file:e.target.files[0],
            url:URL.createObjectURL(e.target.files[0])
        })
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.target)

        const {email,password} = Object.fromEntries(formData);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            
        } catch(error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
       
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.target)

        const {username, email, password} = Object.fromEntries(formData);

        try {
            //creating an account and putting in database
            const response = await createUserWithEmailAndPassword(auth, email, password);

            const imgUrl = await upload(avatar.file);

            await setDoc(doc(db, "users", response.user.uid), {
                username,
                email,
                avatar: imgUrl,
                id: response.user.uid,
                blocked:[],

            });

            //same with userchats
            await setDoc(doc(db, "userchats", response.user.uid), {
                chats: [],

            });


            toast.success("Account created!")

        } catch(error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const toggleLogin = (isLogin) => {
        setIsLogin(isLogin);
        const slider = document.querySelector(".slider");
        const formSection = document.querySelector(".form");
        
        if (!isLogin) {
            slider.classList.add("moveslider");
            formSection.classList.add("form-move");
        } else {
            slider.classList.remove("moveslider");
            formSection.classList.remove("form-move");
        }
    };

    return (

    <div className = "top">
       

        <div className="main">
                <div className="slider"></div>
                <div className="top-button">
                    <button className={isLogin ? "login active" : "login"} onClick={() => toggleLogin(true)}>Login</button>
                    <button className={!isLogin ? "signup active" : "signup"} onClick={() => toggleLogin(false)}>Signup</button>
                
            </div>
            <div className="form">
                <div className={`login-box ${isLogin ? "active" : ""}`}>
                   <div className = "text"><h2>Welcome back</h2></div> 
                    <form onSubmit={handleLogin}>
                        <input type="text" placeholder="Email" name="email" />
                        <input type="password" placeholder="Password" name="password" />
                        <button className = "submit" disabled={loading}>{loading ? "Loading" : "Sign In"}</button>
                    </form>
                </div>
    
                <div className={`signup-box ${!isLogin ? "active" : ""}`}>
                <div className = "text"><h2>Create Account</h2></div> 
                    <form onSubmit={handleRegister}>
                        <label htmlFor="file" className = "file-label">
                            <img src={avatar.url || "./avatar.png"} alt="" />
                            <p>Upload Image</p>
                        </label>
                        <input type="file" id="file" style={{ display: "none" }} onChange={handleAvatar} />
                        <input type="text" placeholder="Username" name="username" />
                        <input type="text" placeholder="Email" name="email" />
                        <input type="password" placeholder="Password" name="password" />
                        <button className = "submit" disabled={loading}>{loading ? "Loading" : "Sign Up"}</button>
                    </form>
                </div>
            </div>
        </div>
    </div>     
        
    )
};

export default Login