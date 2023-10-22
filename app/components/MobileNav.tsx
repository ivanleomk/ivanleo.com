"use client";
import React from "react";
import { Button } from "@/components/ui/button";

import { Menu, ViewIcon } from "lucide-react";
import {
  SheetTrigger,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetDescription,
  SheetTitle,
} from "./ui/sheet";
import { siteConfig } from "../config/site";
import { navConfig } from "../config/navConfig";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MobileNav = () => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent position="left">
        <SheetHeader>
          <SheetTitle>
            <div
              onClick={() => {
                router.push("/");
                setOpen(false);
              }}
              className="text-left "
            >
              {siteConfig.name}
            </div>
          </SheetTitle>
          <div className="flex flex-col space-y-3 pt-6">
            {navConfig.mainNav.map((item) => {
              return (
                <div
                  className="text-left "
                  key={item.href}
                  onClick={() => {
                    router.push(item.href);
                    setOpen(false);
                  }}
                >
                  <h4>{item.title}</h4>
                </div>
              );
            })}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
