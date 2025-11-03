import { mockRestaurants } from './mockData'

export const fetchRestaurants = () => {
  return new Promise((resolve) => setTimeout(() => resolve({ data: mockRestaurants }), 500))
}

export const fetchRestaurantById = (id) => {
  return new Promise((resolve, reject) => {
    const found = mockRestaurants.find(r => r.id === id)
    setTimeout(() => (found ? resolve({ data: found }) : reject(new Error('Not found'))), 300)
  })
}
