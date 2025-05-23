"use client";

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

import { Separator } from "@/components/ui/separator";
import { DataTableDemo } from "@/components/todo-table";
import { DialogDemo } from "@/components/todo-create";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { LoaderCircle } from "lucide-react";

import { getUserTodos } from "@/lib/firebaseConfig";

import { useRequireAuth } from "@/hooks/useRequireAuth";

import { useToast } from "@/hooks/use-toast";

export type Todo = {
  id: string;
  title: string;
  description: string;
};

export default function Page() {
  const { user, loading } = useRequireAuth();
  const [data, setData] = useState<Todo[] | undefined>();
  const { toast } = useToast();

  useEffect(() => {
    getUserTodos()
      .then((data) => {
        setData(data as Todo[]);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do usuário:", error);
      });
    toast({
      description: (
        <>
          <LoaderCircle className="animate-spin inline" /> Loading...
        </>
      ),
      duration: 1000,
    });
  }, [user, toast]);

  if (loading || !user || !data) {
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar
        user={{
          name: user?.displayName || "",
          email: user?.email || "",
          avatar: user?.photoURL || "",
        }}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Todos</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <DialogDemo />
          <DataTableDemo data={data} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
