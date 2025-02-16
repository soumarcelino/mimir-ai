"use client"


import * as React from "react"
import {
  ListTodo,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Prioridades",
      url: "#",
      icon: ListTodo,
      isActive: true,
      items: [
        {
          title: "Criadas",
          url: "#",
        },
        {
          title: "Priorizadas",
          url: "#",
        },
        {
          title: "Em execução",
          url: "#",
        },
      ],
    }]
}

export function AppSidebar({ user, ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} user={user}>
      <SidebarHeader>
       <NavUser user={user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  )
}
