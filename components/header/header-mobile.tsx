'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ChevronDown } from 'lucide-react';
import { SIDENAV_ITEMS } from '@/styles/constants';

const HeaderMobile = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4">
          {SIDENAV_ITEMS(false).map((item, idx) => (
            <MenuItem key={idx} item={item} />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

const MenuItem = ({ item }: { item: any }) => {
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => setSubMenuOpen(!subMenuOpen);

  return (
    <div>
      <Button
        asChild={!item.submenu}
        variant="ghost"
        className="w-full justify-start"
        onClick={item.submenu ? toggleSubMenu : undefined}
      >
        {item.submenu ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              {item.icon}
              <span>{item.title}</span>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${subMenuOpen ? 'rotate-180' : ''}`} />
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
              className="w-full justify-start"
            >
              <Link href={subItem.path}>{subItem.title}</Link>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderMobile;