'use client'

import { ReactNode } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { usePathname } from 'next/navigation'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(Boolean)

  return (
    <div className="container mx-auto p-4">
     
      {children}
    </div>
  )
}