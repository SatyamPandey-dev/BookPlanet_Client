import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aiImage, booksImg, bookSummary, uploadImg } from "../utils/index.js";

gsap.registerPlugin(ScrollTrigger);

const Overview = () => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const firstCardRef = useRef(null);

  useEffect(() => {
    const cards = gsap.utils.toArray(".card");
    const firstCard = firstCardRef.current;

    if (!sectionRef.current || !firstCard || cards.length === 0) {
      console.warn("Refs not ready or no cards found.");
      return;
    }

    gsap.to(cards, {
      xPercent: -100 * (cards.length - 1),
      ease: "none",

      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,

        end: () => {
          let totalContentWidth = 0;
          cards.forEach((card) => {
            totalContentWidth += card.offsetWidth + 20;
          });

          return `+=${totalContentWidth - window.innerWidth + 40}`;
        },
        snap: 1 / (cards.length - 1),
      },
    });

    // --- First Card Opacity Animation ---
    gsap.to(firstCard, {
      opacity: 0.0,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",

        end: () => `+=${firstCard.offsetWidth * 5}`,
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <main className="w-full bg-[#121212] text-white overflow-x-hidden">
      <section
        ref={sectionRef}
        className="flex min-h-screen items-center relative"
      >
        <div
          ref={containerRef}
          className="flex min-w-max justify-start items-center gap-5 px-20 flex-nowrap"
          style={{ position: "relative", zIndex: 5 }}
        >
          <div
            ref={firstCardRef}
            className="card flex justify-center items-center w-[70vw] sm:w-[300px] lg:w-[350px] xl:w-[600px] h-[600px] bg-gray-700 rounded-lg flex-shrink-0 opacity-0"
            style={{
              position: "absolute",
              top: "50%",
              left: "20px",
              transform: "translateY(-50%)",
              zIndex: 10,
              pointerEvents: "none",
            }}
          >
            <h1 className="font-bold font-mono text-3xl text-center text-wrap ">
              Features to Explore
            </h1>
          </div>

          <div
            className="flex-shrink-0"
            style={{
              width: "calc(20px + var(--fixed-card-width-xl, 600px) + 20px)",

              height: "1px",
            }}
          ></div>

          <div className=" flex flex-col gap-2 items-center justify-around card w-[70vw] sm:w-[300px] lg:w-[350px] xl:w-[400px] h-[400px] bg-black border border-sky-400 rounded-lg flex-shrink-0">
            <img
              src={booksImg}
              alt="books "
              className="w-[130px] h-[130px] rounded-full relative card_img  hoverImg"
            />
            <div className="flex items-center justify-center text-center text-white text-2xl font-mono h-[60%]">
              <h1>
                Read <br />
                <span>
                  Your Favourite <br />
                  Books
                </span>
              </h1>
            </div>
          </div>
          <div className=" flex flex-col gap-2 items-center justify-around card w-[70vw] sm:w-[300px] lg:w-[350px] xl:w-[400px] h-[400px] bg-black border border-sky-400 rounded-lg flex-shrink-0">
            <img
              src={bookSummary}
              alt="books "
              className="w-[130px] h-[130px] rounded-full relative card_img  hoverImg"
            />
            <div className="flex items-center justify-center text-center text-white text-2xl font-mono h-[60%]">
              <h1>
                Get <br />
                <span>
                  Books Summary In <br />
                  Oneclick
                </span>
              </h1>
            </div>
          </div>
          <div className=" flex flex-col gap-2 items-center justify-around card w-[70vw] sm:w-[300px] lg:w-[350px] xl:w-[400px] h-[400px] bg-black border border-sky-400 rounded-lg flex-shrink-0">
            <img
              src={aiImage}
              alt="books "
              className="w-[130px] h-[130px] rounded-full relative card_img hoverImg"
            />
            <div className="flex items-center justify-center text-center text-white text-2xl font-mono h-[60%]">
              <h1>
                Ask <br />
                <span>
                  Question With <br />
                  Ai
                </span>
              </h1>
            </div>
          </div>
          <div className=" flex flex-col gap-2 items-center justify-around card w-[70vw] sm:w-[300px] lg:w-[350px] xl:w-[400px] h-[400px] bg-black border border-sky-400 rounded-lg flex-shrink-0">
            <img
              src={uploadImg}
              alt="books "
              className="w-[130px] h-[130px] rounded-full relative card_img hoverImg"
            />
            <div className="flex items-center justify-center text-center text-white text-2xl font-mono h-[60%]">
              <h1>
                Add <br />
                <span>
                  Your Books <br />
                  Here
                </span>
              </h1>
            </div>
          </div>

          <div className="card w-[70vw] sm:w-[300px] lg:w-[350px] xl:w-[400px] h-[400px] bg-red-950 rounded-lg flex-shrink-0 opacity-0">
            <h1>Card 5</h1>
          </div>
          <div className="card w-[70vw] sm:w-[300px] lg:w-[350px] xl:w-[400px] h-[400px] bg-red-950 rounded-lg flex-shrink-0 opacity-0">
            <h1>Card 5</h1>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Overview;
