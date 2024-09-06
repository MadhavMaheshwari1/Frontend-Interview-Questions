import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

const HomePage = ({ itemsPerPage }) => {

  const [products, setProducts] = useState([]);
  const [startButtonRange, setStartButtonRange] = useState(0);
  const [endButtonRange, setEndButtonRange] = useState(3);
  const [endIndex, setEndIndex] = useState(1);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products?limit=0');
      setProducts(response.data.products);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  const pageHelper = (next) => {
    if (next) {
      setEndIndex((index) => index + 1);
      setEndButtonRange((endButtonRange) => (endButtonRange + 1));
      setStartButtonRange((startButtonRange) => (startButtonRange + 1));
    }
    else {
      setEndIndex((index) => index - 1);
      setEndButtonRange((endButtonRange) => endButtonRange - 1);
      setStartButtonRange((startButtonRange) => startButtonRange - 1);
    }
  }

  const pageHandler = (buttonNumber) => {
    setEndIndex(buttonNumber);
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  if (products.length === 0) {
    return <div className='text-6xl font-bold'>Loading...</div>
  }

  return (
    <div className='min-h-[100vh] h-auto max-w-[1000px] mx-auto mt-4 py-10'>
      {
        products.slice(endIndex * itemsPerPage - itemsPerPage, endIndex * itemsPerPage).map((product) =>
        (
          <div className="flex gap-4 items-center shadow-lg mb-4 px-4" key={product.id}>
            <div className="w-1/2 flex justify-center items-center">
              <img src={product.images[0]} className="h-[200px] object-cover " alt={product.title} />
            </div>
            <div>
              <h1>Name: {product.title}</h1>
              <p>Description: {product.description}</p> 
              <h1>Price: Rs {product.price}</h1>
            </div>
          </div>)
        )}

      <div className='flex justify-center py-8'>
        {startButtonRange !== 0 ? <button className='text-3xl mr-4' onClick={() => pageHelper(false)}>Prev</button> : null}
        {
          [...Array(Math.ceil(products.length / itemsPerPage))].map((_, i) => (
            (i >= startButtonRange && i <= endButtonRange) ? (
              <div key={i}>
                <button className={`py-2 px-2 text-4xl bg-gray-200 hover:bg-blue-500 mr-4 ${((endIndex === (i+1)) ? 'bg-blue-500' : '')}`}onClick={() => pageHandler(i + 1)}>
                  {i + 1}
                </button>
              </div>
            ) : null
          ))
        }
        {endButtonRange < (Math.ceil(products.length / itemsPerPage) - 1) ? <button className='text-3xl' onClick={() => pageHelper(true)}>Next</button> : null}
      </div>
    </div>
  )
}

export default HomePage