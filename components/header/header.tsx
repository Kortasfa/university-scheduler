'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '../ui/breadcrumb';

const Header = () => {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(Boolean)

  return (
    <div className="sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200">
      <div className="flex h-[47px] items-center justify-between px-4">
        <Breadcrumb className='flex items-center space-x-4 px-6'>
          <BreadcrumbList>
            {pathSegments.slice(1).map((segment, index) => (
              <>
                <BreadcrumbItem key={segment}>
                  <BreadcrumbLink href={`/admin/${pathSegments.slice(1, index + 2).join('/')}`}>
                    {segment.charAt(0).toUpperCase() + segment.slice(1)}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index < pathSegments.length - 2 && <BreadcrumbSeparator />}
              </>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default Header;