import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { productContext } from '../context/Context';
import { toast } from 'react-toastify';
const Details = () => {
  const { products, setProducts } = useContext(productContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    let foundProduct = products.find((item) => String(item.id) === id);

    if (!foundProduct) {
      // Check localStorage if product is not in state
      const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
      foundProduct = storedProducts.find((item) => String(item.id) === id);
    }

    setProduct(foundProduct || null);
  }, [id, products]);

  const goHomeHandler = () => {
    navigate('/');
  };

  const productDeleteHandler = (productId) => {
    // Get stored products from localStorage
    let storedProducts = JSON.parse(localStorage.getItem('products')) || [];

    // Filter out the deleted product
    const updatedProducts = storedProducts.filter((item) => String(item.id) !== String(productId));

    // Save updated products back to localStorage
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    // Update global context (if using context for local products)
    setProducts((prev) => prev.filter((item) => String(item.id) !== String(productId)));
 toast.error("Product deleted successfully")
    // Redirect to home
    navigate('/');
  };

  if (!product) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-5xl font-medium text-zinc-700">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <button
        className="bg-red-400 rounded-md px-4 py-1 text-white font-semibold mb-4"
        onClick={goHomeHandler}
      >
        Home
      </button>
      <div className="flex w-2/3 h-3/4 p-5 items-center justify-center">
        <img className="block w-1/2 h-full p-8 scale-85" src={product.image} alt={product.title} />
        <div className="content w-1/2">
          <h1 className="mb-2 text-lg font-medium text-zinc-800 leading-5">
            Title: {product.title}
          </h1>
          <h3 className="mb-2 text-lg font-medium text-zinc-700">Category: {product.category}</h3>
          <h3 className="mb-2 text-lg font-medium text-red-400">Price: ₹{product.price}</h3>
          <p className="text-md tracking-tight leading-tight text-zinc-700 mb-4">
            <span className="text-md font-medium">Description:</span> {product.description}
          </p>
          <div>
            <Link
              to={`/edit/${product.id}`}
              className="px-4 py-1 bg-green-500 font-medium text-white rounded-md mr-8"
            >
              Edit
            </Link>
            <button
              onClick={() => productDeleteHandler(product.id)}
              className="px-4 py-1 rounded-md bg-red-400 text-white font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
