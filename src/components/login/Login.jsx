import "./login.css";
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import upload from "../../lib/upload";


const Login = () => {
    const [avatar, SetAvatar] = useState({
        file: null,
        url:""
    })

    const [loading, setLoading] = useState(false)

    

    const handleAvatar = e => {
        if (e.target.files[0]) {
        SetAvatar({
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

        const {username, email,password} = Object.fromEntries(formData);

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

    return (
        <div className = "login">
            <div className="item">
                <h2>Welcome back</h2>
                <form onSubmit = {handleLogin}>
                    <input type = "text" placeholder = "Email" name = "email"/> 
                    <input type = "password" placeholder = "Password" name = "password"/> 
                    <button disbaled = {loading}>{loading ? "Loading" : "Sign In"}</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
                <h2>Create Account</h2>
                <form onSubmit = {handleRegister}>
                <label htmlFor="file">
                    <img src={avatar.url || "./avatar.png"} alt="" />
                    Upload Image</label>
                <input type = "file" id = "file" style = {{display: "none"}} onChange = {handleAvatar}/> 
                <input type = "text" placeholder = "Username" name = "username"/>
                <input type = "text" placeholder = "Email" name = "email"/>  
                <input type = "password" placeholder = "Password" name = "password"/> 
                <button disbaled = {loading}>{loading ? "Loading" : "Sign Up"}</button>
                </form>
            </div>
        </div>
    )
};

export default Login