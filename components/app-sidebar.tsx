"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  useSidebar,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { menu } from "@/app/constants";
import { NavUser } from "./nav-user";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDashboardContext } from "@/app/context/DashboardContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { ProfileApi } from "@/app/api/profile";
import { useQuery } from "@tanstack/react-query";
import { useIsMobile } from "@/hooks/use-mobile";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { role } = useDashboardContext();
  const { open } = useSidebar();
  const isCollapsed = !open;

  const isMobile = useIsMobile();
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: ProfileApi.getProfile,
  });

  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="shadow-xl bg-background dark"
    >
      <SidebarHeader className="bg-background px-0! dark">
        <SidebarGroup className="py-0!">
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              <SidebarMenuItem>
                {!isMobile ? (
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger
                        asChild
                        className="px-0! group-data-[collapsible=icon]:p-0!"
                      >
                        <SidebarMenuButton>
                          <SidebarTrigger className="p-0!" />
                          {!isCollapsed && (
                            <span className="font-bold text-foreground">
                              CareerScaleUp
                            </span>
                          )}
                        </SidebarMenuButton>
                      </TooltipTrigger>

                      {isCollapsed && (
                        <TooltipContent
                          side="right"
                          className="py-1 text-sm"
                        >
                          CareerScaleUp
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <SidebarMenuButton>
                    <SidebarTrigger className="p-0!" />
                    <span className="font-bold">CareerScaleUp</span>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>

      <SidebarContent className="bg-background dark">
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2 dark">
            <SidebarMenu className="gap-4">
              {menu[role]?.map((item) => {
                if (!item.href || item.href === "#" || item.href === "") {
                  return null;
                }

                const Button = (
                  <Link href={item.href}>
                    <SidebarMenuButton
                      isActive={item.href === pathname}
                      className="py-2 font-bold"
                    >
                      {item.icon && (
                        <div className="text-foreground">
                          <item.icon />
                        </div>
                      )}
                      {(!isCollapsed || isMobile) && (
                        <span className="text-foreground">
                          {item.name.toUpperCase()}
                        </span>
                      )}
                    </SidebarMenuButton>
                  </Link>
                );

                return (
                  <SidebarMenuItem key={item.href}>
                    {!isMobile ? (
                      <TooltipProvider delayDuration={0}>
                        <Tooltip>
                          <TooltipTrigger asChild>{Button}</TooltipTrigger>
                          {isCollapsed && (
                            <TooltipContent
                              side="right"
                              className="px-2 py-1 text-sm"
                            >
                              {item.name}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      Button
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-background">
        <NavUser user={profile} />
      </SidebarFooter>
    </Sidebar>
  );
}
