import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Home = () => {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/get/books");
        setBook(response.data.books);
        if (response.data.books.length > 0) {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  });

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const skeletons = Array(5).fill(0);

  return (
    <div className="relative flex flex-col items-center justify-around w-screen h-screen bg-black">
      <h1 className="text-4xl font-bold mb-4 pt-3 text-white">Book Store</h1>

      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#e5ebe5a1] text-black px-3 py-2 rounded-md z-10 shadow-md hover:bg-gray-200 invisible sm:visible"
        onClick={scrollLeft}
      >
        ◀
      </button>

      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#e5ebe5a1] text-black px-3 py-2 rounded-md z-10 shadow-md hover:bg-gray-200 invisible sm:visible"
        onClick={scrollRight}
      >
        ▶
      </button>

      <div
        ref={scrollRef}
        className="flex gap-5 w-[80vw] px-5 bg-gray-950 rounded-lg overflow-x-scroll snap-x snap-proximity thin-scrollbar py-[25px]"
      >
        {loading
          ? skeletons.map((_, idx) => (
              <div
                key={idx}
                className="book-card w-[250px] h-[460px] flex flex-col items-center justify-center bg-[#121212] border border-sky-500 rounded-lg p-[25px] gap-[10px] shrink-0"
              >
                <Skeleton
                  height={300}
                  width={200}
                  baseColor="#2e2828"
                  highlightColor="#878383"
                />
                <Skeleton
                  height={24}
                  width={180}
                  baseColor="#2e2828"
                  highlightColor="#878383"
                />
                <Skeleton
                  height={20}
                  width={140}
                  baseColor="#2e2828"
                  highlightColor="#878383"
                />
              </div>
            ))
          : book.map((book) => (
              <Link to={`/book/${book.id}`} key={book.id}>
                <div className="book-card w-[250px] h-[460px] flex flex-col items-center justify-center text-wrap text-center bg-[#121212] border border-sky-500 rounded-lg overflow-hidden py-[25px] gap-[10px] shrink-0 grow-0 cursor-pointer">
                  <img
                    src={book.cover_url}
                    alt={book.title}
                    className="object-cover h-[300px] w-[200px] rounded-lg border-sky-600 border-2"
                  />
                  <div className="txt flex flex-col items-center justify-end text-center text-wrap gap-[2px]">
                    <h2 className="text-2xl font-semibold text-white">
                      {book.title}
                    </h2>
                    <p className="text-gray-400 mb-2">Author: {book.author}</p>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default Home;
