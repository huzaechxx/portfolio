import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'AutoNord.ai — AI Automation Agency'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'monospace',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '700px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(255,85,0,0.25) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
        <div style={{ fontSize: 80, fontWeight: 800, color: '#ff5500', letterSpacing: '-2px' }}>
          AutoNord.ai
        </div>
        <div style={{ fontSize: 24, color: '#888888', marginTop: 16, letterSpacing: '6px' }}>
          WE AUTOMATE. YOU SCALE.
        </div>
        <div
          style={{
            fontSize: 18,
            color: '#444444',
            marginTop: 24,
            maxWidth: 700,
            textAlign: 'center',
            lineHeight: 1.6,
          }}
        >
          AI workflows and automation systems built for modern businesses.
        </div>
      </div>
    ),
    { ...size }
  )
}
