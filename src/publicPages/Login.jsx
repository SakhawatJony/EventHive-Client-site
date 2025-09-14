import { Link, useNavigate } from 'react-router-dom';
import bg from '../assets/login&register/event.jpg'
import useAuth from '../customHook/useAuth';
import GoogleSignIn from '../components/GoogleSignIn';
import useTitle from '../customHook/useTitle';
import useAxiosPublic from '../customHook/useAxiosPublic';
import Swal from 'sweetalert2';

const Login = () => {
  useTitle('EventHive | Login')
    const{signIn}=useAuth()
    const axiosPublic=useAxiosPublic()
    const navigate=useNavigate()
    const handleLogin=(e)=>{
        e.preventDefault()
        const form=e.target
        const email=form.email.value
        const password=form.password.value
        console.log(email,password)
        signIn(email,password)
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
  title: "User added and Logged In SuccessFully",
  showConfirmButton: false,
  timer: 2000
});
 navigate('/')
  }else{
    Swal.fire({
  position: "center",
  icon: "success",
  title: "User Logged In SuccessFully",
  showConfirmButton: false,
  timer: 2000
});
 navigate('/')
  }
 
 })

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode,errorMessage)
  });
    }
    return (
        <div className='pt-10'>
         <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="">
    <img src={bg} alt="" />
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h3 className="text-2xl font-semibold text-center mt-6">Please Login Your Account</h3>
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6 mx-auto">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
      <GoogleSignIn></GoogleSignIn>
      <h3 className='text-xl mb-6 text-center'>If you have no account ,Please <Link className='text-cyan-500' to='/register'>Register Your Account</Link></h3>
    </div>
  </div>
</div>
        </div>
    );
};

export default Login;