import { allPosts } from "@/.contentlayer/generated";
import PostCard from "@/app/components/PostCard";
import SectionHeader from "@/app/components/SectionHeader";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

type Params = {
  name: string;
};

const getPosts = (params: Params) => {
  return allPosts.filter((item) => {
    return (
      item.parsed_tags.filter((tag: { name: string; slug: string }) => {
        return tag.slug === params.name;
      }).length > 0
    );
  });
};

const Page = ({ params }: { params: Params }) => {
  const Posts = getPosts(params);

  if (!Posts.length) {
    return (
      <>
        <Link className="flex items-center mb-10" href="/posts">
          <ArrowLeftIcon className="w-4 h-4" />
          <p className="text-sm">See All Posts</p>
        </Link>
        <SectionHeader
          title="No Posts Found"
          description={`There are no posts tagged under the tag ${params.name}`}
        />
      </>
    );
  }

  const categoryName = Posts[0].parsed_tags?.filter(
    (tag: { name: string; slug: string }) => {
      return tag.slug === params.name;
    }
  )[0].name;

  return (
    <>
      <Link className="flex items-center mb-10" href="/posts">
        <ArrowLeftIcon className="w-4 h-4" />
        <p className="text-sm">See All Posts</p>
      </Link>
      <SectionHeader
        title={categoryName}
        description={`Here are all the posts tagged under the tag ${params.name}`}
      >
        {Posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </SectionHeader>
    </>
  );
};

export default Page;
