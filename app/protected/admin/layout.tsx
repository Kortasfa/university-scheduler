import type { Metadata } from 'next'
import SideNav from '@/components/header/side-nav'
import MobileNav from '@/components/header/mobile-nav'
import { EnvVarWarning } from '@/components/env-var-warning'
import HeaderAuth from '@/components/header-auth'
import { hasEnvVars } from '@/utils/supabase/check-env-vars'
import { Toaster } from "@/components/ui/toaster"
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
    <>
      <div className="grid h-screen w-full md:pl-[56px]">
        <SideNav />
        <div className="flex-1 flex flex-col overflow-hidden bg-muted/40">
          {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
          {/* <HeaderMobile /> */}
          <main className="flex-1 overflow-auto p-4 lg:p-6">
            {children}
          </main>
          <MobileNav />
        </div>
      </div>
      <Toaster />
    </>
  )
}