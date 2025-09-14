import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";

export const AuthContext=createContext(null)
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    const provider = new GoogleAuthProvider();
    const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut=()=>{
          setLoading(true)
        return signOut(auth)
    }
    const signInWithGoogle=()=>{
        return signInWithPopup(auth, provider)
    }
/*
    const updateProfileData=({name,photo})=>{
        return updateProfile(auth.currentUser, {
  displayName: name, photoURL: photo
})
    }
*/
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth, (currentUser) => {
         setUser(currentUser)
           setLoading(false)
});

        return()=>{
            return unsubscribe()
        }
    },[])
    const authInfo={createUser,signIn,logOut,loading,user,signInWithGoogle}
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
             {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;