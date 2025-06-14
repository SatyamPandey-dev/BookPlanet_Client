import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { leftExit } from "../utils";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BookSummary = () => {
  const [book, setBook] = useState([]);
  const [summary, setSummary] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://bookplanetbackend-production.up.railway.app/api/getOne/books/${id}`
        );
        setBook(response.data.books);
      } catch (error) {
        console.error("Error fetching data:", error);
        setBook([]);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const sendSummaryRequest = async (bookUrl) => {
      try {
        const response = await axios.post(
          "https://bookplanetbackend-production.up.railway.app/api/action",
          {
            bookUrl,
            queryType: "summary",
          }
        );
        setSummary(response.data.result);
        setMessages([{ from: "bot", text: response.data.result }]);
      } catch (error) {
        console.error("Summary error:", error.message);
      }
    };

    if (book.length > 0 && book[0].book_url) {
      sendSummaryRequest(book[0].book_url);
    }
  }, [book]);

  const sendQuestion = async () => {
    if (!input.trim() || book.length === 0) return;

    const userQuestion = input.trim();
    const bookUrl = book[0].book_url;

    setMessages((prev) => [
      ...prev,
      { from: "user", text: userQuestion },
      { from: "bot", text: "...", isLoading: true }, // Temporary loading message
    ]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://bookplanetbackend-production.up.railway.app/api/action",
        {
          bookUrl,
          queryType: "question",
          question: userQuestion,
        }
      );

      const aiReply =
        response.data?.result ||
        "Sorry, something went wrong. Retry after 2 min.";

      setMessages((prev) => {
        const updated = [...prev];
        const loadingIndex = updated.findIndex(
          (msg) => msg.from === "bot" && msg.isLoading
        );
        if (loadingIndex !== -1) {
          updated[loadingIndex] = { from: "bot", text: aiReply };
        }
        return updated;
      });
    } catch (error) {
      console.error("Question error:", error.message);
      setMessages((prev) => {
        const updated = [...prev];
        const loadingIndex = updated.findIndex(
          (msg) => msg.from === "bot" && msg.isLoading
        );
        if (loadingIndex !== -1) {
          updated[loadingIndex] = {
            from: "bot",
            text: "Error communicating with server. Retry after 2 min.",
          };
        }
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendQuestion();
    }
  };

  if (book.length === 0) {
    return (
      <div className="bg-black text-white flex justify-center items-center w-screen h-screen">
        <div className="w-[70%] h-[460px] flex flex-col items-baseline bg-[#121212] border-none rounded-lg p-[25px] gap-10 shrink-0">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="w-[100%] flex justify-between">
              <Skeleton
                height={40}
                width={"40vw"}
                baseColor="#2e2828"
                highlightColor="#878383"
              />
              <Skeleton
                height={22}
                width={"10vw"}
                baseColor="#2e2828"
                highlightColor="#878383"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col mx-auto h-screen w-screen border border-black border-b-[#121212] rounded shadow bg-black text-white justify-center items-center">
      <div className="flex gap-5 p-4 border-b border-gray-800 w-screen items-center">
        <Link to={"/"}>
          <img src={leftExit} alt="exit" className="w-10 h-10 invert" />
        </Link>
        <h1 className="text-2xl font-bold mb-1">📘 Book Summary</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 px-[10%] xl:px-[20%]">
        {messages.length === 0 && (
          <p className="text-gray-400">Loading summary or ask a question...</p>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-2xl whitespace-pre-wrap text-base leading-relaxed shadow-sm ${
                msg.from === "user"
                  ? "bg-[#080f20] text-white rounded-tr-none"
                  : "bg-[#1a1919] text-gray-100 rounded-tl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendQuestion();
        }}
        className="p-4 border-t border-gray-800 bg-black flex gap-2 w-screen justify-center"
      >
        <textarea
          rows={1}
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          className="flex-1 resize-none p-3 bg-[#1a1919] text-white border border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-[600px]"
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-5 rounded-2xl font-semibold text-white ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default BookSummary;
