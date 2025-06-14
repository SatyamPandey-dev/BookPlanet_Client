import React, { useState } from "react";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className=" bg-transparent sticky top-0 text-white flex justify-around sm:justify-between sm:px-5 py-3 z-10 w-screen">
      <div className="font-bold flex  fontrobo py-2 ">
        <Link to={"/"}>
          <div className="text-white">
            Book
            <span className="text-sky-300 fontplaypen">Planet</span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
