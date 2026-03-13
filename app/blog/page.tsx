import Link from "next/link";

import SplitScreenPromo from "@/components/features/split-screen-promo";
import { BLOG_POSTS } from "@/lib/constants";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articulos sobre salud quiropractica, postura, bienestar y tratamientos especializados.",
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("es-PR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  return (
    <SplitScreenPromo>
      <div className="px-8 sm:px-12 py-12 lg:py-16">
        <p className="text-teal text-[11px] font-bold tracking-[0.4em] uppercase mb-3">
          Articulos
        </p>
        <h2 className="font-display text-2xl font-bold text-charcoal mb-2">
          Blog
        </h2>
        <div className="gold-line mb-10" />

        <div className="space-y-6">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="group p-7 bg-cream border border-charcoal/[0.04] hover:border-teal/15 transition-all duration-300"
            >
              <div className="flex items-center gap-3 text-[11px] text-charcoal/30 tracking-wider mb-3">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span className="w-1 h-1 rounded-full bg-charcoal/15" />
                <span>{post.readTime} lectura</span>
              </div>

              <h3 className="font-display text-lg font-bold text-charcoal group-hover:text-teal transition-colors duration-300 mb-3">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>

              <p className="text-charcoal/45 text-sm leading-[1.8]">
                {post.excerpt}
              </p>

              <div className="mt-5 w-0 group-hover:w-10 h-0.5 bg-gold transition-all duration-500 ease-out" />
            </article>
          ))}
        </div>
      </div>
    </SplitScreenPromo>
  );
}
