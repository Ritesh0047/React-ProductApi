// // import React, { useContext } from 'react'
// // import { Link } from 'react-router-dom'
// // import { productContext } from '../context/Context'
// // const Nav = () => {
// //   const { products } = useContext(productContext);
// // let distinctCategory = products && products.reduce((acc,product)=>[...acc,product.category], [] )
// //   //  console.log(distinctCategory);
// //   distinctCategory=[...new Set(distinctCategory)]
// //   // console.log(distinctCategory);
// //   const color = () => {
// //     return `rgba(${(Math.random() * 255).toFixed()},${(Math.random() * 255).toFixed()},${(Math.random() * 255).toFixed()},0.5)`
// //  }

// //   return (
// //     <div className='w-1/5   flex justify-start items-center flex-col px-4 py-4  border-r-zinc-400 bg-zinc-50'>
     
// //         <Link to="/" className=' bg-green-400 px-4 py-1 mb-4 text-white rounded-md'>Home</Link>
      
// //       <Link to='/create' className='inline-block py-2 px-4 bg-blue-400 rounded-md text-white font-medium'>Add a product</Link>

// //     <hr className=' w-full my-3 bg-zinc-700' />
// //       <h1 className='text-2xl mb-3 text-zinc-700 font-medium '>Category Filter</h1>
// //        <ul className='w-full '>
// //         {distinctCategory.map((category, i) => <Link to={`/?category=${category}`} key={i} className='block mb-2 text-md rounded-md  px-4 py-1 text-zinc-700  capitalize hover:text-blue-400 font-medium'><span style={{backgroundColor:color()}} className='inline-block rounded-full h-2 w-2 mr-4 '></span>{category}</Link>)}
         

// //       </ul>
// //     </div>
// //   )
// // }

// // export default Nav
// import React, { useContext } from 'react'
// import { Link } from 'react-router-dom'
// import { productContext } from '../context/Context'

// const Nav = () => {
//   const { products } = useContext(productContext);

//   // Extracting all categories from products (API + LocalStorage)
//   let distinctCategory = [...new Set(products.map(product => product.category))];

//   const color = () => {
//     return `rgba(${(Math.random() * 255).toFixed()},${(Math.random() * 255).toFixed()},${(Math.random() * 255).toFixed()},0.5)`
//   }

//   return (
//     <div className='w-1/5 flex justify-start items-center flex-col px-4 py-4 border-r-zinc-400 bg-zinc-50'>
//       <Link to="/" className='bg-green-400 px-4 py-1 mb-4 text-white rounded-md'>Home</Link>
//       <Link to='/create' className='inline-block py-2 px-4 bg-blue-400 rounded-md text-white font-medium'>Add a product</Link>

//       <hr className='w-full my-3 bg-zinc-700' />
//       <h1 className='text-2xl mb-3 text-zinc-700 font-medium'>Category Filter</h1>

//       <ul className='w-full'>
//         {distinctCategory.map((category, i) => (
//           <Link
//             to={`/?category=${category}`}
//             key={i}
//             className='block mb-2 text-md rounded-md px-4 py-1 text-zinc-700 capitalize hover:text-blue-400 font-medium'
//           >
//             <span style={{ backgroundColor: color() }} className='inline-block rounded-full h-2 w-2 mr-4'></span>
//             {category}
//           </Link>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default Nav;
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { productContext } from '../context/Context'

const Nav = () => {
  const { products } = useContext(productContext);

  // Ensure categories are collected from all products (API + Local)
  const distinctCategory = [...new Set(products.map(product => product.category))];

  const randomColor = () => {
    return `rgba(${(Math.random() * 255).toFixed()},${(Math.random() * 255).toFixed()},${(Math.random() * 255).toFixed()},0.5)`
  };

  return (
    <div className='w-1/5 flex justify-start items-center flex-col px-4 py-4 border-r-zinc-400 bg-zinc-50'>
      <Link to="/" className='bg-green-400 px-4 py-1 mb-4 text-white rounded-md'>Home</Link>
      <Link to='/create' className='inline-block py-2 px-4 bg-blue-400 rounded-md text-white font-medium'>Add a product</Link>

      <hr className='w-full my-3 bg-zinc-700' />
      <h1 className='text-2xl mb-3 text-zinc-700 font-medium'>Category Filter</h1>

      <ul className='w-full'>
        {distinctCategory.length > 0 ? (
          distinctCategory.map((category, i) => (
            <Link
              to={`/?category=${encodeURIComponent(category)}`}
              key={i}
              className='block mb-2 text-md rounded-md px-4 py-1 text-zinc-700 capitalize hover:text-blue-400 font-medium'
            >
              <span style={{ backgroundColor: randomColor() }} className='inline-block rounded-full h-2 w-2 mr-4'></span>
              {category}
            </Link>
          ))
        ) : (
          <p className="text-zinc-600">No categories available</p>
        )}
      </ul>
    </div>
  )
}

export default Nav;
