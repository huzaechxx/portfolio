import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, ExternalLink } from "lucide-react";
import { prisma } from "@/lib/db";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { generateSEO } from "@/lib/seo";
import { caseStudySchema } from "@/lib/structured-data";

export const revalidate = 60;

function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    // youtu.be/<id>
    if (u.hostname === "youtu.be") {
      return `https://www.youtube.com/embed${u.pathname}`;
    }
    // youtube.com/watch?v=<id>
    if (u.hostname.includes("youtube.com") && u.searchParams.get("v")) {
      return `https://www.youtube.com/embed/${u.searchParams.get("v")}`;
    }
    // youtube.com/embed/<id> — already an embed URL
    if (
      u.hostname.includes("youtube.com") &&
      u.pathname.startsWith("/embed/")
    ) {
      return url;
    }
  } catch {}
  return null;
}

function VideoPlayer({ url }: { url: string }) {
  const ytEmbed = getYouTubeEmbedUrl(url);
  if (ytEmbed) {
    return (
      <div className="aspect-video">
        <iframe
          src={ytEmbed}
          className="w-full h-full rounded-sm border border-[#1f1f1f]"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
  // Loom
  if (url.includes("loom.com/share/")) {
    const embedUrl = url.replace("loom.com/share/", "loom.com/embed/");
    return (
      <div className="aspect-video">
        <iframe
          src={embedUrl}
          className="w-full h-full rounded-sm border border-[#1f1f1f]"
          allowFullScreen
        />
      </div>
    );
  }
  // Direct video file (Supabase upload or any mp4/webm URL)
  return (
    <video controls className="w-full rounded-sm border border-[#1f1f1f]">
      <source src={url} />
      Your browser does not support the video tag.
    </video>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug, published: true },
  });
  if (!project) return {};
  return generateSEO({
    title: project.title,
    description: project.problem.slice(0, 160),
    path: `/case-studies/${project.slug}`,
    image: project.coverImage || undefined,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug, published: true },
  });
  if (!project) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
  const schema = caseStudySchema(
    project.title,
    project.problem.slice(0, 160),
    `${siteUrl}/case-studies/${project.slug}`,
    project.createdAt.toISOString(),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />
      <main className="min-h-screen pt-24 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-[#888888] hover:text-[#ff5500] font-mono text-sm mb-12 transition-colors"
          >
            <ArrowLeft size={14} /> All Case Studies
          </Link>

          {/* Header */}
          <div className="mb-8">
            {project.industry && (
              <span className="text-[#ff5500] font-mono text-xs uppercase tracking-widest">
                {project.industry}
              </span>
            )}
            <h1 className="font-sans font-extrabold text-4xl md:text-5xl text-white mt-2 mb-4">
              {project.title}
            </h1>
            {project.client && (
              <p className="text-[#888888] font-mono text-sm">
                Client: {project.client}
              </p>
            )}
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-12">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="border border-[#ff5500]/40 text-[#ff5500] text-xs font-mono px-3 py-1 rounded-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Cover image */}
          {project.coverImage && (
            <div className="mb-12 border border-[#1f1f1f] rounded-sm overflow-hidden">
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full object-cover"
              />
            </div>
          )}

          {/* Problem */}
          <section className="mb-12 border-t border-[#1f1f1f] pt-10">
            <h2 className="font-sans font-bold text-2xl text-white mb-4">
              The Problem
            </h2>
            <p className="text-[#888888] font-mono text-sm leading-relaxed">
              {project.problem}
            </p>
          </section>

          {/* Solution */}
          <section className="mb-12 border-t border-[#1f1f1f] pt-10">
            <h2 className="font-sans font-bold text-2xl text-white mb-4">
              How We Solved It
            </h2>
            <p className="text-[#888888] font-mono text-sm leading-relaxed">
              {project.solution}
            </p>
          </section>

          {/* Deliverables */}
          <section className="mb-12 border-t border-[#1f1f1f] pt-10">
            <h2 className="font-sans font-bold text-2xl text-white mb-6">
              Deliverables
            </h2>
            <ul className="space-y-3">
              {project.deliverables.map((d) => (
                <li
                  key={d}
                  className="flex items-start gap-2 text-[#888888] font-mono text-sm"
                >
                  <Check size={14} className="text-[#ff5500] mt-0.5 shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </section>

          {/* Results */}
          {project.results.length > 0 && (
            <section className="mb-12 border border-[#ff5500]/20 bg-[#ff5500]/5 p-8 rounded-sm">
              <h2 className="font-sans font-bold text-xl text-white mb-4">
                Results & Impact
              </h2>
              <ul className="space-y-3">
                {project.results.map((r) => (
                  <li
                    key={r}
                    className="flex items-start gap-2 text-[#f5f5f5] font-mono text-sm"
                  >
                    <Check
                      size={14}
                      className="text-[#ff5500] mt-0.5 shrink-0"
                    />
                    {r}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Video */}
          {project.videoUrl && (
            <section className="mb-12 border-t border-[#1f1f1f] pt-10">
              <h2 className="font-sans font-bold text-2xl text-white mb-6">
                Demo
              </h2>
              <VideoPlayer url={project.videoUrl} />
            </section>
          )}

          {/* Additional images */}
          {project.images.length > 0 && (
            <section className="mb-12 border-t border-[#1f1f1f] pt-10">
              <h2 className="font-sans font-bold text-2xl text-white mb-6">
                Assets
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${project.title} screenshot ${i + 1}`}
                    className="w-full rounded-sm border border-[#1f1f1f] object-cover"
                  />
                ))}
              </div>
            </section>
          )}

          {/* Live URL */}
          {project.liveUrl && (
            <div className="border-t border-[#1f1f1f] pt-10 mb-12">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#ff5500] text-[#ff5500] px-6 py-3 font-mono text-sm hover:bg-[#ff5500] hover:text-white transition-all rounded-sm"
              >
                View Live Project <ExternalLink size={14} />
              </a>
            </div>
          )}

          {/* CTA */}
          <div className="border-t border-[#1f1f1f] pt-12 text-center">
            <h2 className="font-sans font-bold text-2xl text-white mb-3">
              Want Results Like These?
            </h2>
            <p className="text-[#888888] font-mono text-sm mb-6">
              Book a free audit and we&apos;ll identify your top automation
              opportunities.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-[#ff5500] text-white px-8 py-3 font-mono text-sm hover:bg-[#ff5500]/90 transition-all rounded-sm"
            >
              Book Free Audit →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
