import { Link, useNavigate } from 'react-router-dom';
import bg from '../assets/login&register/event.jpg'
import useAuth from '../customHook/useAuth';
import useAxiosPublic from '../customHook/useAxiosPublic';
import Swal from 'sweetalert2';
import GoogleSignIn from '../components/GoogleSignIn';
import useTitle from '../customHook/useTitle';
import { updateProfile } from 'firebase/auth';
import auth from '../firebase/firebase.config';
import useAxiosSecure from '../customHook/useAxiosSecure';


const Register = () => {
  useTitle('EventHive | Register')
  const axiosPublic=useAxiosPublic()
 //const axiosSecure=useAxiosSecure()
const {createUser}=useAuth()

const navigate=useNavigate()
        const handleRegister=(e)=>{
        e.preventDefault()
        const form=e.target
        const email=form.email.value
        const password=form.password.value
        const name=form.name.value
        const photo=form.photo.value
        const userData={name,email,photo,password}
        console.log(name,photo,email,password)
        createUser(email,password)
          .then((result) => {
    const user = result.user;
console.log(user)
return updateProfile(auth.currentUser, {
  displayName: name, photoURL: photo
})
.then(() => {
console.log(' Profile updated!')
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
  navigate('/')
  }

})

}).catch((error) => {
console.log('An error occurred')
});
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
console.log(errorCode,errorMessage)
  });
    }
    return (
        <div>
                 <div className="hero bg-base-200 min-h-screen ">
  <div className="hero-content flex-col lg:flex-row mt-24">
    <div className="">
    <img src={bg} alt="" />
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl ">
        <h3 className="text-2xl font-semibold text-center mt-6">Please Register Your Account</h3>
      <form onSubmit={handleRegister} className="card-body">
             <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name='name' placeholder="Name" className="input input-bordered" required />
        </div>
             <div className="form-control">
          <label className="label">
            <span className="label-text">Photo Url</span>
          </label>
          <input type="text" name='photo' placeholder="photo" className="input input-bordered" required />
        </div>
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
          <button className="btn btn-primary">Register</button>
        </div>
      </form>
      <GoogleSignIn></GoogleSignIn>
      <h3 className='text-xl mb-6 text-center mx-6'>Already have an account .Please <Link className='text-cyan-500' to='/login'>Login Your Account</Link></h3>
    </div>
  </div>
</div>
        </div>
    );
};

export default Register;