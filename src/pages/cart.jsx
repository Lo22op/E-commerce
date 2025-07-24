import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, removeFromCart } from '../features/cartSlice'

function Cart() {
  const dispatch = useDispatch()

  const cartItems = useSelector((state) => state.cart.cartItems)

  const handleRemove = (index) => {
    dispatch(removeFromCart(index)) 
  }

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0)

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    console.log('Checkout Data:', data)
    alert('🎉 Order placed successfully!')

    dispatch(clearCart()) 
    localStorage.removeItem('cart') 
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <div className="w-full max-w-2xl">
          <div className="grid gap-6">
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center gap-6 bg-base-100 p-4 shadow rounded">
                <img src={item.image} className="w-16 h-16 object-contain" alt={item.title} />
                <div className="flex-1">
                  <h2 className="font-bold">{item.title}</h2>
                  <p className="text-sm text-gray-600">${item.price}</p>
                </div>
                <button className="btn btn-sm btn-error" onClick={() => handleRemove(index)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 text-xl font-semibold text-right">
            Total: ${totalPrice.toFixed(2)}
          </div>

          {/* Checkout Form */}
          <div className="mt-10 bg-base-200 p-6 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Checkout Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="input input-bordered w-full"
                {...register('name', { required: true })}
              />
              {errors.name && <p className="text-red-500 text-sm">Name is required</p>}

              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
                {...register('email', { required: true })}
              />
              {errors.email && <p className="text-red-500 text-sm">Email is required</p>}

              <textarea
                placeholder="Shipping Address"
                className="textarea textarea-bordered w-full"
                {...register('address', { required: true })}
              ></textarea>
              {errors.address && <p className="text-red-500 text-sm">Address is required</p>}

              <button className="btn btn-primary w-full">Place Order</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
