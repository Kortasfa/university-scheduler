'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '../ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";

const Header = () => {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(Boolean)

  return (
    <div className="sticky top-0 z-10 flex h-[57px] w-full items-center justify-between border-b bg-background px-4">
      <Breadcrumb>
        <BreadcrumbList>
          {pathSegments.map((segment, index) => (
            <React.Fragment key={segment}>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${pathSegments.slice(0, index + 1).join('/')}`}>
                  {segment.charAt(0).toUpperCase() + segment.slice(1)}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index < pathSegments.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Settings className="size-4" />
            <span className="sr-only">Settings</span>
          </Button>
        </DrawerTrigger>
        {/* Add DrawerContent here if needed */}
      </Drawer>
    </div>
  );
};

export default Header;