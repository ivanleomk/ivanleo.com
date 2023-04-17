import { allPosts } from "@/.contentlayer/generated";
import React from "react";

type Params = {
  name: string;
};

export const getPosts = (params: Params) => {
  return allPosts.filter((item) => {
    return (
      item.parsed_tags.filter((tag: { name: string; slug: string }) => {
        return tag.slug === params.name;
      }).length > 0
    );
  });
};

const Page = ({ params }) => {
  const Posts = getPosts(params);
  return <div>Page</div>;
};

export default Page;
