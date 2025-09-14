import React from 'react';
import useAuth from '../customHook/useAuth';
import useTitle from '../customHook/useTitle';

const Profile = () => {
     useTitle('EventHive | Profile')
    const{user}=useAuth()
    return (
        <div className='pt-32'>
            <h3 className='text-4xl text-center font-semibold'>My Profile</h3>
        <div className='mx-auto w-[650px] border-2 border-blue-500 py-12 px-6 my-6 rounded-xl'>
                <div className='flex flex-col  gap-2'>
                <img className='w-32 mx-auto border-4 border-blue-500 rounded-xl' src={user?.photoURL} alt="" />
                <h3 className='text-4xl'>Name : {user?.displayName}</h3>
                <h4 className='text-3xl'>Email: {user?.email}</h4>
          
            </div>
        </div>
        </div>
    );
};

export default Profile;