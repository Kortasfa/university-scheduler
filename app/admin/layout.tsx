import type { Metadata } from 'next'
import { BookOpen, Settings, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


export const metadata: Metadata = {
  title: 'E-Learning Admin Dashboard',
  description: 'Admin dashboard for managing courses and users',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background">
      <div className="w-64 bg-card">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-2xl font-bold">E-Learning Admin</h1>
          </div>
          <nav className="flex-1 space-y-2 p-2">
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/admin/courses">
                <BookOpen className="mr-2 h-4 w-4" />
                Courses
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/admin/users">
                <Users className="mr-2 h-4 w-4" />
                Users
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/admin/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
          </nav>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}