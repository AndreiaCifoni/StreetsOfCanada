import React from "react";
import ActivityList from "./activities/ActivityList";

const Home = () => {
  return (
    <div className="mt-8 mx-16 bg-indigo-100 rounded py-2">
      <div className="flex justify-center items-center mx-8 my-4 h-96 bg-[url('https://res.cloudinary.com/deiacifoni/image/upload/v1672176321/projects/StreetsOfCanada/streets_of_Canada_4_knnwxz.jpg')]">
        <h1 className="inline-block text-center text-8xl xl:text-7xl lg:text-5xl md:w-1/2 sm:w-4/5 font-bold bg-orange-50/90 px-5 py-0.5 ">
          Streets Of Canada
        </h1>
      </div>
      <div className="w-2/3 lg:w-4/5 mx-auto my-12 lg:mb-0 ">
        <p className="text-xl lg:text-lg md:text-base  text-center">
          Streets of Canada is a website that has the perfect activity for you!
          This page is for anyone interested in post or review experiences
          throughout the city. If you enjoyed hiking in your neighborhood park,
          saw an artisan fair, or went through a beautiful graffiti wall, share
          your experiences with our community!
        </p>
      </div>
      <div className="mt-20">
        <h1 className="text-3xl lg:text-2xl font-bold my-2 mx-4">
          All Activities:
        </h1>
        <ActivityList />
      </div>
    </div>
  );
};

export default Home;
