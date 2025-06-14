import React from "react";

const Footer = () => {
  return (
    <div className="flex bg-black w-screen gap-10 flex-wrap max-h-[600px] items-center justify-around px-5 py-2 text-white overflow-auto text-wrap min-h-[50px] ">
      <div className="flex flex-col">
        <img src="" alt="" className="rounded-lg" />
        <h1>This Website is devloped by SATYAM PANDEY</h1>
      </div>
      <h3>
        Github :{" "}
        <a href="https://shorturl.at/MoDck" target="blank">
          <span>Follow to Get updates</span>
        </a>
      </h3>
    </div>
  );
};

export default Footer;
