import { useState } from 'react'

export default function LoginSignup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically handle the login or signup logic
    
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg w-full max-w-md">
        <h3 className="text-2xl font-bold text-center text-gray-800">
          Login to your account
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className="block" htmlFor="email">
              Email
              <input
                type="email"
                placeholder="Your email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </label>
          </div>
          <div className="mt-4">
            <label className="block" htmlFor="password">
              Password
              <input
                type="password"
                placeholder="Your password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </label>
          </div>
          <div className="flex items-baseline justify-between mt-4">
            <button
              type="submit"
              className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            >
              Login
            </button>
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline focus:outline-none"
            >
              Forgot Password ?
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
