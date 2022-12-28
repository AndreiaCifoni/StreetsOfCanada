import React from "react";
import ActivityList from "./activities/ActivityList";

const Home = () => {
  return (
    <div className="mt-8 mx-16 bg-indigo-100 rounded py-2">
      <div className="mx-8 my-4 h-96 bg-[url('https://res.cloudinary.com/deiacifoni/image/upload/v1672176321/projects/StreetsOfCanada/streets_of_Canada_4_knnwxz.jpg')]">
        <h1 className="inline-block my-36 mx-48 text-8xl font-bold bg-orange-50/90 px-5 py-0.5 ">
          Streets Of Canada
        </h1>
      </div>
      <div className="w-2/3 mx-auto my-12">
        <p className="text-lg text-center">
          Streets of Canada is a website that has the perfect activity for you!
          This page is for anyone interested in posting or commenting about
          experiences throughout the city. If you enjoyed hiking in your
          neighborhood park, saw an artisan fair, or went through a beautiful
          graffiti wall, share your experiences with our community!
        </p>
      </div>
      <div className="mt-20">
        <h1 className="text-3xl font-bold my-8 mx-4">All Activities:</h1>
        <ActivityList />
      </div>
    </div>
  );
};

export default Home;
