import { Post } from "@/.contentlayer/generated";
import Link from "next/link";
import React from "react";

type Props = {
  post: Post;
};

const PostCard = ({ post }: Props) => {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article
        key={post._id}
        className="flex transition: flex-col items-start justify-between  px-4 py-2 cursor-pointer rounded-lg w-100 "
      >
        <div className="group relative">
          <h3 className="mt-3 text-sm font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            {post.title}
          </h3>

          <div className="flex items-center gap-x-4 text-xs mt-1 mb-3">
            <time dateTime={post.date} className="text-gray-500">
              {post.parsed_date}
            </time>
          </div>
          <p className="my-2 line-clamp-3 text-sm leading-6 text-gray-600">
            {post.description}
          </p>
          <div className="text-xs my-2 space-x-2">
            {post.parsed_tags.map((item: { name: string; slug: string }) => {
              return (
                <Link
                  key={item.slug}
                  href={`category/${item.slug}`}
                  className=" rounded-md bg-gray-200 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default PostCard;
