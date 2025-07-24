import '../App.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
    const navigate = useNavigate()

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    const userName = localStorage.getItem('userName')

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userName')
    navigate('/login')
  }


const cartItems = useSelector((state) => state.cart.cartItems)
const cartCount = cartItems.length
const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm cursor-pointer rounded-lg">
            {/* name */}
            <div className="flex-1">
              <a className="btn btn-ghost text-xl">Shopify</a>
            </div>
            <div className="flex gap-4">
              <h1 className='hover:text-lg t hover:font-bold'><Link to="/">Home</Link></h1>
              <h1 className='hover:text-lg t hover:font-bold'><Link to="/products">Products</Link></h1>
                <div className="flex items-center gap-4">
                  {isLoggedIn ? (
                    <div className="flex flex-col sm:flex-row items-center sm:gap-4">
                      <span className="font-medium text-gray-700 text-sm sm:text-base">
                        👋 Hello, <span className="font-semibold">{userName}</span>
                      </span>
                      <button
                        onClick={handleLogout}
                        className="btn btn-sm btn-outline mt-2 sm:mt-0"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Link to="/login" className="btn btn-sm btn-ghost">Login</Link>
                      <Link to="/register" className="btn btn-sm btn-primary">Register</Link>
                    </div>
                  )}
                </div>

            </div>
            {/* cart */}
            <div className="flex-none">
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                  <div className="indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="badge badge-sm indicator-item">{cartCount}</span>
                  </div>
                </div>

                {/* محتوى السلة يظهر عند الضغط */}
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-4 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-64">
                  <li className="mb-2 font-bold">{cartCount} Items</li>
                  <li className="mb-2 text-info">Subtotal: ${totalPrice}</li>
                  <li>
                    <button onClick={() => navigate('/cart')} className="btn btn-primary w-full">
                      View Cart
                    </button>
                  </li>
                </ul>
              </div>

            </div>
      </div>
    </>
  )
}

export default Header;
