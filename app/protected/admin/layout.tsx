import type { Metadata } from 'next'
import SideNav from '@/components/header/side-nav'
import Header from '@/components/header/header'
import MobileNav from '@/components/header/mobile-nav'

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
    <div className="grid h-screen w-full md:pl-[56px]">
      <SideNav />
      <div className="flex-1 flex flex-col overflow-hidden bg-muted/40">
        <Header />
        {/* <HeaderMobile /> */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {children}
        </main>
        <MobileNav />
      </div>
    </div>
  )
}