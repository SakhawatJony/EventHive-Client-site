import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import useAuth from '../customHook/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../customHook/useAxiosPublic';
import Swal from 'sweetalert2';
import useAxiosSecure from '../customHook/useAxiosSecure';

const GoogleSignIn = () => {
 const axiosPublic=useAxiosPublic()
  //const axiosSecure=useAxiosSecure()
    const{signInWithGoogle}=useAuth()
    const navigate=useNavigate()
    const location=useLocation()
    const handleGoogleSignIn=()=>{
        signInWithGoogle()
          .then((result) => {
    const user = result.user;
   console.log(user)
   const userData={name:user?.displayName,email:user?.email,photo:user?.photoURL}
   axiosPublic.post('/users',userData)
   .then(res=>{
    console.log(res.data)
    if(res.data.insertedId){
       Swal.fire({
        position: "center",
        icon: "success",
        title: "User Created SuccessFully",
        showConfirmButton: false,
        timer: 2000
      });
      
    }else{
        Swal.fire({
        position: "center",
        icon: "success",
        title: "User Logged In SuccessFully",
        showConfirmButton: false,
        timer: 2000
      });
        navigate(location?.state?location?.state:'/')
    }
    
   })

  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
   console.log(errorCode,errorMessage)
  });
    }
    return (
        <div>
            <button onClick={handleGoogleSignIn} className="btn text-white btn-primary w-full  my-2">
 <FaGoogle></FaGoogle>
  Sign In With Google
</button>
        </div>
    );
};

export default GoogleSignIn;