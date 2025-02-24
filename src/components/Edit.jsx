
// import React, { useContext, useEffect, useState } from 'react';
// import { productContext } from '../context/Context';
// import { nanoid } from 'nanoid';
// import { useNavigate, useParams } from 'react-router-dom';

// const Edit = () => {
//   const { products, setProducts } = useContext(productContext);
//   const { id } = useParams()
//   const navigate = useNavigate();
//   const[product,setProduct]=useState({title:"",category: "",description:"",price:"",image:""});
  
//   const changeHandler = (e) => {
//     console.log(e.target.value);
//     setProduct({ ...product, [e.target.name]:e.target.value})
  
// }
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (product.title.trim().length < 5 || product.description.trim().length < 5 || product.image.trim().length < 5 || product.category.trim().length < 3) {
//       alert("No field must be empty and at least 5 characters long");
//       return;
//     }
    
//     const productIndex = products.findIndex(p => p.id == id)
//     const copyData = [...products]
//     copyData[productIndex] ={...products[productIndex],...product}
//     // console.log(copyData);
    
//     setProducts(copyData)
//     localStorage.setItem("products",JSON.stringify(copyData))
//     navigate(-1);
//   };


//   const goHomeHandler = () => {
//     navigate('/');
//   };
//   useEffect(() => {
//     setProduct(products.filter(p => p.id == id)[0])
//     console.log(product);
    
// },[id])
//   return (
//     <div className="h-screen w-full flex items-center justify-center flex-col">
//       <button
//         className="bg-red-400 rounded-md px-4 py-1 text-white font-semibold mb-4"
//         onClick={goHomeHandler}
//       >
//         Home
//       </button>
//       <h1 className="text-3xl text-zinc-700 font-semibold mb-4">Edit Product</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col p-4 gap-6 h-fit w-1/2">
//         <input
//           value={product && product.title} required
//           onChange={changeHandler}
//           name='title'
//           className="p-2 text-md bg-zinc-100 rounded-sm outline-zinc-700"
//           type="text"
//           placeholder="Title"
//         />
//         <input required
//           value={product && product.image}
//           onChange={changeHandler}
//           name='image'
//           className="p-2 text-md rounded-sm bg-zinc-100 outline-zinc-700"
//           type="text"
//           placeholder="Image URL"
//         />
//         <div className="flex justify-between ">
//           <input
//             value={product && product.price}
//             onChange={changeHandler}
//             name='price'
//             className="p-2 w-[46%] text-md rounded-sm bg-zinc-100 outline-zinc-700 "
//             type="number"
//             placeholder="Add Price"
//           />
//           <input
//             value={product && product.category}
//             onChange={changeHandler}
//             name='category'
//             className="p-2 w-[46%] text-md rounded-sm bg-zinc-100 outline-zinc-700"
//             type="text"
//             placeholder="Category"
//           />
//         </div>
//         <textarea
//           value={product && product.description}
//           onChange={changeHandler}
//           name='description'
//           className="p-2 text-md bg-zinc-100 outline-zinc-700 rounded-sm resize-none"
//           placeholder="Description"
//         ></textarea>
//         <input
//           className="py-2 px-4 rounded-md bg-green-400 text-white font-medium w-fit cursor-pointer"
//           type="submit"
//           value="Edit Product"
//         />
//       </form>
//     </div>
//   );
// };

// export default Edit;
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productContext } from '../context/Context';
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS for styling
const Edit = () => {
  const { products, setProducts } = useContext(productContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({ title: "", category: "", description: "", price: "", image: "" });

  useEffect(() => {
    // Find product in context or local storage
    let foundProduct = products.find(p => String(p.id) === String(id));

    if (!foundProduct) {
      const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
      foundProduct = storedProducts.find(p => String(p.id) === String(id));
    }

    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id, products]);

  const changeHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (product.title.trim().length < 5 || product.description.trim().length < 5 || product.image.trim().length < 5 || product.category.trim().length < 3) {
      alert("No field must be empty and at least 5 characters long");
      return;
    }

    // Update product in context
    const updatedProducts = products.map(p =>
      String(p.id) === String(id) ? { ...p, ...product } : p
    );

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
   toast.success("Product updated successfully")
    navigate(-1); // Go back to previous page
  };

  const goHomeHandler = () => {
    navigate('/');
  };

  return (
    <div className="h-screen w-full flex items-center justify-center flex-col">
      <button
        className="bg-red-400 rounded-md px-4 py-1 text-white font-semibold mb-4"
        onClick={goHomeHandler}
      >
        Home
      </button>
      <h1 className="text-3xl text-zinc-700 font-semibold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col p-4 gap-6 h-fit w-1/2">
        <input
          value={product?.title || ""} required
          onChange={changeHandler}
          name='title'
          className="p-2 text-md bg-zinc-100 rounded-sm outline-zinc-700"
          type="text"
          placeholder="Title"
        />
        <input
          value={product?.image || ""}
          onChange={changeHandler}
          name='image'
          className="p-2 text-md rounded-sm bg-zinc-100 outline-zinc-700"
          type="text"
          placeholder="Image URL"
        />
        <div className="flex justify-between">
          <input
            value={product?.price || ""}
            onChange={changeHandler}
            name='price'
            className="p-2 w-[46%] text-md rounded-sm bg-zinc-100 outline-zinc-700"
            type="number"
            placeholder="Add Price"
          />
          <input
            value={product?.category || ""}
            onChange={changeHandler}
            name='category'
            className="p-2 w-[46%] text-md rounded-sm bg-zinc-100 outline-zinc-700"
            type="text"
            placeholder="Category"
          />
        </div>
        <textarea
          value={product?.description || ""}
          onChange={changeHandler}
          name='description'
          className="p-2 text-md bg-zinc-100 outline-zinc-700 rounded-sm resize-none"
          placeholder="Description"
        ></textarea>
        <input
          className="py-2 px-4 rounded-md bg-green-400 text-white font-medium w-fit cursor-pointer"
          type="submit"
          value="Edit Product"
        />
      </form>
    </div>
  );
};

export default Edit;
