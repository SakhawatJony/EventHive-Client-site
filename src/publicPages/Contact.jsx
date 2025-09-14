

import bg from '../assets/banner/5.jpg'
import useTitle from '../customHook/useTitle';

const Contact = () => {
   useTitle('EventHive | Contact')
  return (
    <div className="space-y-16">

      {/* Hero Banner */}
      <div className="relative h-[300px] md:h-[400px]">
        <img
          src={bg}
          alt="Contact Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
            Contact EventHive
          </h1>
          <p className="mt-3 text-lg md:text-xl max-w-2xl drop-shadow-md">
            We'd love to hear from you! Send us a message or reach out directly.
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <section className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-8">
          Get in Touch
        </h2>
        <form className="bg-white shadow-lg rounded-xl p-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <textarea
            placeholder="Your Message"
            rows={5}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Contact Info */}
      <section className="max-w-5xl mx-auto px-4 text-center space-y-8">
        <h2 className="text-3xl font-bold text-blue-600">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          <div className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 transform transition duration-300">
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p>support@eventhive.com</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 transform transition duration-300">
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p>+1 234 567 890</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 transform transition duration-300">
            <h3 className="text-xl font-semibold mb-2">Address</h3>
            <p>123 Event St, Celebration City, USA</p>
          </div>
        </div>
      </section>

      {/* Optional Map */}
      <section className="max-w-6xl mx-auto px-4">
        <iframe
          title="EventHive Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019725184084!2d-122.41941518468129!3d37.77492977975933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064c93bbf0b%3A0x6b7c5261c0db17c6!2sSan+Francisco%2C+CA%2C+USA!5e0!3m2!1sen!2sbd!4v1702391628452!5m2!1sen!2sbd"
          className="w-full h-80 md:h-96 rounded-xl shadow-lg"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </section>
    </div>
  );
};

export default Contact;
