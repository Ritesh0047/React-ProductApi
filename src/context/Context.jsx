// import React, { createContext, useState, useEffect } from 'react';
// export const productContext = createContext();
// import Axios from '../utils/axios';

// const Context = (props) => {
//   const [products, setProducts] = useState(() => {
//     return JSON.parse(localStorage.getItem('products')) || [];
//   });

//   const fetchProductData = async () => {
//     try {
//       const response = await Axios.get("/products");
//       const storedProducts = JSON.parse(localStorage.getItem('products')) || [];

//       // Merge API data with locally stored products
//       const combinedProducts = [...storedProducts, ...response.data.filter(apiProd =>
//         !storedProducts.some(localProd => localProd.id === apiProd.id)
//       )];

//       setProducts(combinedProducts);
//       localStorage.setItem('products', JSON.stringify(combinedProducts));
//     } catch (error) {
//       console.log("Error fetching products:", error);
//     }
//   };

//   useEffect(() => {
//     if (products.length === 0) {
//       fetchProductData();
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('products', JSON.stringify(products));
//   }, [products]);

//   return (
//     <productContext.Provider value={{ products, setProducts }}>
//       {props.children}
//     </productContext.Provider>
//   );
// };

// export default Context;
import React, { createContext, useState, useEffect } from 'react';
export const productContext = createContext();
import axios from '../utils/axios';

const Context = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get("/products");
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];

        // Merge API data with locally stored products
        const combinedProducts = [...storedProducts, ...response.data.filter(apiProd =>
          !storedProducts.some(localProd => localProd.id === apiProd.id)
        )];

        setProducts(combinedProducts);
        localStorage.setItem('products', JSON.stringify(combinedProducts));
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProductData();
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  return (
    <productContext.Provider value={{ products, setProducts }}>
      {props.children}
    </productContext.Provider>
  );
};

export default Context;
