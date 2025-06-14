// src/dataHandler/booksHandler.js
import axios from "axios";
import { toast } from "react-hot-toast";

export const booksHandler = async (formData, navigate) => {
  const title = formData.get("title");
  const description = formData.get("description");
  const author = formData.get("author");
  const publisher = formData.get("publisher");
  const book = formData.get("book");
  const cover = formData.get("cover");

  if (!title || !description || !author || !publisher || !book || !cover) {
    toast.error("Please fill all fields");
    return;
  }

  if (book.size > 4 * 1024 * 1024) {
    toast.error("Book file size exceeds 4MB");
    return;
  }

  if (cover.size > 2 * 1024 * 1024) {
    toast.error("Cover file size exceeds 2MB");
    return;
  }

  if (book.type !== "application/pdf") {
    toast.error("Book file must be a PDF");
    return;
  }

  if (!cover.type.startsWith("image/")) {
    toast.error("Cover file must be an image");
    return;
  }

  try {
    const response = await axios.post(
      "https://bookplanetbackend-production.up.railway.app/api/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      toast.success("Book uploaded successfully");
      navigate("/"); // Redirect to home page or any other page
    }
  } catch (error) {
    console.error("Upload failed: ", error);
    toast.error("Error uploading book");
  }
};
