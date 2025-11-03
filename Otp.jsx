import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CORRECT_OTP = '123456'

export default function Otp() {
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (otp === CORRECT_OTP) {
      localStorage.setItem('isAuthenticated', 'true')
      navigate('/list')
    } else {
      alert('Invalid OTP. Try 123456')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
        <input
          value={otp}
          onChange={e => setOtp(e.target.value)}
          placeholder="6-digit OTP"
          className="w-full p-3 border rounded-lg mb-4"
        />
        <button className="w-full p-3 bg-slate-800 text-white rounded-lg">Verify</button>
      </form>
    </div>
  )
}
