import useTitle from "../customHook/useTitle";


const About = () => {
   useTitle('EventHive | About')
    return (
        <div className="pt-36 pb-6">
                {/* Our Mission */}
      <section className="max-w-5xl mx-auto px-4 text-center space-y-4 ">
        <h2 className="text-3xl font-bold text-blue-600 ">Our Mission</h2>
        <p className="text-gray-700 text-lg md:text-xl">
          EventHive aims to bring people together by making it easy to find,
          book, and enjoy events of all kinds—from concerts and conferences to
          workshops and local festivals.
        </p>
      </section>

      {/* Our Vision */}
      <section className="max-w-5xl mx-auto px-4 text-center space-y-4">
        <h2 className="text-3xl font-bold text-blue-600">Our Vision</h2>
        <p className="text-gray-700 text-lg md:text-xl">
          To be the leading platform where event-goers and organizers connect
          seamlessly, creating unforgettable experiences for everyone.
        </p>
      </section>
           <section className="bg-blue-600 text-white py-12 text-center px-4 mt-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to discover your next event?
        </h2>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
          Join EventHive today and never miss out on amazing experiences around you!
        </p>
        <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition">
          Explore Events
        </button>
      </section>
        </div>
    );
};

export default About;