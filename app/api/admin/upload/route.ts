import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm']
const MAX_IMAGE_SIZE = 5 * 1024 * 1024   // 5MB
const MAX_VIDEO_SIZE = 100 * 1024 * 1024 // 100MB

const s3 = new S3Client({
  region: process.env.SUPABASE_REGION || 'eu-north-1',
  endpoint: process.env.SUPABASE_ENDPOINT,
  credentials: {
    accessKeyId: process.env.SECRET_ACCESS_KEY_ID!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true, // required for Supabase S3
})

const BUCKET = process.env.SUPABASE_BUCKET_NAME!
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  const type = (formData.get('type') as string) || 'image'

  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  const isImage = ALLOWED_IMAGE_TYPES.includes(file.type)
  const isVideo = ALLOWED_VIDEO_TYPES.includes(file.type)

  if (!isImage && !isVideo) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
  }

  const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE
  if (file.size > maxSize) {
    return NextResponse.json(
      { error: `File too large (max ${isVideo ? '100MB' : '5MB'})` },
      { status: 400 }
    )
  }

  const folder = isVideo ? 'videos' : 'images'
  const timestamp = Date.now()
  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')
  const key = `${folder}/${timestamp}-${safeName}`

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    })
  )

  // Supabase public URL format
  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${encodeURIComponent(BUCKET)}/${key}`

  return NextResponse.json({ path: publicUrl })
}
