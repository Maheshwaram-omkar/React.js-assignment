import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchRestaurantById } from '../api/apiService'

export default function RestaurantDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [restaurant, setRestaurant] = useState(null)
  const [loading, setLoading] = useState(true)
  const canvasRef = useRef(null)
  const [logoPos, setLogoPos] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    fetchRestaurantById(id).then(res => setRestaurant(res.data)).catch(()=>alert('Not found')).finally(()=>setLoading(false))
  }, [id])

  useEffect(() => {
    if (!restaurant) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const baseImg = new Image()
    const logoImg = new Image()
    baseImg.crossOrigin = 'Anonymous'
    baseImg.src = restaurant.imageURL
    logoImg.src = '/fastor-logo.png'

    const draw = () => {
      const dpr = window.devicePixelRatio || 1
      const w = 800
      const h = 600
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0,0,w,h)
      ctx.drawImage(baseImg, 0, 0, w, h)
      const logoSize = 120
      const x = logoPos.x || (w/2 - logoSize/2)
      const y = logoPos.y || (h/2 - logoSize/2)
      ctx.drawImage(logoImg, x, y, logoSize, logoSize)
    }

    baseImg.onload = () => {
      logoImg.onload = () => draw()
      if (logoImg.complete) draw()
    }

    setLogoPos(p => ({ x: p.x || 340, y: p.y || 240 }))

    const onResize = () => draw()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [restaurant, logoPos.x, logoPos.y])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let isDragging = false
    let last = null

    const toCoords = (e) => {
      const rect = canvas.getBoundingClientRect()
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      const clientY = e.touches ? e.touches[0].clientY : e.clientY
      return { x: clientX - rect.left, y: clientY - rect.top }
    }

    const onDown = (e) => {
      last = toCoords(e)
      isDragging = true
      setDragging(true)
    }
    const onMove = (e) => {
      if (!isDragging) return
      const pos = toCoords(e)
      const dx = pos.x - last.x
      const dy = pos.y - last.y
      setLogoPos(p => ({ x: Math.max(0, p.x + dx), y: Math.max(0, p.y + dy) }))
      last = pos
    }
    const onUp = () => {
      isDragging = false
      setDragging(false)
    }

    canvas.addEventListener('mousedown', onDown)
    canvas.addEventListener('touchstart', onDown)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchend', onUp)

    return () => {
      canvas.removeEventListener('mousedown', onDown)
      canvas.removeEventListener('touchstart', onDown)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchend', onUp)
    }
  }, [dragging])

  const handleShare = async () => {
    const canvas = canvasRef.current
    if (!navigator.share) { alert('Web Share API not supported'); return }
    canvas.toBlob(async (blob) => {
      const file = new File([blob], `${restaurant.name}.png`, { type: 'image/png' })
      try {
        await navigator.share({ files: [file], title: restaurant.name, text: `Check out ${restaurant.name}` })
      } catch (err) {
        console.error('Share failed', err)
      }
    }, 'image/png')
  }

  if (loading) return <div className="p-6">Loading...</div>
  if (!restaurant) return <div className="p-6">Not found</div>

  return (
    <div className="p-6">
      <button onClick={() => navigate(-1)} className="mb-4 px-3 py-1 bg-white rounded shadow">Back</button>
      <h2 className="text-xl font-semibold mb-2">{restaurant.name}</h2>
      <p className="text-sm mb-4">{restaurant.address} • ⭐ {restaurant.rating}</p>

      <div className="bg-white rounded shadow p-4 inline-block">
        <canvas ref={canvasRef} style={{ touchAction: 'none', cursor: 'grab' }} />
      </div>

      <div className="mt-4 flex gap-2">
        <button onClick={handleShare} className="px-4 py-2 bg-slate-800 text-white rounded">Share Image</button>
        <button onClick={() => {
          setLogoPos({ x: 340, y: 240 })
        }} className="px-4 py-2 bg-white rounded shadow">Reset Logo</button>
      </div>

      <p className="mt-4 text-sm text-slate-500">Tip: Drag on the canvas to reposition the logo before sharing.</p>
    </div>
  )
}
