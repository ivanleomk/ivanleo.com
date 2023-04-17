import { allPosts } from "@/.contentlayer/generated";
import React from "react";
import { getMDXComponent } from "next-contentlayer/hooks";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import CodeTitle from "@/app/components/CodeTitle";
import { clsxm } from "@/app/utils/css";
import Callout from "@/app/components/Callout";
import KommyImage from "@/app/components/KommyImage";
import KommyLink from "@/app/components/KommyLink";
import Pre from "@/app/components/Pre";

type Params = {
  name: string;
};

const CodeBlocks = {
  Callout,
  CodeTitle,
  KommyImage,
  KommyLink,
  a: ({ ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="animated-underline border-b border-dotted border-dark hover:border-dark/0"
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={clsxm(
        "text-xl leading-7 [&:not(:first-child)]:mt-6",
        className
      )}
      {...props}
    />
  ),
  ul: ({ ...props }) => (
    <ul className="my-6 ml-6 list-outside list-disc text-xl" {...props} />
  ),
  ol: ({ ...props }) => (
    <ol className="my-6 ml-6 list-outside list-decimal text-xl" {...props} />
  ),
  li: ({ ...props }) => <li className="mt-2" {...props} />,
  blockquote: ({
    className,
    ...props
  }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="mt-6 border-l-4 border-dark pl-6 italic text-dark [&>*]:text-zinc-600"
      {...props}
    />
  ),
  table: ({ ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 min-w-full overflow-y-auto rounded-md">
      <table className="min-w-full divide-y divide-gray-400" {...props} />
    </div>
  ),
  tr: ({ ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="m-0 p-0 even:bg-white" {...props} />
  ),
  th: ({ ...props }) => (
    <th
      className="border border-gray-400 bg-white px-4 py-2 text-left font-semibold [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    />
  ),
  td: ({ ...props }) => (
    <td
      className="border border-gray-400 px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={clsxm(
        "relative rounded border bg-gray-300 bg-opacity-25 py-[0.2rem] px-[0.3rem] font-mono text-base text-gray-600",
        className
      )}
      {...props}
    />
  ),
  pre: Pre,
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
    <div className="container relative py-6 lg:py-10">
      <Link className="flex items-center" href="/">
        <ArrowLeftIcon className="w-8 h-8" />
        <p>back</p>
      </Link>

      <div className="grid gap-2">
        <h1 className="mt-2 inline-block text-xl font-extrabold leading-tight text-slate-900 lg:text-2xl">
          {post.title}
        </h1>
        <p className="text-md text-slate-600">{post.description}</p>
      </div>
      <hr className="my-8 border-slate-200 w-40 mx-auto" />
      <div className="prose">
        <Content components={CodeBlocks} />
      </div>
    </div>
  );
};

export default BlogPage;
