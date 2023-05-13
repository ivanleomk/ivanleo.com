import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import PostCard from "../components/PostCard";
import SectionHeader from "../components/SectionHeader";
import { allPosts } from "@/.contentlayer/generated";
import { compareDesc } from "date-fns";

const posts = allPosts.sort((a, b) => {
  return compareDesc(new Date(a.date), new Date(b.date));
});

const Notes = () => {
  return (
    <>
      <Link className="flex items-center mb-10" href="/">
        <ArrowLeftIcon className="w-4 h-4" />
        <p className="text-sm">Back to Home</p>
      </Link>
      <SectionHeader
        title={"All Notes"}
        description={`All my notes on the individual courses I'm currently taking `}
      >
        {posts
          .filter((item) => item.categories?.includes("Notes"))
          .map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
      </SectionHeader>
    </>
  );
};

export default Notes;
