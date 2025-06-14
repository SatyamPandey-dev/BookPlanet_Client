import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css"; // Required for annotations and links
import "react-pdf/dist/Page/TextLayer.css";
import worker from "../../node_modules/pdfjs-dist/build/pdf.worker.min.mjs?url";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

pdfjs.GlobalWorkerOptions.workerSrc = worker;

const Bookdata = () => {
  const [book, setBook] = useState([]);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const { id } = useParams();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const goToPrevPage = () =>
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));

  const goToNextPage = () =>
    setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `bookplanetbackend-production.up.railway.app/api/getOne/books/${id}`
        );

        setBook(response.data.books);
      } catch (error) {
        console.error("Error fetching data:", error);
        setBook([]);
      }
    };

    fetchData();
  }, [id]);

  const skeletons = Array(1).fill(0);

  if (book.length === 0) {
    return (
      <div className="bg-black text-white flex justify-center items-center h-screen">
        <div
          // key={idx}
          className="book-card w-[250px] h-[460px] flex flex-col items-center justify-center bg-[#121212] border-none rounded-lg p-[25px] gap-[10px] shrink-0"
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
      </div>
    );
  }

  return (
    <div className="bg-black text-white flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold mb-8">Book Details</h1>

      {book.map((singleBook) => (
        <main
          key={singleBook.id || singleBook.title}
          className="flex flex-col w-full items-center"
        >
          <div className="bookdata flex flex-col sm:flex-row justify-center items-center h-auto sm:h-[500px] px-5 gap-5 mb-10">
            <div className="flex flex-col justify-center items-center ">
              <img
                src={singleBook.cover_url}
                alt={singleBook.title || "Book Cover"}
                className="object-cover h-[300px] w-[200px] rounded-lg border-sky-600 border-2"
              />
            </div>
            <div className="data flex flex-col items-center justify-center bg-[#121212] p-3 w-[80vw] sm:w-[60vw] sm:h-[300px] h-[700px] rounded-lg overflow-auto text-center text-wrap ">
              <h1 className="text-2xl font-semibold mb-2">
                Title: {singleBook.title}
              </h1>
              <section className="flex flex-col items-center justify-center h-36 overflow-auto mb-4">
                <span className="text-lg font-medium mb-2">Description</span>
                <p className="text-sm px-4">{singleBook.description}</p>
              </section>
              <h3 className="text-xl mb-4">Author: {singleBook.author}</h3>
              <div className="flex items-center justify-around px-1 gap-5 ">
                <Link to={`/summary/${singleBook.id}`}>
                  <button className="px-3 py-1 border border-sky-500 rounded-lg text-white hover:bg-sky-700 transition-colors">
                    Summary
                  </button>
                </Link>
                <Link to={`/summary/${singleBook.id}`}>
                  <button className="px-3 py-1 border border-sky-500 rounded-lg text-white hover:bg-sky-700 transition-colors">
                    Ask AI
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* --- PDF Viewer Section --- */}
          {/* This section now uses `singleBook.book_url` */}
          <div className="pdf-viewer-container bg-[#121212] p-5 rounded-lg w-[90vw] sm:w-[800px] max-w-full text-center">
            <h2 className="text-2xl font-bold mb-4">Read Book</h2>

            {singleBook.book_url ? (
              <>
                <nav className="mb-4">
                  <button
                    onClick={goToPrevPage}
                    disabled={pageNumber <= 1}
                    className="px-4 py-2 mr-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="text-lg font-medium">
                    Page {pageNumber} of {numPages || "--"}
                  </span>
                  <button
                    onClick={goToNextPage}
                    disabled={pageNumber >= numPages}
                    className="px-4 py-2 ml-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>

                <div
                  style={{
                    border: "1px solid #333",
                    backgroundColor: "#222",
                    height: "600px",
                    overflow: "auto",
                    display: "flex",
                  }}
                >
                  <Document
                    file={singleBook.book_url}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={console.error}
                  >
                    <Page
                      pageNumber={pageNumber}
                      width={750}
                      renderAnnotationLayer={true}
                      renderTextLayer={true}
                    />
                  </Document>
                </div>
              </>
            ) : (
              <p className="text-red-400">Book URL not available.</p>
            )}
          </div>
        </main>
      ))}
    </div>
  );
};

export default Bookdata;
