import { SideNavItem } from './types';
import { Calendar, Users } from 'lucide-react';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Users',
    path: '/protected/admin/users',
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: 'Calendar',
    path: '/protected/admin/calendar',
    icon: <Calendar className="h-4 w-4" />,
  },
];