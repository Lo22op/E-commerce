import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    // جلب المستخدم من localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'))

    if (!storedUser) {
      setError('No registered user found. Please register first.')
      return
    }

    // تحقق من الإيميل والباسورد
    if (email === storedUser.email && password === storedUser.password) {
      // تخزين حالة الدخول (auth)
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userName', storedUser.name)

      navigate('/') // أو '/home' أو أي صفحة تحددها
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="flex flex-col-reverse lg:flex-row-reverse items-center gap-12 max-w-6xl w-full">

        {/* النص الجانبي */}
        <div className="text-center lg:text-left max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Login now</h1>
          <p className="text-gray-600 leading-relaxed">
            Please enter your email and password to access your account.
          </p>
        </div>

        {/* نموذج تسجيل الدخول */}
        <form onSubmit={handleLogin} className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="text-2xl font-semibold text-center mb-4">Welcome Back</h2>

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <label className="label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="label mt-4" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="input input-bordered w-full"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="btn btn-neutral mt-6 w-full">Login</button>

            <div className="mt-4 text-center text-sm">
              Don’t have an account?{' '}
              <Link to="/register" className="link text-blue-500">Register</Link>
            </div>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Login
