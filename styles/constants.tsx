import { SideNavItem } from './types';
import { BookOpen, Calendar, Settings, Users } from 'lucide-react';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Courses',
    path: '/admin/courses',
    icon: <BookOpen className="h-4 w-4" />,
  },
  {
    title: 'Users',
    path: '/admin/users',
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: 'Calendar',
    path: '/admin/calendar',
    icon:  <Calendar className="h-4 w-4" />,
  },
  {
    title: 'Settings',
    path: '/admin/settings',
    icon:  <Settings className="h-4 w-4" />,
  },
];