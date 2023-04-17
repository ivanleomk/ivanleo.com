import React from "react";
import { compareDesc, format, parseISO } from "date-fns";
import { allPosts } from "@/.contentlayer/generated";
import SectionHeader from "../components/SectionHeader";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import PostCard from "../components/PostCard";

const posts = allPosts.sort((a, b) => {
  return compareDesc(new Date(a.date), new Date(b.date));
});

const PostPage = () => {
  return (
    <>
      <Link className="flex items-center mb-10" href="/">
        <ArrowLeftIcon className="w-4 h-4" />
        <p className="text-sm">Back to Home</p>
      </Link>
      <SectionHeader
        title={"All Posts"}
        description={`All posts arranged by chronological order `}
      >
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </SectionHeader>
    </>
  );
};

export default PostPage;
