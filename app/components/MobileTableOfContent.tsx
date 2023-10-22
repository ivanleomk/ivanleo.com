"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Menu } from "lucide-react";
import PostTableOfContent from "./PostTableOfContent";

type Props = {
  source: string;
};

const MobileTableOfContent = ({ source }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="xl:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <div className="fixed bottom-10 right-10 bg-white border px-2 py-2 rounded-lg z-20">
            <Menu />
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>On This Page</SheetTitle>
            <div className="py-1" />
            <PostTableOfContent
              postClickHook={() => setOpen(false)}
              source={source}
            />
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileTableOfContent;
