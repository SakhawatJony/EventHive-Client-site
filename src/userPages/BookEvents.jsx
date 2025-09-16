import { useLoaderData } from "react-router-dom";


const BookEvents = () => {
    const event=useLoaderData()
    return (
        <div className="pt-32">
          <img src={event?.image} className="w-3/4 mx-auto h-72 rounded-xl" alt="" />
          <h3 className="text-center text-4xl font-bold my-2">{event?.title}</h3>
          <h3  className="text-center text-4xl font-semibold text-blue-500 mt-4 mb-12">Book Now For Joining with {event?.category}</h3>
          <div className="text-xl border-2 border-black rounded-xl p-4">
            <div className="flex items-center justify-between">
                <h2 className="font-bold">VIP Ticket</h2>
                <h2>VIP Ticket Price : <span className="font-semibold">{event?.ticketTypes[0]?.price}</span></h2>
                <h3>Available VIP Ticket : <span className="font-semibold">{event?.ticketTypes[0]?.quantity}</span></h3>
                <button className="btn btn-primary w-48">Book VIP Ticket</button>
            </div>
            <div className="flex items-center justify-between my-4">
                <h2  className="font-bold">Regular Ticket</h2>
                <h2>Regular Ticket Price : <span className="font-semibold">{event?.ticketTypes[1]?.price}</span></h2>
                <h3>Available Regular Ticket : <span className="font-semibold">{event?.ticketTypes[1]?.quantity}</span></h3>
                <button className="btn btn-primary w-48">Book Regular Ticket</button>
            </div>
            <div className="flex items-center justify-between">
                <h2  className="font-bold">Student Ticket</h2>
                   <h2>Student Ticket Price : <span className="font-semibold">{event?.ticketTypes[2]?.price}</span></h2>
                <h3>Available Student Ticket : <span className="font-semibold">{event?.ticketTypes[2]?.quantity}</span></h3>
                <button className="btn btn-primary w-48">Book Student Ticket</button>
            </div>
          </div>
        </div>
    );
};

export default BookEvents;