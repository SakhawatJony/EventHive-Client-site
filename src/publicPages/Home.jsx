
import useTitle from '../customHook/useTitle';
import Banner from '../shared/Banner';

const Home = () => {
     useTitle('EventHive | Home')
    return (
        <div>
           <Banner></Banner>
        </div>
    );
};

export default Home;