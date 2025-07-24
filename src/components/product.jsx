import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'

// 🆕 استدعاء من Redux
import { useDispatch } from 'react-redux'
import { addToCart } from '../features/cartSlice'

function Product() {
  const [products, setProducts] = useState([])
  const dispatch = useDispatch() // لتفعيل الأكشن

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err))
  }, [])

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
    alert('Product added to cart!')
    // ممكن تعمل تحديث في الـ Header بطريقة تانية غير reload لو محتاج
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8 m">
      {products.slice(0, 9).map((product) => (
        <div key={product.id} className="card bg-base-100 shadow-md p-4">
          <figure className="px-4 pt-4 hover:scale-125 t">
            <img
              src={product.image}
              alt={product.title}
              className="rounded-xl h-40 object-contain cursor-pointer"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-base font-bold">{product.title}</h2>
            <p className="text-sm">{product.description.slice(0, 80)}...</p>
            <p className="font-semibold text-green-600">${product.price}</p>
            <div className="flex gap-3 mt-4">
              <Link to={`/product/${product.id}`}>
                <button className="btn btn-outline btn-sm">Details</button>
              </Link>
              <button
                onClick={() => handleAddToCart(product)}
                className="btn btn-primary btn-sm flex items-center gap-2"
              >
                <FaShoppingCart className="text-white" />
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

export default Product
