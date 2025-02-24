import React, { useContext, useState } from "react";
import { productContext } from "../context/Context";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS for styling

const Create = () => {
  const { products, setProducts } = useContext(productContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      title.trim().length < 5 ||
      description.trim().length < 5 ||
      image.trim().length < 5 ||
      category.trim().length < 3
    ) {
      toast.error("No field must be empty and at least 5 characters long!");
      return;
    }

    const newProduct = {
      id: nanoid(),
      title,
      image,
      price: Number(price),
      category,
      description,
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    toast.success("Product added successfully! 🎉"); // Success notification
    navigate("/");
  };

  return (
    <div className="h-screen w-full flex items-center justify-center flex-col">
      <button
        className="bg-red-400 rounded-md px-4 py-1 text-white font-semibold mb-4"
        onClick={() => navigate("/")}
      >
        Home
      </button>
      <h1 className="text-3xl text-zinc-700 font-semibold mb-4">
        Add New Product
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-4 gap-6 h-fit w-1/2"
      >
        <input
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 text-md bg-zinc-100 rounded-sm outline-zinc-700"
          type="text"
          placeholder="Title"
        />
        <input
          required
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="p-2 text-md rounded-sm bg-zinc-100 outline-zinc-700"
          type="text"
          placeholder="Image URL"
        />
        <div className="flex justify-between ">
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-2 w-[46%] text-md rounded-sm bg-zinc-100 outline-zinc-700"
            type="number"
            placeholder="Add Price"
          />
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 w-[46%] text-md rounded-sm bg-zinc-100 outline-zinc-700"
            type="text"
            placeholder="Category"
          />
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          className="p-2 text-md bg-zinc-100 outline-zinc-700 rounded-sm resize-none"
          placeholder="Description"
        ></textarea>
        <input
          className="py-2 px-4 rounded-md bg-green-400 text-white font-medium w-fit cursor-pointer"
          type="submit"
          value="Add Product"
        />
      </form>
    </div>
  );
};

export default Create;
