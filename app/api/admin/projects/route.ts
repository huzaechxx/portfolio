import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(projects)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const {
    title, slug, client, industry, problem, solution,
    techStack, deliverables, results, coverImage, images,
    videoUrl, liveUrl, featured, published,
  } = body

  if (!title || !slug || !problem || !solution || !techStack?.length || !deliverables?.length) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const existing = await prisma.project.findUnique({ where: { slug } })
  if (existing) return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })

  const project = await prisma.project.create({
    data: {
      title, slug,
      client: client || null,
      industry: industry || null,
      problem, solution,
      techStack: techStack as string[],
      deliverables: deliverables as string[],
      results: (results as string[]) || [],
      coverImage: coverImage || null,
      images: (images as string[]) || [],
      videoUrl: videoUrl || null,
      liveUrl: liveUrl || null,
      featured: featured ?? false,
      published: published ?? false,
    },
  })

  revalidatePath('/')
  revalidatePath('/case-studies')
  return NextResponse.json(project, { status: 201 })
}
