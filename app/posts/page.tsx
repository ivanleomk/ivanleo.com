import React, { Suspense } from "react";
import { compareDesc, format, parseISO } from "date-fns";
import { allPosts } from "@/.contentlayer/generated";
import SectionHeader from "../components/SectionHeader";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import PostCard from "../components/PostCard";
import UserPostSearch from "../components/UserPostSearch";
import { GridLoader } from "react-spinners";
import PostSpinner from "../components/PostSpinner";

const getValidPosts = async (query: string | null) => {
  return allPosts.filter(item => !item.draft).sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  }).filter(item => {
    if (!query) {
      return true
    }
    return item.title.toLowerCase().includes(query.toLowerCase()) || item.description.toLowerCase().includes(query.toLowerCase())
  })
}

const PostPage = async ({ searchParams }: {
  searchParams: {
    [k: string]: undefined | string | string[]
  }
}) => {
  // Post page can take in a param
  const query = typeof searchParams.query === "string" ? searchParams.query : null
  const posts = await getValidPosts(query)



  return (
    <>
      <h1 className="mt-10 text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">All Posts</h1>
      <span className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
        arranged by date published
      </span>
      <UserPostSearch />
      <Suspense fallback={<PostSpinner />}>
        <span className="max-w-[750px] text-sm text-muted-foreground">
          Loaded a total of {posts.length} posts
        </span>
        {posts
          .filter((item) => !item.categories?.includes("Notes"))
          .map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
      </Suspense>
    </>
  );
};


export default PostPage;
