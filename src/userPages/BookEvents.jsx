import { useLoaderData, useParams } from "react-router-dom";
import useAxiosPublic from "../customHook/useAxiosPublic";
import useEvents from "../customHook/useEvents";
import useEvent from "../customHook/useEvent";
import Swal from "sweetalert2";
import useAuth from "../customHook/useAuth";

const BookEvents = () => {
    const eventLoad=useLoaderData()
  const [event,refetch]=useEvent(eventLoad._id)
    const axiosPublic=useAxiosPublic()
    const {user}=useAuth()
    const handleBookVipTicket=(event)=>{
        if(event?.ticketTypes[0]?.quantity){
 const title=event?.title
        const category=event?.category
        const type=event?.ticketTypes[0]?.type
        const price=event?.ticketTypes[0]?.price
        const vipTicketData={title,category,type,price,email:user?.email}
        console.log(vipTicketData)
        axiosPublic.get(`/events/${event?._id}`)
        .then(res=>{
            const remainingQuantity=parseInt(res.data.ticketTypes[0].quantity)-1
            const vipData={vip:remainingQuantity}
            axiosPublic.patch(`/events/vip/${event?._id}`,vipData)
            .then(res=>{
          console.log(res.data)
          axiosPublic.post('/bookedEvents',vipTicketData)
          .then(res=>{
            if(res.data){
                Swal.fire({
  position: "center",
  icon: "success",
  title: `VIP Ticket is Selected SuccessFully`,
  showConfirmButton: false,
  timer: 2000
});
 refetch()
            }
          })
        
            })
        })
        }
       
    }
      const handleBookRegularTicket=(event)=>{
        if(event?.ticketTypes[1]?.quantity){
 const title=event?.title
        const category=event?.category
        const type=event?.ticketTypes[1]?.type
        const price=event?.ticketTypes[1]?.price
        const regularTicketData={title,category,type,price,email:user?.email}
        console.log(regularTicketData)
         axiosPublic.get(`/events/${event?._id}`)
        .then(res=>{
            const remainingQuantity=parseInt(res.data.ticketTypes[1].quantity)-1
            const regularData={regular:remainingQuantity}
            axiosPublic.patch(`/events/regular/${event?._id}`,regularData)
            .then(res=>{
          console.log(res.data)
          axiosPublic.post('/bookedEvents',regularTicketData)
          .then(res=>{
            if(res.data){
                Swal.fire({
  position: "center",
  icon: "success",
  title: `Regular Ticket is Selected SuccessFully`,
  showConfirmButton: false,
  timer: 2000
});
 refetch()
            }
          })
        
            })
        })
        }
       
    }
      const handleBookStudentTicket=(event)=>{
         if(event?.ticketTypes[2]?.quantity){
  const title=event?.title
        const category=event?.category
        const type=event?.ticketTypes[2]?.type
        const price=event?.ticketTypes[2]?.price
        const studentTicketData={title,category,type,price,email:user?.email}
        console.log(studentTicketData)
           axiosPublic.get(`/events/${event?._id}`)
        .then(res=>{
            const remainingQuantity=parseInt(res.data.ticketTypes[2].quantity)-1
            const studentData={student:remainingQuantity}
            axiosPublic.patch(`/events/student/${event?._id}`,studentData)
            .then(res=>{
          console.log(res.data)
          axiosPublic.post('/bookedEvents',studentTicketData)
          .then(res=>{
            console.log('Ticket Pendamic :',res.data)
            if(res.data){
                Swal.fire({
  position: "center",
  icon: "success",
  title: `Student Ticket is Selected SuccessFully`,
  showConfirmButton: false,
  timer: 2000
});
 refetch()
            }
          })
        
            })
        })
         }
      
    }
    return (
        <div className="pt-32 pb-12">
          <img src={event?.image} className="w-3/4 mx-auto h-72 rounded-xl" alt="" />
          <h3 className="text-center text-4xl font-bold my-2">{event?.title}</h3>
          <h3  className="text-center text-4xl font-semibold text-blue-500 mt-4 mb-12">Book Now For Joining with {event?.category}</h3>
          <div className="text-xl border-2 border-black rounded-xl p-4">
            <div className="flex items-center justify-between">
                <h2 className="font-bold">VIP Ticket</h2>
                <h2>VIP Ticket Price : <span className="font-semibold">{event?.ticketTypes[0]?.price}</span></h2>
                <h3>Available VIP Ticket : <span className="font-semibold">{event?.ticketTypes[0]?.quantity}</span></h3>
                <button onClick={()=>handleBookVipTicket(event)} className="btn btn-primary w-48">Book VIP Ticket</button>
            </div>
            <div className="flex items-center justify-between my-4">
                <h2  className="font-bold">Regular Ticket</h2>
                <h2>Regular Ticket Price : <span className="font-semibold">{event?.ticketTypes[1]?.price}</span></h2>
                <h3>Available Regular Ticket : <span className="font-semibold">{event?.ticketTypes[1]?.quantity}</span></h3>
                <button onClick={()=>handleBookRegularTicket(event)} className="btn btn-primary w-48">Book Regular Ticket</button>
            </div>
            <div className="flex items-center justify-between">
                <h2  className="font-bold">Student Ticket</h2>
                   <h2>Student Ticket Price : <span className="font-semibold">{event?.ticketTypes[2]?.price}</span></h2>
                <h3>Available Student Ticket : <span className="font-semibold">{event?.ticketTypes[2]?.quantity}</span></h3>
                <button onClick={()=>handleBookStudentTicket(event)} className="btn btn-primary w-48">Book Student Ticket</button>
            </div>
          </div>
        </div>
    );
};

export default BookEvents;