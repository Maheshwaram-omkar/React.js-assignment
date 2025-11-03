import React, { useEffect, useState } from 'react'
import { fetchRestaurants } from '../api/apiService'
import RestaurantCard from '../components/RestaurantCard'

export default function RestaurantList() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    fetchRestaurants().then(res => {
      if (mounted) setData(res.data)
    }).catch(console.error).finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Nearby Restaurants</h1>
      {loading ? <div>Loading...</div> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map(r => <RestaurantCard key={r.id} restaurant={r} />)}
        </div>
      )}
    </div>
  )
}
