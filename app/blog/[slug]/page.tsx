import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// Scaffold only — blog posts not yet implemented
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  notFound()
}
