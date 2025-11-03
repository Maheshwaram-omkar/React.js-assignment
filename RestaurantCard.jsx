import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function RestaurantCard({ restaurant }) {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(`/detail/${restaurant.id}`)}
      className="cursor-pointer bg-white rounded-2xl shadow p-4 hover:shadow-md transition"
    >
      <img src={restaurant.imageURL} alt={restaurant.name} className="w-full h-40 object-cover rounded-lg mb-3" />
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">{restaurant.name}</h3>
          <p className="text-sm text-slate-500">{restaurant.address}</p>
        </div>
        <div className="text-sm bg-slate-100 px-3 py-1 rounded-full">⭐ {restaurant.rating}</div>
      </div>
    </div>
  )
}
