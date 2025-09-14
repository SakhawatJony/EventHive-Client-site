
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import bg1 from '../assets/banner/1.jpg'
import bg2 from '../assets/banner/2.jpg'
import bg3 from '../assets/banner/3.jpg'
import bg4 from '../assets/banner/4.jpg'
import bg5 from '../assets/banner/5.jpg'
import bg6 from '../assets/banner/6.jpg'
import bg7 from '../assets/banner/7.jpg'
const Banner = () => {
    return (
        <div >
              <div className="relative">
                <Carousel>
                <div>
                    <img src={bg1}  />
                </div>
                  <div>
                    <img src={bg2} />
                </div>
                  <div>
                    <img src={bg3} />
                </div>
                   <div>
                    <img src={bg1} />
                </div>
                   <div>
                    <img src={bg4} />
                </div>
                   <div>
                    <img src={bg5} />
                </div>
                   <div>
                    <img src={bg6} />
                </div>
                    <div>
                    <img src={bg7} />
                </div>
                 </Carousel>
              </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/40 text-white max-w-6xl max-h-screen  mx-auto px-4">
    <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
      🎉 Welcome to EventHive
    </h1>
    <p className="mt-3 text-lg md:text-xl max-w-2xl">
      Discover, book, and enjoy amazing events happening around you.  
      Your one-stop hub for concerts, conferences, and celebrations!
    </p>
    <button className="mt-6 px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-xl text-white font-semibold shadow-lg">
      Explore Events
    </button>
  </div>
           
        </div>
    );
};

export default Banner;