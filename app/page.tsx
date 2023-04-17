import Image from "next/image";
import { Inter } from "next/font/google";
import { allPosts } from "contentlayer/generated";
import Link from "next/link";
import { compareDesc, format } from "date-fns";
import PostCard from "./components/PostCard";
import SectionHeader from "./components/SectionHeader";

const posts = allPosts.sort((a, b) => {
  return compareDesc(new Date(a.date), new Date(b.date));
});

export default function Home() {
  return (
    <div>
      <div className="my-10 prose">
        <SectionHeader title="About Me" description="A lil bit about myself">
          <p className="text-sm leading-6">
            I&apos;m a software engineer based in Singapore, currently working
            on building out a GPT-powered CRM for sales teams as part of
            Buildspace S3. I&apos;m interested in a variety of different areas -
            including web3, Generative AI and most recently gardenning.{" "}
          </p>

          <p className="mt-2 text-sm leading-6">
            You can find out more about me via my writings, projects and other
            social media accounts. Feel free to drop me a dm @ivanleomk on
            twitter for any collaboration, inquiries or more.
          </p>
        </SectionHeader>

        <hr className="my-8 border-slate-200 w-40 mx-auto" />
        <SectionHeader
          title="Recent Posts"
          description="What I've been up to lately"
        >
          <div className=" space-y-16">
            {posts.slice(0, 5).map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </SectionHeader>
      </div>
    </div>
  );
}
