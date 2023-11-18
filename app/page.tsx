import Image from "next/image";
import { Inter } from "next/font/google";
import { allPosts } from "contentlayer/generated";
import Link from "next/link";
import { compareDesc, format } from "date-fns";
import PostCard from "./components/PostCard";
import SectionHeader from "./components/SectionHeader";
import { siteConfig } from "./config/site";

const posts = allPosts
  .filter((item) => !item.draft && !item.hide && !item.archive)
  .sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });

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
            or working on side projects to learn more about the space.
          </p>
          <p className="leading-7">
            I've been documenting that journey using a{" "}
            <Link
              className="font-medium text-primary underline underline-offset-4"
              href="/work-log"
            >
              Work Log
            </Link>{" "}
            and have recently shipped some interesting projects such as
          </p>
          <ol className="leading-7 list-disc">
            <li className="ml-8">
              <Link
                href="https://jxnl.github.io/instructor/blog/2023/11/05/chain-of-density/"
                className="font-medium text-primary underline underline-offset-4"
              >
                Finetuning GPT-3.5 to match GPT-4's summarization capabilities
              </Link>{" "}
              that produced a model almost 50x cheaper and 20x faster than GPT-4
              with similar summarization skills
            </li>
          </ol>
          <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
            Recent Posts
          </h3>
          <p className="leading-7">
            Here are some posts which I&apos;ve recently published which you
            might be interested in.
          </p>
          <ul className="ml-2 [&>li]:mt-2 space-y-4 leading-7">
            {posts.slice(0, 10).map((item) => {
              return (
                <li key={item.slug}>
                  <Link
                    href={`/blog/${item.slug}`}
                    className=" hover:underline"
                  >
                    <h3>{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{`${item.description.slice(
                      0,
                      100
                    )}${item.description.length > 100 ? "..." : ""}`}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
    // <div>
    //   <div className="my-10 ">
    //     <SectionHeader title="" description="About Me" />
    //     <p className="text-sm leading-6 px-4 mt-4">
    //       I&apos;m a software engineer based in Singapore. I&apos;m interested
    //       in a variety of different areas - including web3, Generative AI and
    //       most recently gardening.{" "}
    //     </p>

    //     <p className="mt-2 text-sm leading-6 px-4">
    //       You can find out more about me via my writings, projects and other
    //       social media accounts. Feel free to drop me a dm @ivanleomk on twitter
    //       for any collaboration, inquiries or more.
    //     </p>
    //     <p className="mt-2 text-sm leading-6 px-4">
    //       To see a list of everything that I&apos;ve been working on for the past few months to understand the AI Space, you can check out my <Link
    //         className="underline hover:font-bold cursor-pointer transition duration-600 ease-in-out"
    //         href="/work-log">Work Log</Link>
    //     </p>

    //     <hr className="my-8 border-slate-200 w-40 mx-auto" />
    //     <SectionHeader title="" description="Recent Posts">
    //       <div className="mx-4">
    //         {posts.slice(0, 5).map((post) => (
    //           <PostCard key={post._id} post={post} />
    //         ))}
    //       </div>
    //     </SectionHeader>
    //     <div className="my-4 h-4" />
    //   </div>
    //   <div className="mb-10 h-2" />
    // </div>
  );
}
