import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [mobile, setMobile] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const cleaned = mobile.replace(/\D/g, '')
    if (cleaned.length === 10) {
      sessionStorage.setItem('loginMobile', cleaned)
      navigate('/otp')
    } else {
      alert('Enter a valid 10-digit mobile number')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-4">Sign in with mobile</h2>
        <label className="block mb-2 text-sm">Mobile number</label>
        <input
          value={mobile}
          onChange={e => setMobile(e.target.value)}
          placeholder="e.g. 9876543210"
          className="w-full p-3 border rounded-lg mb-4"
        />
        <button className="w-full p-3 bg-slate-800 text-white rounded-lg">Send OTP</button>
      </form>
    </div>
  )
}
