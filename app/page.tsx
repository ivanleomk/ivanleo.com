import Image from "next/image";
import { Inter } from "next/font/google";
import { allPosts } from "contentlayer/generated";
import Link from "next/link";
import { compareDesc, format } from "date-fns";
import PostCard from "./components/PostCard";
import SectionHeader from "./components/SectionHeader";

const posts = allPosts.filter(item => !item.draft).sort((a, b) => {
  return compareDesc(new Date(a.date), new Date(b.date));
});

export default function Home() {
  return (
    <div>
      <div className="my-10 ">
        <SectionHeader title="" description="About Me" />
        <p className="text-sm leading-6 px-4 mt-4">
          I&apos;m a software engineer based in Singapore. I&apos;m interested
          in a variety of different areas - including web3, Generative AI and
          most recently gardening.{" "}
        </p>

        <p className="mt-2 text-sm leading-6 px-4">
          You can find out more about me via my writings, projects and other
          social media accounts. Feel free to drop me a dm @ivanleomk on twitter
          for any collaboration, inquiries or more.
        </p>
        <p className="mt-2 text-sm leading-6 px-4">
          To see a list of everything that I&apos;ve been working on for the past few months to understand the AI Space, you can check out my <Link
            className="underline hover:font-bold cursor-pointer transition duration-600 ease-in-out"
            href="/work-log">Work Log</Link>
        </p>

        <hr className="my-8 border-slate-200 w-40 mx-auto" />
        <SectionHeader title="" description="Recent Posts">
          <div className="mx-4">
            {posts.slice(0, 5).map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </SectionHeader>
        <div className="my-4 h-4" />
      </div>
      <div className="mb-10 h-2" />
    </div>
  );
}
