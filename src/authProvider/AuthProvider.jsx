import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
import useAxiosPublic from "../customHook/useAxiosPublic";

export const AuthContext=createContext(null)
const AuthProvider = ({children}) => {
    const axiosPublic=useAxiosPublic()
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
    if(currentUser){
      const userInfo={ email: currentUser?.email }
      axiosPublic.post('/jwt', userInfo)
      .then(res=>{
        if(res.data.token){
          localStorage.setItem('access-token', res.data.token)
        }
      })
      .catch(err=>{
        console.error("JWT fetch failed:", err)
      })
      .finally(()=>{
        setLoading(false)   // সবসময় run হবে
      })
    } else {
      localStorage.removeItem('access-token')
      setLoading(false)
    }
  });

  return unsubscribe; // এটাই যথেষ্ট
},[axiosPublic])

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