import Swal from "sweetalert2";
import useAxiosPublic from "../customHook/useAxiosPublic";
import { useState } from "react";

const image_hosting_key=import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api=`https://api.imgbb.com/1/upload?key=${image_hosting_key}`
import { Link, useLoaderData } from 'react-router-dom';

const UpdateEvents = () => {
    const event=useLoaderData()
     const[loading,setLoading]=useState(false)
    if(loading){
        return  <div className="flex justify-center mt-80"><span className="loading loading-bars loading-lg"></span></div>
    }
    const axiosPublic=useAxiosPublic()
    const handleUpdateEvents=async(e)=>{
      setLoading(true)
        e.preventDefault()
        const form=e.target
        const title=form.title.value
        const date=form.date.value
        const category=form.category.value
        const ticketType=form.ticketType.value
        const ticketPrice=form.ticketPrice.value
        const ticketQuantity=form.ticketQuantity.value
        const location=form.location.value
        const description=form.description.value
        const time=form.time.value
        const image=form.image.files[0]
        const ticketTypes=[{type:ticketType,price:ticketPrice,quantity:ticketQuantity}]
        console.log(title,date,category,ticketTypes,location,description,image,time)
       const formData = new FormData();
formData.append("image", image);
        const res=await axiosPublic.post(image_hosting_api,formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
         const photo=res.data.data.display_url
        console.log(photo)
      
        const eventsData={title,date,category,ticketTypes,location,description,image:photo,time}
     console.log(eventsData)
     axiosPublic.patch(`/events/${event?._id}`,eventsData)
     .then(res=>{
        console.log(res.data)
        if(res.data.modifiedCount>0){
            Swal.fire({
  position: "center",
  icon: "success",
  title: "Event is Updated",
  showConfirmButton: false,
  timer: 2000
});
setLoading(false)
        }
     })
    }
    console.log(event)
    return (
           <div>
            <h3 className="text-4xl font-bold my-6 text-center">Update Events Page</h3>
            <Link className="btn btn-neutral mt-4 ml-12" to='/dashboard/allEvents'>Back</Link>
          <form onSubmit={handleUpdateEvents} className="grid grid-cols-2 gap-6 px-12 pb-24 pt-6">

 <label className="form-control w-full ">
  <div className="label">
    <span className="label-text">Event Title</span>
  </div>
  <input type="text" name="title" defaultValue={event?.title} className="input input-bordered w-full " />
</label>
<label className="form-control w-full ">
  <div className="label">
    <span className="label-text">Date of Event</span>
  </div>
  <input type="date" name="date" defaultValue={event?.date} className="input input-bordered w-full " />
</label>
<label className="form-control w-full ">
  <div className="label">
    <span className="label-text">Event Category</span>
  </div>
 <select name="category" defaultValue={event?.category}  className="select select-bordered w-full">
  <option defaultValue={event?.category} disabled selected>Select Category</option>
  <option value='concert'>Concert</option>
  <option value='conference'>Conference</option>
   <option value='sports'>Sports</option>
    <option value='others'>Others</option>
</select>
</label>
<label className="form-control w-full ">
  <div className="label">
    <span className="label-text">Ticket Type</span>
  </div>
 <select name="ticketType"  defaultValue={event?.ticketTypes[0]?.type} className="select select-bordered w-full">
  <option  defaultValue={event?.ticketTypes[0]?.type} disabled selected>Select Type</option>
  <option>VIP</option>
  <option>Regular</option>
  <option>Student</option>
</select>
</label>
<label className="form-control w-full ">
  <div className="label">
    <span className="label-text">Ticket Quantity</span>
  </div>
  <input type="text" name="ticketQuantity" defaultValue={event?.ticketTypes[0]?.quantity} className="input input-bordered w-full " />
</label>

<label className="form-control w-full ">
  <div className="label">
    <span className="label-text">Ticket Price</span>
  </div>
  <input type="text" name="ticketPrice" defaultValue={event?.ticketTypes[0]?.price} className="input input-bordered w-full " />
</label>

<label className="form-control w-full ">
  <div className="label">
    <span className="label-text">Event Location</span>
  </div>
  <input type="text" name="location" defaultValue={event?.location} className="input input-bordered w-full " />
</label>
<label className="form-control w-full ">
  <div className="label">
    <span className="label-text">Event Time</span>
  </div>
  <input type="text" name="time" defaultValue={event?.time} className="input input-bordered w-full " />
</label>
<label className="form-control w-full col-span-2 ">
  <div className="label">
    <span className="label-text">Event Description</span>
  </div>
  <textarea className="input input-bordered w-full " defaultValue={event?.description} name="description" id=""></textarea>
</label>
<label className="form-control w-full ">
  <div className="label">
    <span className="label-text">Event Image</span>
  </div>
  <input type="file" name="image" className="file-input file-input-bordered w-full " />
</label>
<input type="submit" value="Update Event" className="btn text-white hover:bg-teal-800 w-full bg-teal-500  col-span-2"/>

          </form>
        </div>
    );
};

export default UpdateEvents;