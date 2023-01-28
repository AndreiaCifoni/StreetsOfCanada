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
    <div className="flex md:flex-col w-4/5 h-60 lg:h-72 md:h-96 my-2 mx-auto bg-orange-50 rounded shadow-md border-solid border-2 border-indigo-500">
      <div className="w-1/3 md:w-4/5 flex justify-center items-center bg-green-200">
        <img
          className="w-5/6 h-5/6 lg:h-3/5  object-cover rounded-md shadow-md "
          src={photo}
          alt={title}
        />
      </div>
      <div className="w-2/3 relative">
        <h1 className="text-3xl xl:text-2xl font-bold mt-4 relative">
          {title}
        </h1>
        <div className="flex justify-between">
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

        <p className="text-lg xl:text-base my-1">{description}</p>
        <Link
          className="xl:text-sm my-4 py-0.5 px-1.5 absolute right-4 bottom-2 rounded border-solid border-2 border-indigo-400 hover:border-violet-400 hover:bg-violet-300 shadow"
          to={`/activity/${activity_id}`}
        >
          See activity
        </Link>
      </div>
    </div>
  );
};

export default ActivityCard;
