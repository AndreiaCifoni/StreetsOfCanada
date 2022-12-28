import React from "react";

const ActivityCard = () => {
  return (
    <div className="flex w-4/5 h-64 mx-auto">
      <div className="w-1/3 bg-red-100 ">
        <img
          className="w-72 h-56 object-cover rounded-md shadow-md"
          src="https://res.cloudinary.com/deiacifoni/image/upload/v1647890734/samples/landscapes/nature-mountains.jpg"
          alt="title"
        />
      </div>
      <div className="w-2/3 bg-green-100 relative">
        <h1 className="text-3xl font-bold my-4 relative">
          Activity Title
          <span className="text-lg"> - City</span>
          <span className="text-base absolute right-4">Tag1 Tag2 Tag3</span>
        </h1>
        <p className="text-lg my-1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla egestas
          libero id lorem vulputate, quis sagittis leo luctus. Praesent eu
          fringilla leo. Vestibulum augue sapien, euismod vel malesuada in,
          pharetra ac nisl. Nulla facilisi. Pellentesque cursus molestie
          venenatis. Nam eu tellus risus. Maecenas non velit tellus.
        </p>
        <button className="mb-4 py-0.5 px-1.5 absolute right-4 rounded border-solid border-2 border-indigo-400 hover:border-violet-400 hover:bg-violet-300 shadow">
          See activity
        </button>
      </div>
    </div>
  );
};

export default ActivityCard;
