import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

const HomePage = ({ itemsPerPage }) => {

  const [products, setProducts] = useState([]);
  const [buttons, setButtons] = useState([]);
  const [startButtonRange, setStartButtonRange] = useState(0);
  const [endButtonRange, setEndButtonRange] = useState(3);

  const [startRange, setStartRange] = useState(1);
  const [endRange, setEndRange] = useState(itemsPerPage);

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
      setEndButtonRange((endButtonRange) => endButtonRange + 1);
      setStartButtonRange((startButtonRange) => startButtonRange + 1);
    }
    else {
      setEndButtonRange((endButtonRange) => endButtonRange - 1);
      setStartButtonRange((startButtonRange) => startButtonRange - 1);
    }
  }

  const pageHandler = (buttonNumber) => {
    setStartRange(buttonNumber * itemsPerPage + 1);
    setEndRange((buttonNumber + 1) * (itemsPerPage));
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  useEffect(() => {
    pageHandler(endButtonRange);
  }, [startButtonRange, endButtonRange])

  useEffect(() => {
    setButtons(Array.from({ length: Math.ceil(products.length / itemsPerPage) }, (_, index) => index));
  }, [products]);

  if (products.length === 0) {
    return <div className='text-6xl font-bold'>Loading...</div>
  }

  return (
    <div className='min-h-[100vh] h-auto max-w-[1000px] mx-auto mt-4 py-10'>
      {
        products.map((product) =>
        ((product.id >= startRange && product.id <= endRange) ?
          (
            <div className="flex gap-4 items-center shadow-lg mb-4 px-4" key={product.id}>
              <div className="w-1/3 flex justify-center items-center">
                <img src={product.images[0]} className="h-[200px] object-cover " alt="" />
              </div>
              <div>
                <h1>Name: {product.title}</h1>
                <p>Description: {product.description}</p>
                <h1>Price: Rs {product.price}</h1>
              </div>
            </div>)
          : null)
        )
      }
      <div className='flex justify-center py-8'>
        {startButtonRange !== 0 ? <button className='text-3xl mr-4' onClick={() => pageHelper(false)}>Prev</button> : null}
        {
          buttons.map((button) => (
            (button >= startButtonRange && button <= endButtonRange) ? (
              <div key={button}>
                <button className='py-2 px-2 text-4xl bg-gray-200 hover:bg-blue-500 mr-4' onClick={() => pageHandler(button)}>{button + 1}</button>
              </div>
            ) : null
          ))
        }
        {endRange !== products.length ? <button className='text-3xl' onClick={() => pageHelper(true)}>Next</button> : null}
      </div>
    </div>
  )
}

export default HomePage