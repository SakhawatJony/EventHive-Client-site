import useEvents from "../customHook/useEvents";

const ManageEvents = () => {
    const[events]=useEvents()
    console.log('Manage Events',events)
    return (
        <div>
            <h3>Manage Events : {events?.length}</h3>
        </div>
    );
};

export default ManageEvents;