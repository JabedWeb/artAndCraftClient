import {GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

// eslint-disable-next-line no-unused-vars
import React,{ createContext, useEffect, useState }  from 'react';
import app from "../../firebase/firebase.config";
import UseUser from "../../hooks/UserUser";


export const authContext = createContext(null);
const auth =getAuth(app)

const provider = new GoogleAuthProvider();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {
    const [ReUser]=UseUser();

    const [loader,setLoader]=useState(true);
    
    const [user, setUser] = useState(null)
    const loginUser=(email,password)=>{
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn=(email,password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInGoogle=()=>{
        //check if user is already registered or not
        //if registered then login
        //else register and then login
        // console.log("Reuser",ReUser);
        // console.log("provider",provider);
        // console.log("auth",auth);
        return signInWithPopup(auth, provider)
    }
    const SignOut=()=>{
        return signOut(auth);

    }

    useEffect(()=>{
        const unsubscribe =onAuthStateChanged(auth,(currentUser)=>{
            if(currentUser){
                setUser(currentUser);
                setLoader(false)
            }
            else{
                setUser(null);
                setLoader(false)
            }

        });
        return ()=>unsubscribe();

    },[user])
    

    const authInfo={
        user,
        loader,
        loginUser,
        signIn,
        signInGoogle,
        SignOut
    }

  return (
    <authContext.Provider value={authInfo}>
        {children}
        </authContext.Provider>
  )
}

export default AuthProvider