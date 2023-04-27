import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const ActivityCard = ({
  activity_id,
  photo,
  title,
  city,
  tags,
  description,
  province,
}) => {
  return (
    <div className="flex md:flex-col w-4/5 h-60 lg:h-72 md:h-4/5 my-2 mx-auto md:py-4 bg-orange-50 rounded shadow-md border-solid border-2 border-indigo-500">
      <Link to={`/activity/${activity_id}`}>
        <div className="w-1/3 md:w-full flex justify-center items-center">
          <img
            className="w-5/6 h-5/6 lg:h-3/5 md:h-5/6  object-cover rounded-md shadow-md "
            src={photo}
            alt={title}
          />
        </div>
        <div className="w-2/3 md:w-full md:px-4 relative md:flex-row">
          <h1 className="text-3xl xl:text-2xl font-bold mt-4 relative">
            {title}
          </h1>
          <div className="flex sm:flex-col justify-between">
            <span className="block text-lg xl:text-base">
              {" "}
              - {city}/{province}
            </span>
            <div className="text-base xl:text-sm flex gap-2 last:mr-4">
              {tags.map((tag) => {
                return (
                  <span
                    key={uuidv4()}
                    className={
                      tag === "nature"
                        ? "bg-emerald-200"
                        : tag === "city"
                        ? "bg-gray-200"
                        : tag === "lake/beach"
                        ? "bg-cyan-200"
                        : "bg-orange-200"
                    }
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
          <p className="text-lg xl:text-base my-1 md:mt-4 ">{description}</p>
          See activity
        </div>
      </Link>
    </div>
  );
};

export default ActivityCard;
