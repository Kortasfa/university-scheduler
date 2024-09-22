'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SIDENAV_ITEMS } from '@/styles/constants';

const SideNav = () => {
  return (
    <div className="w-64 bg-card hidden md:flex">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold">E-Learning Admin</h1>
        </div>
        <nav className="flex-1 space-y-2 p-2">
          {SIDENAV_ITEMS(false).map((item, idx) => (
            <MenuItem key={idx} item={item} />
          ))}
        </nav>
      </div>
    </div>
  );
};

const MenuItem = ({ item }: { item: any }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => setSubMenuOpen(!subMenuOpen);

  return (
    <div>
      <Button
        asChild={!item.submenu}
        variant="ghost"
        className={cn("w-full justify-start", 
          pathname === item.path && "bg-accent text-accent-foreground"
        )}
        onClick={item.submenu ? toggleSubMenu : undefined}
      >
        {item.submenu ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              {item.icon}
              <span>{item.title}</span>
            </div>
            <ChevronDown className={cn("h-4 w-4 transition-transform", subMenuOpen && "rotate-180")} />
          </div>
        ) : (
          <Link href={item.path}>
            {item.icon}
            {item.title}
          </Link>
        )}
      </Button>
      {item.submenu && subMenuOpen && (
        <div className="ml-4 mt-2 space-y-2">
          {item.subMenuItems?.map((subItem: any, idx: number) => (
            <Button
              key={idx}
              asChild
              variant="ghost"
              className={cn("w-full justify-start", 
                pathname === subItem.path && "bg-accent text-accent-foreground"
              )}
            >
              <Link href={subItem.path}>{subItem.title}</Link>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SideNav;