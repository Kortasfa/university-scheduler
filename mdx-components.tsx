import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'
 
// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings
    h1: ({ children }) => (
      <h1 className="mt-8 mb-4 text-4xl font-bold tracking-tight text-foreground">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 mb-3 text-3xl font-semibold tracking-tight text-foreground">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 mb-3 text-2xl font-semibold tracking-tight text-foreground">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-4 mb-2 text-xl font-semibold tracking-tight text-foreground">{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 className="mt-4 mb-2 text-lg font-semibold tracking-tight text-foreground">{children}</h5>
    ),
    h6: ({ children }) => (
      <h6 className="mt-4 mb-2 text-base font-semibold tracking-tight text-foreground">{children}</h6>
    ),
    // Paragraph
    p: ({ children }) => (
      <p className="leading-7 [&:not(:first-child)]:mt-6 text-foreground">{children}</p>
    ),
    // Lists
    ul: ({ children }) => (
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>
    ),
    // Blockquote
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-border pl-6 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
    // Code
    code: ({ children }) => (
      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-foreground">
        {children}
      </code>
    ),
    // Links
    a: ({ children, href }) => (
      <a 
        href={href} 
        className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
      >
        {children}
      </a>
    ),
    // Images
    img: (props) => (
      <Image
        sizes="100vw"
        className="rounded-lg border border-border"
        {...(props as ImageProps)}
      />
    ),
    // Table
    table: ({ children }) => (
      <div className="my-6 w-full overflow-y-auto">
        <table className="w-full">{children}</table>
      </div>
    ),
    tr: ({ children }) => (
      <tr className="m-0 border-t border-border p-0 even:bg-muted">{children}</tr>
    ),
    th: ({ children }) => (
      <th className="border border-border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
        {children}
      </td>
    ),
    // Horizontal Rule
    hr: () => <hr className="my-4 border-border" />,
    ...components,
  }
}