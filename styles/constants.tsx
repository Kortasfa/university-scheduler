import { SideNavItem } from './types';
import { BookOpen, Settings, Users } from 'lucide-react';

export const SIDENAV_ITEMS = (isMobile: boolean): SideNavItem[] => [
  {
    title: 'Courses',
    path: '/admin/courses',
    icon: isMobile ? <BookOpen className="h-4 w-4" /> : <BookOpen className="mr-2 h-4 w-4" />,
  },
  {
    title: 'Users',
    path: '/admin/users',
    icon: isMobile ? <Users className="h-4 w-4" /> : <Users className="mr-2 h-4 w-4" />,
  },
  {
    title: 'Settings',
    path: '/admin/settings',
    icon:  isMobile ? <Settings className="h-4 w-4" /> : <Settings className="mr-2 h-4 w-4" />,
  },
];