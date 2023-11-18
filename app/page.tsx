import Image from "next/image";
import { Inter } from "next/font/google";
import { allPosts } from "contentlayer/generated";
import Link from "next/link";
import { compareDesc, format } from "date-fns";
import PostCard from "./components/PostCard";
import SectionHeader from "./components/SectionHeader";
import { siteConfig } from "./config/site";
import PostTitleAndDescriptionCard from "./components/PostTitleAndDescriptionCard";

const posts = allPosts
  .filter((item) => !item.draft && !item.hide && !item.archive)
  .sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });

const outsidePosts: { title: string; description: string; href: string }[] = [
  {
    title: "Finetuning GPT-3.5 to match GPT-4's summarization capabilities",
    description:
      "How you can finetune GPT3.5 to be 50x cheaper and 20x faster than GPT-4 with similar summarization skills",
    href: "https://jxnl.github.io/instructor/blog/2023/11/05/chain-of-density/",
  },
  {
    title: "Good LLM Validation is just Good Validation",
    description:
      "Integrating Pydantic Validation with Instructor to allow for more secure and consistent llm outputs",
    href: "https://jxnl.github.io/instructor/blog/2023/10/23/good-llm-validation-is-just-good-validation/",
  },
];

export default function Home() {
  return (
    <div className="flex-1 mb-6">
      <div className="container relative">
        <section className="flex max-w-[1100px] flex-col items-start gap-2 md:px-4 pt-8 md:pt-12 pb-8">
          <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            About Me
          </h2>
          <div
            dangerouslySetInnerHTML={{
              __html: siteConfig.about.description,
            }}
            className="leading-7 [&:not(:first-child)]:mt-6"
          />
          <p className="leading-7">
            Outside of work, I spend time contributing to libraries such as{" "}
            <Link
              className="font-medium text-primary underline underline-offset-4"
              href="https://jxnl.github.io/instructor/"
            >
              Instructor
            </Link>{" "}
            or working on side projects to learn more about the space which
            I&apos;ve been documenting here in posts or in a small long post I
            call a{" "}
            <Link
              className="font-medium text-primary underline underline-offset-4"
              href="/work-log"
            >
              Work Log
            </Link>
          </p>

          <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
            Recent Posts
          </h3>
          <p className="leading-7">
            Here are some posts which I&apos;ve recently published which you
            might be interested in.
          </p>
          <ul className="ml-2 [&>li]:mt-2 space-y-4 leading-7">
            {outsidePosts
              .concat(
                posts.map((item) => {
                  return {
                    title: item.title,
                    description: item.description,
                    href: `/blog/${item.slug}`,
                  };
                })
              )
              .slice(0, 10)
              .map((item) => {
                return (
                  <PostTitleAndDescriptionCard
                    key={item.title}
                    title={item.title}
                    description={item.description}
                    href={item.href}
                  />
                );
              })}
          </ul>
        </section>
      </div>
    </div>
  );
}
