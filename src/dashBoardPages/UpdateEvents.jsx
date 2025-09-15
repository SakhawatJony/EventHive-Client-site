import { useEffect, useState } from "react";
import {  useLoaderData } from 'react-router-dom';
import useAxiosPublic from "../customHook/useAxiosPublic";
import Swal from "sweetalert2";
const image_hosting_key=import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api=`https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const UpdateEvents = () => {
    const event=useLoaderData()
      const[loading,setLoading]=useState(false)
    
    const axiosPublic=useAxiosPublic()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    time: "",
    category: "Concert",
    ticketTypes: [                                   //index  
      { type: "VIP", price: "", quantity: "" },     //0
      { type: "Regular", price: "", quantity: "" }, //1
      { type: "Student", price: "", quantity: "" },  //2
    ],
    image: "",
  });

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle ticket type change
  const handleTicketChange = (index, field, value) => {
    const updatedTickets = [...formData.ticketTypes];
    updatedTickets[index][field] = value;
    setFormData({ ...formData, ticketTypes: updatedTickets });
  };
  useEffect(() => {
  if (event) {
    setFormData({
      title: event.title || "",
      description: event.description || "",
      location: event.location || "",
      date: event.date || "",
      time: event.time || "",  // এখানে অবশ্যই "HH:MM" ফরম্যাট থাকতে হবে
      category: event.category || "Concert",
      ticketTypes: event.ticketTypes || [
        { type: "VIP", price: "", quantity: "" },
        { type: "Regular", price: "", quantity: "" },
        { type: "Student", price: "", quantity: "" },
      ],
      image: "",
    });
  }
}, [event]);

if(loading){
        return <div className="flex justify-center mt-80"><span className="loading loading-bars loading-lg"></span></div>
    }
  const handleSubmit = async(e) => {
      e.preventDefault();
     setLoading(true)
  
    
   console.log("Event Object:", formData);
   
 const title=formData.title
        const date=formData.date
        const category=formData.category
        const ticketTypes=formData.ticketTypes
        const location=formData.location
        const description=formData.description
        const time=formData.time
   const image=formData.image
     const formData2 = new FormData();
formData2.append("image", image);
        const res=await axiosPublic.post(image_hosting_api,formData2,{
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
  };

    console.log(event)
    return (
         <div className="max-w-4xl mx-auto p-6 bg-white shadow border-2 rounded-lg border-black my-16 ">
      <h2 className="text-4xl font-bold mb-4 text-center">Update Event</h2>
      <form onSubmit={handleSubmit} className="space-y-">
            <label className="form-control w-full ">
  <div className="label">
    <span className="label-text text-black">Event Title</span>
  </div>
  <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
</label>
       
    <label className="form-control w-full ">
  <div className="label">
    <span className="label-text text-black">Event Description</span>
  </div>
 <textarea
          name="description"
          placeholder="Event Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
</label>
        
    <label className="form-control w-full ">
  <div className="label">
    <span className="label-text text-black">Event Location</span>
  </div>
  <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
</label>
       
    <label className="form-control w-full ">
  <div className="label">
    <span className="label-text text-black">Event Date</span>
  </div>
 <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
</label>
        
    <label className="form-control w-full ">
  <div className="label">
    <span className="label-text text-black">Event Time</span>
  </div>
  <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
</label>
       
    <label className="form-control w-full ">
  <div className="label">
    <span className="label-text text-black">Event Category</span>
  </div>
 <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option>Concert</option>
          <option>Conference</option>
          <option>Sports</option>
          <option>Others</option>
        </select>
</label>
        {/* Ticket Types */}
        <div>
          <h3 className="font-semibold text-black">Ticket Types</h3>
          {formData.ticketTypes.map((ticket, index) => (
            <div key={index} className="flex gap-2 mt-2">
              <input
                type="number"
                placeholder={`${ticket.type} Price`}
                value={ticket.price}
                onChange={(e) =>
                  handleTicketChange(index, "price", e.target.value)
                }
                className="p-2 border rounded w-1/2"
                required
              />
              <input
                type="number"
                placeholder={`${ticket.type} Quantity`}
                value={ticket.quantity}
                onChange={(e) =>
                  handleTicketChange(index, "quantity", e.target.value)
                }
                className="p-2 border rounded w-1/2"
                required
              />
            </div>
          ))}
        </div>
    <label className="form-control w-full ">
  <div className="label">
    <span className="label-text text-black">Event Image</span>
  </div>
  <input type="file"  onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} name="image" className="file-input file-input-bordered w-full " />
</label>
        <button
          type="submit"
          className="w-full bg-teal-600 text-white p-2 mt-4 rounded hover:bg-teal-700"
        >
          Update Event
        </button>
      </form>
    </div>
    );
};

export default UpdateEvents;

/*
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
*/