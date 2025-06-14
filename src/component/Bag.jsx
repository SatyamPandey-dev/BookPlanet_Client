import React, { useEffect, useRef } from "react";
import { BookImage } from "../utils";
import { gsap } from "gsap";

const Bag = () => {
  const cardRef = useRef(null);
  const welcomeRef = useRef(null);
  const paraRef = useRef(null);
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      cardRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
      }
    );
    tl.fromTo(
      welcomeRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
      }
    );

    // Then animate box-shadow
    tl.to(
      cardRef.current,
      {
        boxShadow:
          "0 0 20px white, 0 0 40px rgb(194, 189, 189), 0 0 80px rgb(59, 58, 58), 0 0 100px rgb(15, 15, 15)",
        duration: 1,
        ease: "power2.out",
      },
      "-=0.5"
    );

    tl.fromTo(
      paraRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-black py-20 gap-8 ">
      <div
        ref={cardRef}
        className="rounded-lg bg-white max-w-[180px] max-h-[255px]"
      >
        <img
          src={BookImage}
          alt="Book"
          className="border-none rounded-lg bg-cover bg-center object-cover object-center"
        />
      </div>

      <div
        className="welcome min-h-[100px] max-h-[400px] flex flex-col items-center justify-center "
        ref={welcomeRef}
      >
        <h1 className="font-mono font-extrabold text-2xl sm:text-5xl lg:text-7xl xl:text-8xl text-gray-300">
          Welcome To Book Planet
        </h1>
      </div>

      <p ref={paraRef} className="text-gray-600 mt-2">
        Read different types of book here
      </p>
    </div>
  );
};

export default Bag;
