"use client";
import React from "react";
import GithubSlugger from "github-slugger";
import Link from "next/link";

type Props = {
  source: string;
  postClickHook?: () => void;
};

const PostTableOfContent = ({ source, postClickHook }: Props) => {
  const headings = source.split("\n").filter((line) => line.match(/^#{2,3}\s/));
  return (
    <div className="sticky top-16 pt-4">
      <p className="hidden lg:block mt-10">On This Page</p>
      <ul className="m-0 list-none">
        {headings.map((raw) => {
          const level = raw.match(/^###*\s/)?.at(0)?.length;
          const text = raw.replace(/^###*\s/, "");

          const slugger = new GithubSlugger();
          const id = slugger.slug(text.trim());

          return (
            <li
              key={text}
              className={`${level === 3 ? "pl-2" : "pl-4"} list-none`}
            >
              <a
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  console.log(id);
                  const element = document.querySelector<any>(`#${id}`);
                  if (postClickHook) {
                    postClickHook();
                  }
                  const y =
                    element.getBoundingClientRect().top +
                    window.pageYOffset -
                    200;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }}
                className="cursor-pointer inline-block no-underline my-0.5 transition-colors hover:text-foreground text-muted-foreground"
              >
                {text}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PostTableOfContent;
