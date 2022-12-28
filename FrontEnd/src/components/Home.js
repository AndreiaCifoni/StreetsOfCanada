import React from "react";
import ActivityList from "./activities/ActivityList";

const Home = () => {
  return (
    <div className="mt-8 mx-16 bg-indigo-100 rounded">
      <div className="bg-[url('https://res.cloudinary.com/deiacifoni/image/upload/v1672176321/projects/StreetsOfCanada/streets_of_Canada_4_knnwxz.jpg')] mx-8 h-96">
        <h1 className="text-8xl font-bold text-center bg-orange-50/75 w-fit ">
          Streets Of Canada
        </h1>
      </div>
      <div className="w-2/3 mx-auto my-8">
        <p className="text-lg text-center">
          Streets of Canada is a website that has the perfect activity for you!
          This page is for anyone interested in posting or commenting about
          experiences throughout the city. If you enjoyed hiking in your
          neighborhood park, saw an artisan fair, or went through a beautiful
          graffiti wall, share your experiences with our community!
        </p>
      </div>
      <div className="bg-red-100">
        <h1 className="text-3xl font-bold mx-4">All Activities:</h1>
        <ActivityList />
      </div>
    </div>
  );
};

export default Home;
