import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

// ⬅️ استدعاء Redux
import { useDispatch } from 'react-redux'
import { addToCart } from '../features/cartSlice'

function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err))
  }, [id])

  if (!product) return <p className="text-center text-xl p-20">Loading...</p>

  // ✅ استبدال localStorage بـ dispatch
  const handleAddToCart = () => {
    dispatch(addToCart(product))
    alert('Product added to cart!')
    // تقدر تعمل تحديث للهيدر عن طريق استخدام useSelector بدل reload
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-8">
      <div className="max-w-5xl w-full bg-white shadow-md rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6">

        {/* الصورة */}
        <div className="flex justify-center items-center">
          <img
            src={product.image}
            alt={product.title}
            className="h-80 object-contain"
          />
        </div>

        {/* تفاصيل المنتج */}
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-gray-600 text-sm">{product.description}</p>

          <div className="flex items-center gap-4 text-lg font-semibold">
            <span className="text-green-600">${product.price}</span>
            <span className="text-sm text-gray-400 bg-gray-100 px-2 py-1 rounded">
              {product.category}
            </span>
          </div>

          <div className="flex items-center gap-2 text-yellow-500">
            <span>⭐ {product.rating?.rate || 'N/A'}</span>
            <span className="text-gray-400 text-sm">({product.rating?.count || 0} reviews)</span>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded shadow-sm w-fit"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
