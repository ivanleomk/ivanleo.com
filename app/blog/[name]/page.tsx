import { allPosts } from "@/.contentlayer/generated";
import React from "react";
import { getMDXComponent } from "next-contentlayer/hooks";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type Params = {
  name: string;
};

export const getPost = (params: Params) => {
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
        <Content />
      </div>
    </div>
  );
};

export default BlogPage;
