import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const project = await prisma.project.findUnique({ where: { id: parseInt(params.id) } })
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(project)
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const {
    title, slug, client, industry, problem, solution,
    techStack, deliverables, results, coverImage, images,
    videoUrl, liveUrl, featured, published,
  } = body

  const project = await prisma.project.update({
    where: { id: parseInt(params.id) },
    data: {
      ...(title && { title }),
      ...(slug && { slug }),
      ...(client !== undefined && { client: client || null }),
      ...(industry !== undefined && { industry: industry || null }),
      ...(problem && { problem }),
      ...(solution && { solution }),
      ...(techStack && { techStack: techStack as string[] }),
      ...(deliverables && { deliverables: deliverables as string[] }),
      ...(results !== undefined && { results: results as string[] }),
      ...(coverImage !== undefined && { coverImage: coverImage || null }),
      ...(images !== undefined && { images: images as string[] }),
      ...(videoUrl !== undefined && { videoUrl: videoUrl || null }),
      ...(liveUrl !== undefined && { liveUrl: liveUrl || null }),
      ...(featured !== undefined && { featured }),
      ...(published !== undefined && { published }),
    },
  })

  revalidatePath('/')
  revalidatePath('/case-studies')
  revalidatePath(`/case-studies/${project.slug}`)
  return NextResponse.json(project)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const project = await prisma.project.findUnique({ where: { id: parseInt(params.id) } })
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await prisma.project.delete({ where: { id: parseInt(params.id) } })
  revalidatePath('/')
  revalidatePath('/case-studies')
  return NextResponse.json({ success: true })
}
