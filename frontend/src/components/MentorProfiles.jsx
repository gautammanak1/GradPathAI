

const ProfilePage = () => {
  const data = {
    "name": "Gautam Manak",
    "profileImage": "path_to_image_or_url", // Replace with actual image path or URL
    "roles": [
      "Community Lead @Fetch.Ai",
      "Full Stack Engineer @KloudiDev Digital Solutions",
      "Community Lead @MeerutCodeHub"
    ],
    "services": [
      {
        "title": "Quick chat",
        "duration": "30 mins",
        "type": "Video Meeting",
        "price": "₹800+",
        "isPopular": true
      },
      {
        "title": "1:1 Mentorship",
        "duration": "30 mins",
        "type": "Video Meeting",
        "price": "₹800+",
        "isPopular": false
      },
      {
        "title": "Discovery Call",
        "duration": "15 mins",
        "type": "Video Meeting",
        "price": "₹0+",
        "isPopular": false
      },
      {
        "title": "Priority DM",
        "duration": "Replies in 2 days",
        "type": "Priority DM",
        "price": "₹0+",
        "isPopular": false
      }
    ],
    "about": "As a Full Stack Engineer at KloudiDev Digital Solutions, I contribute to the development of cutting-edge digital solutions, utilizing MERN stack technologies. I collaborate with team members to deliver high-quality software products within specified timelines. I implement responsive and user-friendly interfaces, ensuring a seamless user experience. Possess a strong foundation in front-end technologies such as Html, Css, React, Angular, and Firebase, coupled with expertise in backend development using Node.js and Express.js.",
    "socialLinks": {
      "linkedin": "https://www.linkedin.com/in/gautam-manak"
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-gray-200 p-6 rounded-lg shadow-lg">
        <div className="flex items-center">
          <img
            src={data.profileImage}
            alt={data.name}
            className="w-24 h-24 rounded-full"
          />
          <div className="ml-4">
            <h1 className="text-3xl font-bold">{data.name}</h1>
            <p className="text-gray-700">{data.roles.join(' || ')}</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Services</h2>
            <div className="flex space-x-2">
              <button className="px-4 py-2 border rounded-lg">All</button>
              <button className="px-4 py-2 border rounded-lg">1:1 Call</button>
              <button className="px-4 py-2 border rounded-lg">Priority DM</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {data.services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold">
                    {service.title} {service.isPopular && <span className="text-blue-500">Popular</span>}
                  </h3>
                  <p className="text-gray-500">{service.duration}</p>
                  <p className="text-gray-500">{service.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{service.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">About me</h2>
          <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" className="inline-block mt-2 text-blue-600">
            <svg
              className="w-6 h-6 inline-block"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11.034 19h-2.966v-10h2.966v10zm-1.483-11.326c-.948 0-1.717-.769-1.717-1.717s.769-1.717 1.717-1.717 1.717.769 1.717 1.717-.769 1.717-1.717 1.717zm12.517 11.326h-2.966v-5.355c0-1.276-.026-2.92-1.779-2.92-1.78 0-2.053 1.387-2.053 2.82v5.455h-2.966v-10h2.847v1.366h.039c.396-.75 1.364-1.545 2.808-1.545 3.001 0 3.557 1.974 3.557 4.54v5.639z"/>
            </svg>
          </a>
          <p className="mt-2 text-gray-700">{data.about}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
