import React, { useState } from "react";
import { booksHandler } from "../dataHandler/booksHandler"; // make sure path is correct
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const [bookDetails, setBookDetails] = useState({
    title: "",
    description: "",
    author: "",
    publisher: "",
    book: null,
    cover: null,
  });
  const [loadding, setLoading] = useState(false);

  const navigate = useNavigate();

  const published_date = new Date().toISOString().split("T")[0];

  const formData = new FormData();
  formData.append("title", bookDetails.title);
  formData.append("description", bookDetails.description);
  formData.append("author", bookDetails.author);
  formData.append("publisher", bookDetails.publisher);
  formData.append("book", bookDetails.book);
  formData.append("cover", bookDetails.cover);
  formData.append("published_date", published_date);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await booksHandler(formData, navigate);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-black overflow-y-auto px-4 ">
      <h1 className="text-4xl font-bold mb-4">Add Book</h1>
      <form
        className="bg-black border border-sky-500 p-6 rounded-lg shadow-md sm:w-96 w-full flex flex-col gap-4"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <input
          type="text"
          placeholder="Title"
          className="p-2 rounded bg-[#121212] text-white"
          onChange={(e) =>
            setBookDetails({ ...bookDetails, title: e.target.value })
          }
          required
          maxLength={50}
        />
        <input
          type="text"
          placeholder="Description"
          className="p-2 rounded bg-[#121212] text-white"
          onChange={(e) =>
            setBookDetails({ ...bookDetails, description: e.target.value })
          }
          required
          maxLength={150}
        />
        <input
          type="text"
          placeholder="Author"
          className="p-2 rounded bg-[#121212] text-white"
          onChange={(e) =>
            setBookDetails({ ...bookDetails, author: e.target.value })
          }
          required
          maxLength={50}
        />
        <input
          type="text"
          placeholder="Publisher"
          className="p-2 rounded bg-[#121212] text-white"
          onChange={(e) =>
            setBookDetails({ ...bookDetails, publisher: e.target.value })
          }
          required
          maxLength={50}
        />
        <label>Upload Book File (PDF):</label>
        <input
          type="file"
          accept="application/pdf"
          className="custom-file-input"
          onChange={(e) =>
            setBookDetails({ ...bookDetails, book: e.target.files[0] })
          }
          required
        />
        <label>Upload Book Cover (Image):</label>
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          className="custom-file-input"
          onChange={(e) =>
            setBookDetails({ ...bookDetails, cover: e.target.files[0] })
          }
          required
        />

        {loadding ? (
          <div className="loader py-2 px-4 mx-auto "></div>
        ) : (
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition  "
          >
            Upload
          </button>
        )}
      </form>
    </div>
  );
};

export default AddBook;
