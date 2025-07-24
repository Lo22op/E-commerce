import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()

    // تحقق من الحقول
    if (!name || !email || !password) {
      setError('Please fill in all fields')
      return
    }

    // حفظ المستخدم في localStorage
    const user = { name, email, password }
    localStorage.setItem('user', JSON.stringify(user))

    // توجيه المستخدم إلى صفحة تسجيل الدخول
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="flex flex-col-reverse lg:flex-row-reverse items-center gap-12 max-w-6xl w-full">

        <div className="text-center lg:text-left max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Create an Account</h1>
          <p className="text-gray-600 leading-relaxed">
            Sign up now to start shopping! Just enter your name, email, and password to get started.
          </p>
        </div>

        <form onSubmit={handleRegister} className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <label className="label" htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className="input input-bordered w-full"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="label mt-4" htmlFor="email">Email</label>
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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="btn btn-primary mt-6 w-full">Register</button>

            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link to="/login" className="link text-blue-500">Login</Link>
            </div>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Register
