"use client"


import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import ThemeBtn from "./theme-btn"
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function SiteHeader({
  title,
  showBackBtn
}: {
  title: string;
  showBackBtn: boolean;
}) {

  const router = useRouter()

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        {
          showBackBtn && <Button variant="ghost" className="cursor-pointer" onClick={() => router.back()}>
            <ArrowLeft />
          </Button>
        }
        <h1 className="text-base font-medium">{title}</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              GitHub
            </a>
          </Button>
          {/* <ThemeBtn /> */}
        </div>
      </div>
    </header>
  )
}
