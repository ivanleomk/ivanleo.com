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
import { getAllTweetData } from "@/app/utils/tweet";
import TableOfContents from "@/app/components/TableOfContent";
import { Tweet } from "react-tweet";
import 'katex/dist/katex.min.css';
//@ts-ignore
import { InlineMath, BlockMath } from 'react-katex';
import { CodeBlocks } from "@/app/components/CodeBlocks";


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
  const tweetDataCache = await getAllTweetData();
  const tweetData = tweetDataCache.data;
  const Content = getMDXComponent(post.body.code);

  const StaticTweet = ({ id }: { id: keyof typeof tweetData }) => {
    // Use the tweets map that is present in the outer scope to get the content associated with the id passed as prop
    // return <Tweet data={tweetData[id]} />;
    return <Tweet id={id} />
  };

  return (
    <div className="container relative py-6 lg:py-10">
      <Link className="flex text-sm items-center space-x-2 mb-4" href="/">
        <ArrowLeftIcon className="w-8 h-8" />
        <p>back?</p>
      </Link>
      <div className="grid gap-2 text-center">
        <h1 className="mt-2 inline-block text-md font-extrabold leading-tight text-slate-900 lg:text-2xl">
          {post.title}
        </h1>
        <p className="text-xs text-slate-600">{post.description}</p>
      </div>
      <hr className="my-8 border-slate-200 w-40 mx-auto" />
      <div className="flex flex-col lg:flex-row w-full">

        <div className="mx-4 order-1 lg:order-2 w-full lg:w-auto">
          <TableOfContents source={post.body.raw} />
        </div>
        <article className="max-w-full px-4 pb-8 text-dark  order-2 lg:order-1 lg:max-w-3xl">
          <Content components={{ ...CodeBlocks, StaticTweet }} />
        </article>
      </div>
    </div>
  );
};

export default BlogPage;
