import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { LifeBuoy, SquareUser, Triangle } from "lucide-react";
import { SIDENAV_ITEMS } from "@/styles/constants";
import { SideNavItem } from "@/styles/types";
import { ThemeSwitcher } from "../theme-switcher";

const BOTTOM_ITEMS = [
  { icon: <LifeBuoy className="h-4 w-4" />, title: "Help", path: "/help" },
  {
    icon: <SquareUser className="h-4 w-4" />,
    title: "Account",
    path: "/account",
  },
];

const SideNav = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden md:flex h-full w-[56px] flex-col border-r bg-background">
      <div className="border-b p-2">
        <Button variant="outline" size="icon" aria-label="Home">
          <Triangle className="size-5 fill-foreground" />
        </Button>
      </div>
      <nav className="grid gap-1 p-2">
        {SIDENAV_ITEMS.map((item) => <NavItem key={item.path} {...item} />)}
      </nav>
      <nav className="mt-auto grid gap-1 p-2">
        {BOTTOM_ITEMS.map((item) => <NavItem key={item.path} {...item} />)}
        <ThemeSwitcher />
      </nav>
    </aside>
  );
};

const NavItem = ({ icon, title, path }: SideNavItem) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            asChild
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-lg",
              // isActive && "bg-muted"
            )}
          >
            <Link href={path}>
              {icon}
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={5}>
          {title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SideNav;
