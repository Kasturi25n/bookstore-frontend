"use client";

import { useEffect, useState } from "react";

const API = "http://localhost:5000";

export default function Home() {
  const [books, setBooks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  // Fetch all books
  const fetchBooks = async () => {
    const res = await fetch(`${API}/books`);
    const data = await res.json();

    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Add or Update Book
  const addBook = async () => {
    if (!title || !author || !price) {
      alert("Please fill all fields");
      return;
    }

    // EDIT MODE
    if (editId !== null) {
      await fetch(`${API}/books/${editId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          author,
          price,
        }),
      });

      setEditId(null);
    }

    // ADD MODE
    else {
      await fetch(`${API}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          author,
          price,
        }),
      });
    }

    // Clear inputs
    setTitle("");
    setAuthor("");
    setPrice("");

    fetchBooks();
  };

  // Delete Book
  const deleteBook = async (id: number) => {
    await fetch(`${API}/books/${id}`, {
      method: "DELETE",
    });

    fetchBooks();
  };

  // Edit Book
  const editBook = (book: any) => {
    setTitle(book.title);
    setAuthor(book.author);
    setPrice(book.price);

    setEditId(book.id);
  };

  return (
    <div className="p-10 min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">
        Book Store
      </h1>

      {/* FORM */}
      <div className="flex gap-3 mb-8 flex-wrap">
        <input
          className="border border-gray-500 bg-black p-3 rounded w-60"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border border-gray-500 bg-black p-3 rounded w-60"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <input
          className="border border-gray-500 bg-black p-3 rounded w-40"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button
          onClick={addBook}
          className="bg-white text-black px-6 py-3 rounded font-semibold"
        >
          {editId !== null ? "Update" : "Add"}
        </button>
      </div>

      {/* BOOK LIST */}
      <div className="grid gap-5">
        {books.map((book) => (
          <div
            key={book.id}
            className="border border-gray-600 p-5 rounded-lg flex justify-between items-center"
          >
            <div>
              <h2 className="text-2xl font-bold">
                {book.title}
              </h2>

              <p className="text-gray-300 mt-1">
                {book.author}
              </p>

              <p className="text-lg mt-2">
                ₹{book.price}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => editBook(book)}
                className="bg-blue-600 px-4 py-2 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteBook(book.id)}
                className="bg-red-600 px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}