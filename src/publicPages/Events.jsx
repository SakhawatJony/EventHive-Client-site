import { useEffect, useState } from "react";
import useEvents from "../customHook/useEvents";
import useAxiosPublic from "../customHook/useAxiosPublic";
import '../App.css'
import { Link } from "react-router-dom";
import useTitle from "../customHook/useTitle";
const Events = () => {
    useTitle('EventHive | Events')
  const [events] = useEvents();
  const[eventsPagination,setEventsPagination]=useState([])
 const [currentPage,setCurrentPage]=useState(0)
  const [selectedEvent, setSelectedEvent] = useState(null);
   const[loading,setLoading]=useState(false)
  const axiosPublic=useAxiosPublic()
  
  const count=events.length
  const itemsPerPage=9;
  const numberOfPages=Math.ceil(count/itemsPerPage)
  const pages=[];
  for(let i=0;i<numberOfPages;i++){
    pages.push(i)
  }
  console.log(count,typeof(count),pages)
  useEffect(()=>{
    setLoading(true)
    axiosPublic.get(`/events/pagination?page=${currentPage}&size=${itemsPerPage}`)
    .then(res=>{
setEventsPagination(res.data)
setLoading(false)
    })
  },[currentPage])
  if(loading){
        return <div className="flex justify-center pt-72 pb-12"><span className="loading loading-bars loading-lg"></span></div>
    }
  const handlePrevPage=()=>{
    if(currentPage>0){
        setCurrentPage(currentPage-1)
    }
  }
  const handleNextPage=()=>{
    if(currentPage<pages.length-1){
        setCurrentPage(currentPage+1)
    }
  }
  const openModal = (event) => {
    setSelectedEvent(event);
    document.getElementById("my_modal").showModal();
  };

  return (
    <div className="pt-32 pb-12">
    
      <div className="grid grid-cols-3 gap-8">
        {eventsPagination.map((event) => (
          <div key={event._id} className="card bg-base-100 w-full  shadow-xl">
            <figure>
              <img src={event?.image} alt={event?.title} className="h-48 w-full" />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-3xl">{event?.title}</h2>
              <h2 className="card-title text-2xl">Category : {event?.category}</h2>
              <h2 className="card-title">Location : {event?.location}</h2>
              <div className="flex gap-6 justify-between ">
                <button
                  className="btn btn-accent flex-1"
                  onClick={() => openModal(event)}
                >
                  Show Details
                </button>
            <Link to={`/bookEvents/${event?._id}`}>    <button className="btn btn-primary flex-1"
                  >Book Now</button></Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <dialog id="my_modal" className="modal">
        <div className="modal-box">
          {selectedEvent && (
            <>
             <img className="w-full h-48 mb-2" src={selectedEvent?.image} alt="" />
              <h3 className="font-bold text-2xl mb-2">{selectedEvent?.title}</h3>
              <p className="mb-2"><b>Category:</b> {selectedEvent?.category}</p>
              <p className="mb-2"><b>Location:</b> {selectedEvent?.location}</p>
              <p className="mb-2"><b>Date:</b> {selectedEvent?.date}</p>
              <p className="mb-2"><b>Time:</b> {selectedEvent?.time}</p>
              <p className="mb-2">{selectedEvent?.description}</p>
            </>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
 

      {/* Pagination Part*/}
      <div className="pagination">
        <button className="btn btn-primary" onClick={handlePrevPage}>Prev</button>
        {
            pages.map(page=><button  className={currentPage===page?'selected':undefined} onClick={()=>setCurrentPage(page)} key={page}>{page}</button>)
        }
         <button className="btn btn-primary" onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default Events;
