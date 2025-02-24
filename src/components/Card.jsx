
// import React, {  useContext, useEffect, useState } from 'react'
// import Loading from './Loading';
// import {  Link, useLocation,  } from 'react-router-dom';
// import { productContext } from '../context/Context';
// import Axios from '../utils/axios'

// const Card = () => {
//   const { products } = useContext(productContext);
//   // console.log(products);
  
//   //getting categories and calling category api
//   const { search } = useLocation()
//   const category = decodeURIComponent(search.split("=")[1])
//   // console.log(category);
//   const [filteredProducts, setFilteredProducts] = useState([])

  
  
  
//   const getCategoryData = async () => {
//     try {
//       const response = await Axios.get(`/products/category/${category}`)
//       setFilteredProducts(response.data)
//     } catch (error) {
//       console.log(error);
      
//     }
//   }
//   useEffect(() => {
//     if (category !=="undefined") {
//       setFilteredProducts([]);
//       getCategoryData();
//     }
    
//     // if (products && filteredProducts.length === 0)
//     else{
//       setFilteredProducts(products);
//     }
//   }, [category,products]);
  
  
  
//   return (
//     <>
//       {/* filtering products based on category */}
//       { filteredProducts.length>0 ?   filteredProducts.map((fp,i) => <Link to={`/details/${fp.id}`} key={fp.id} className='block w-48 h-56 p-1 hover:shadow-lg rounded overflow-hidden shadow-sm'>
//         <img className=' w-full h-36  scale-80 object-center hover:scale-90' src={fp.image} alt={fp.title} />
//         <div className='h-10'>
//           <h1 className='text-sm font-semibold leading tracking-tight line-clamp-2 text-zinc-700 cursor-pointer hover:text-blue-400'>{fp.title}</h1>
//         </div>
//         <h3 className='text-md font-medium text-green-500'>₹{fp.price}</h3>

//       </Link>) : <Loading />}
   
//       </>
//   )
// }

// export default Card
import React, { useContext, useEffect, useState } from 'react'
import Loading from './Loading';
import { Link, useLocation } from 'react-router-dom';
import { productContext } from '../context/Context';

const Card = () => {
  const { products } = useContext(productContext);
  const { search } = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (category !== "undefined" && category) {
      setFilteredProducts(products.filter(product => product.category === category));
    } else {
      setFilteredProducts(products);
    }
  }, [category, products]);

  return (
    <>
      {filteredProducts.length > 0 ?
        filteredProducts.map((product) => (
          <Link to={`/details/${product.id}`} key={product.id} className='block w-48 h-56 p-1 hover:shadow-lg rounded overflow-hidden shadow-sm'>
            <img className='w-full h-36 scale-80 object-center hover:scale-90' src={product.image} alt={product.title} />
            <div className='h-10'>
              <h1 className='text-sm font-semibold leading tracking-tight line-clamp-2 text-zinc-700 cursor-pointer hover:text-blue-400'>{product.title}</h1>
            </div>
            <h3 className='text-md font-medium text-green-500'>₹{product.price}</h3>
          </Link>
        )) : <Loading />}
    </>
  )
}

export default Card;
