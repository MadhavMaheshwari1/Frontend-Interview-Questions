import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

const HomePage = ({ itemsPerPage }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await axios.get('https://dummyjson.com/products?limit=0');
    setProducts(response.data.products);
    console.log(response.data);
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  if (products.length === 0) {
    return <div className='text-6xl font-bold'>Loading...</div>
  }

  return (
    <div className='h-[100vh]'>{
      products.map((product) =>
        <div key={product.id}>{product.id}</div>
      )
    }
    </div>
  )
}

export default HomePage