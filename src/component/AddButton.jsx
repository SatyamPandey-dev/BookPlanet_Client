import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddButton = () => {
  const [hover, setHover] = useState("");
  return (
    <div
      className={`  flex justify-center items-center text center w-screen h-screen bg-black ${
        hover ? "addBt-con-glowslow" : " "
      } `}
    >
      <Link to={"/add"}>
        <button
          className="bg-white hover:bg-[#c8d1c8] text-black py-2 px-4 rounded-md w-60 h-20 sm:w-[300px] sm:h-[120px] lg:w-[500px] lg:h-[200px] lg:text-5xl font-mono font-thin addBt "
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Add Book
        </button>
      </Link>
    </div>
  );
};

export default AddButton;
