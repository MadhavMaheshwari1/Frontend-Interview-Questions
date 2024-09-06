import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

const HomePage = ({ itemsPerPage }) => {

  const [products, setProducts] = useState([]);
  const [buttons, setButtons] = useState([]);
  const [startButtonRange, setStartButtonRange] = useState(1);
  const [endButtonRange, setEndButtonRange] = useState(4);

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

  useEffect(() => {
    fetchProducts();
  }, [])

  useEffect(() => {
    // Update `buttons` whenever `products` is updated
    setButtons(Array.from({ length: products.length }, (_, index) => index + 1));
  }, [products]);

  if (products.length === 0) {
    return <div className='text-6xl font-bold'>Loading...</div>
  }

  return (
    <div className='min-h-[100vh] h-auto max-w-[1000px] mx-auto mt-4'>
      {
        products.map((product) =>
        ((product.id >= startRange && product.id <= endRange) ?
          (
            <div className="flex gap-4 items-center" key={product.id}>
              <img src={product.images[0]} className="h-[200px]" alt="" />
              <div>
                <h1>Name: {product.title}</h1>
                <p>Description: {product.description}</p>
                <h1>Price: Rs {product.price}</h1>
              </div>
            </div>)
          : null)
        )
      }
      <div className='flex justify-center'> {
        buttons.map((button) => (
          (button >= startButtonRange && button <= endButtonRange) ? (
            <button key={button} className='py-2 px-2 text-4xl'>{button}</button>
          ) : null
        ))
      }

      </div>
    </div>
  )
}

export default HomePage