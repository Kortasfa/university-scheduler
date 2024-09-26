'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SIDENAV_ITEMS } from '@/styles/constants';

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <>
      <div className="h-16 md:hidden" /> {/* Spacer div */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-background z-50">
        <nav className="flex justify-around items-center h-16">
          {SIDENAV_ITEMS.map((item, idx) => (
            <Button
              key={idx}
              asChild
              variant="ghost"
              className={cn(
                "flex-col h-full rounded-none",
                pathname.includes(item.path) && "bg-accent text-accent-foreground"
              )}
            >
              <Link href={item.path}>
                {item.icon}
                <span className="text-xs mt-1">{item.title}</span>
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </>
  );
}