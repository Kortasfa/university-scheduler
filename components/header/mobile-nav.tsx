'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SIDENAV_ITEMS } from '@/styles/constants';

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-muted/100 p-1">
      <nav className="flex justify-around items-center h-14">
        {SIDENAV_ITEMS(true).map((item, idx) => (
          <Button
            key={idx}
            asChild
            variant="ghost"
            className={cn(
              "flex-col h-full",
              pathname === item.path && "bg-accent text-accent-foreground"
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
  );
};

export default MobileNav;