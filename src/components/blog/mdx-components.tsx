import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { AppletEmbed } from "./applet-embed";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

export const mdxComponents: MDXComponents = {
  h1: ({ children, ...props }) => (
    <h1
      className="font-heading text-3xl md:text-4xl font-bold text-charcoal mt-12 mb-6 leading-tight"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => {
    const id = typeof children === "string" ? slugify(children) : undefined;
    return (
      <h2
        id={id}
        className="font-heading text-[1.6rem] md:text-[1.85rem] font-semibold text-charcoal mt-12 mb-5 leading-snug scroll-mt-24"
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }) => {
    const id = typeof children === "string" ? slugify(children) : undefined;
    return (
      <h3
        id={id}
        className="font-heading text-[1.3rem] md:text-[1.4rem] font-semibold text-charcoal mt-10 mb-4 leading-snug scroll-mt-24"
        {...props}
      >
        {children}
      </h3>
    );
  },
  p: ({ children, ...props }) => (
    <p className="text-charcoal/85 leading-[1.85] mb-6 text-lg" {...props}>
      {children}
    </p>
  ),
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent-hover underline underline-offset-2 decoration-accent/30 hover:decoration-accent transition-colors"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href || "#"}
        className="text-accent hover:text-accent-hover underline underline-offset-2 decoration-accent/30 hover:decoration-accent transition-colors"
        {...props}
      >
        {children}
      </Link>
    );
  },
  ul: ({ children, ...props }) => (
    <ul className="list-disc pl-6 mb-6 space-y-2.5 text-charcoal/85 text-lg" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal pl-6 mb-6 space-y-2.5 text-charcoal/85 text-lg" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-[1.8]" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-[3px] border-accent/30 pl-5 py-2 my-6 text-charcoal/65 italic bg-warm/40 rounded-r-lg"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }) => (
    <code
      className="bg-warm px-1.5 py-0.5 rounded text-sm font-mono text-charcoal/90"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre
      className="bg-charcoal text-white/90 rounded-xl p-5 overflow-x-auto mb-6 text-sm leading-relaxed"
      {...props}
    >
      {children}
    </pre>
  ),
  img: ({ src, alt, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt || ""}
      className="rounded-xl my-6 w-full"
      loading="lazy"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-warm-dark" />,
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto my-6 rounded-xl border border-warm-dark">
      <table className="w-full text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th className="bg-warm px-4 py-3 text-left font-semibold text-charcoal border-b border-warm-dark" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-4 py-3 border-b border-warm-dark/50 text-charcoal/80" {...props}>
      {children}
    </td>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-charcoal" {...props}>
      {children}
    </strong>
  ),
  AppletEmbed,
};
