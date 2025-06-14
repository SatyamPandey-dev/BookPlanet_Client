import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddBook from "./component/AddBook.jsx";
import Home from "./component/Home.jsx";
import Bag from "./component/Bag.jsx";
import Navbar from "./component/Navbar.jsx";
import Overview from "./component/Overview.jsx";
import Bookdata from "./component/Bookdata.jsx";
import BookSummary from "./component/BookSummary.jsx";
import AddButton from "./component/AddButton.jsx";
import Footer from "./component/Footer.jsx";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/book/:id"
          element={
            <>
              <Navbar />
              <Bookdata />
              <Footer />
            </>
          }
        />
        <Route
          path="/summary/:id"
          element={
            <>
              <BookSummary />
            </>
          }
        />
        <Route
          path="/add"
          element={
            <>
              <Toaster position="top-right" reverseOrder={false} />
              <Navbar />
              <AddBook />
              <Footer />
            </>
          }
        />

        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Bag />
              <Overview />
              <Home />
              <AddButton />
              <Footer />
            </>
          }
        />
        <Route path="/add" element={<AddBook />} />
      </Routes>
    </Router>
  );
};

export default App;
