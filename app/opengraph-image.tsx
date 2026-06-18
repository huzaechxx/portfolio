import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'

export const alt = 'Rdexa.tech — Software & Data Agency'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const logoBuffer = fs.readFileSync(
    path.join(process.cwd(), 'public', 'image-removebg-preview.png')
  )
  const logoSrc = `data:image/png;base64,${logoBuffer.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'monospace',
        }}
      >
        {/* Logo + brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={56} height={56} style={{ objectFit: 'contain' }} />
          <span style={{ fontSize: '28px', fontWeight: 700, display: 'flex' }}>
            <span style={{ color: '#ff5500' }}>Rdexa</span>
            <span style={{ color: '#e0e0e0' }}>.tech</span>
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span
            style={{
              color: '#ffffff',
              fontSize: '88px',
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '-4px',
              textTransform: 'uppercase',
            }}
          >
            WE BUILD.
          </span>
          <span
            style={{
              color: '#ff5500',
              fontSize: '88px',
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '-4px',
              textTransform: 'uppercase',
            }}
          >
            YOU SCALE.
          </span>
          <p
            style={{
              color: '#888888',
              fontSize: '22px',
              marginTop: '20px',
              lineHeight: 1.5,
              maxWidth: '680px',
            }}
          >
            Custom software, data pipelines, and AI automation built for modern businesses.
          </p>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['Software Dev', 'Data Engineering', 'AI Automation'].map((tag) => (
              <div
                key={tag}
                style={{
                  background: '#141414',
                  border: '1px solid #2a2a2a',
                  color: '#666666',
                  fontSize: '12px',
                  padding: '6px 14px',
                  borderRadius: '2px',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <span style={{ color: '#444444', fontSize: '14px', letterSpacing: '1px' }}>
            rdexa.tech
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
