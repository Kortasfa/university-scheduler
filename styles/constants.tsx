import { SideNavItem } from './types';
import { Calendar, Layers } from 'lucide-react';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Resources',
    path: '/protected/admin/resources',
    icon: <Layers className="h-4 w-4" />,
  },
  {
    title: 'Calendar',
    path: '/protected/admin/calendar',
    icon: <Calendar className="h-4 w-4" />,
  },
];

export const USER_COLUMNS = [
  { header: "Avatar", accessorKey: "avatar" as const, style: "w-10 h-10" },
  { header: "Name", accessorKey: "name" as const, style: "font-medium" },
  { header: "Group", accessorKey: "group" as const },
  { header: "Role", accessorKey: "role" as const },
]

export const GROUP_COLUMNS = [
  { header: "Name", accessorKey: "name" as const, style: "font-medium" },
  { header: "Description", accessorKey: "description" as const },
]