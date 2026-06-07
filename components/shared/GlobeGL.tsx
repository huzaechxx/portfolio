'use client'

import { useEffect, useRef } from 'react'

interface GlobeInstance {
  pointOfView: (pov: { lat: number; lng: number; altitude: number }, ms?: number) => void
  controls: () => {
    autoRotate: boolean
    autoRotateSpeed: number
    enableZoom: boolean
    enablePan: boolean
    enableRotate: boolean
    update: () => void
  }
}

export default function GlobeGL() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    let destroyed = false
    let rafId: number

    async function init() {
      const GlobeLib = (await import('react-globe.gl')).default
      const ReactDOM = await import('react-dom/client')
      const React = await import('react')

      if (destroyed || !container) return

      const points = [
        { lat: 30.0, lng: 72.0, size: 0.5, color: '#ff5500' },
        { lat: 52.0, lng: 10.0, size: 0.5, color: '#ff5500' },
      ]

      const arcs = [
        { startLat: 30.0, startLng: 72.0, endLat: 52.0, endLng: 10.0, color: '#ff5500' },
      ]

      const el = React.createElement(GlobeLib as React.ElementType, {
        width: 480,
        height: 480,
        backgroundColor: 'rgba(0,0,0,0)',
        globeImageUrl: '//unpkg.com/three-globe/example/img/earth-night.jpg',
        atmosphereColor: '#ff5500',
        atmosphereAltitude: 0.2,
        pointsData: points,
        pointColor: 'color',
        pointAltitude: 0.02,
        pointRadius: 'size',
        arcsData: arcs,
        arcColor: 'color',
        arcDashLength: 0.4,
        arcDashGap: 0.2,
        arcDashAnimateTime: 2000,
        arcStroke: 0.5,
        enablePointerInteraction: false,
        onGlobeReady: (g: GlobeInstance) => {
          g.pointOfView({ lat: 30, lng: 40, altitude: 2.2 }, 0)

          const controls = g.controls()
          controls.autoRotate = true
          controls.autoRotateSpeed = 0.8
          controls.enableZoom = false
          controls.enablePan = false
          controls.enableRotate = false

          function tick() {
            if (destroyed) return
            controls.update()
            rafId = requestAnimationFrame(tick)
          }
          tick()
        },
      })

      if (!destroyed && container) {
        const root = ReactDOM.createRoot(container)
        root.render(el)
      }
    }

    init()

    return () => {
      destroyed = true
      cancelAnimationFrame(rafId)
      container.innerHTML = ''
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ width: 480, height: 480 }}
      className="rounded-full overflow-hidden"
    />
  )
}
