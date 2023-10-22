import { allPosts } from "@/.contentlayer/generated";
import React from "react";
import { getMDXComponent } from "next-contentlayer/hooks";
import Link from "next/link";
import CodeTitle from "@/app/components/CodeTitle";
import { clsxm } from "@/app/utils/css";
import Callout from "@/app/components/Callout";
import KommyImage from "@/app/components/KommyImage";
import KommyLink from "@/app/components/KommyLink";
import Pre from "@/app/components/Pre";
import { getAllTweetData } from "@/app/utils/tweet";
import TableOfContents from "@/app/components/TableOfContent";
import { Tweet } from "react-tweet";
import "katex/dist/katex.min.css";
//@ts-ignore
import { InlineMath, BlockMath } from "react-katex";
import { CodeBlocks } from "@/app/components/CodeBlocks";
import PostTableOfContent from "@/app/components/PostTableOfContent";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import MobileTableOfContent from "@/app/components/MobileTableOfContent";
import { cn } from "@/app/lib/utils";
import { badgeVariants } from "@/app/components/ui/badge";
import { format } from "date-fns";

type Params = {
  name: string;
};

const getPost = (params: Params) => {
  return allPosts.filter((item) => {
    return item.slug === params.name;
  })[0];
};

export async function generateMetadata({ params }: { params: Params }) {
  const post = getPost(params);
  return {
    title: post.title,
    description: post.description,
  };
}

const BlogPage = async ({ params }: { params: Params }) => {
  const post = getPost(params);
  const Content = getMDXComponent(post.body.code);

  return (
    <div className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <div className="mb-10">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl mb-2 lg:leading-[1.1]">
            {post.title}
          </h1>
          <span className="max-w-[750px] mt-2 text-lg text-muted-foreground sm:text-xl">
            {post.description}
          </span>
          <p className="text-sm text-muted-foreground mt-2">
            Published {format(new Date(post.date), "dd MMMM, yyyy")}
          </p>
          <div className="flex items-center space-x-2 pt-4">
            {post.parsed_tags
              .filter((item: { name: string; slug: string }) => {
                return item?.name != "Notes";
              })
              .map((item: { name: string; slug: string }) => {
                return (
                  <Link
                    key={item.slug}
                    href={`category/${item.slug}`}
                    className={cn(
                      badgeVariants({
                        variant: "secondary",
                      })
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
          </div>
        </div>
        <article>
          <Content components={{ ...CodeBlocks }} />
        </article>
      </div>
      <MobileTableOfContent source={post.body.raw} />

      <div className="hidden text-sm xl:block">
        <PostTableOfContent source={post.body.raw} />
      </div>
    </div>
  );
};

export default BlogPage;
