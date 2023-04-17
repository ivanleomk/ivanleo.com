import Image from "next/image";
import { Inter } from "next/font/google";
import { allPosts } from "contentlayer/generated";
import Link from "next/link";
import { format } from "date-fns";

export default function Home() {
  return (
    <div>
      <div className="my-10 prose">
        <h1 className="text-md leading-4">About me</h1>
        <p className="mt-1 mb-4 text-sm leading-8 text-gray-600">
          A lil bit about me
        </p>
        <p className="text-sm leading-6">
          I&apos;m a software engineer based in Singapore, currently working on
          building out a GPT-powered CRM for sales teams as part of Buildspace
          S3. I&apos;m interested in a variety of different areas - including
          web3, Generative AI and most recently gardenning.{" "}
        </p>

        <p className="mt-2 text-sm leading-6">
          You can find out more about me via my writings, projects and other
          social media accounts. Feel free to drop me a dm @ivanleomk on twitter
          for any collaboration, inquiries or more.
        </p>

        <hr className="my-8 border-slate-200 w-40 mx-auto" />
        <h1 className="text-md">Posts</h1>
        <p className="mt-1 mb-4 text-sm leading-8 text-gray-600">
          What I&apos;ve been up to recently
        </p>

        <div className="">
          <div className=" space-y-16">
            {allPosts.map((post) => (
              <article
                key={post._id}
                className="flex max-w-xl flex-col items-start justify-between"
              >
                <div className="group relative">
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      {post.title}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-x-4 text-xs mt-1 mb-3">
                    <time dateTime={post.date} className="text-gray-500">
                      {post.parsed_date}
                    </time>
                  </div>
                  <p className="my-2 line-clamp-3 text-sm leading-6 text-gray-600">
                    {post.description}
                  </p>
                  <div className="text-xs my-2 space-x-2">
                    {post.parsed_tags.map(
                      (item: { name: string; slug: string }) => {
                        return (
                          <Link
                            key={item.slug}
                            href={`category/${item.slug}`}
                            className=" rounded-md bg-gray-200 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                          >
                            {item.name}
                          </Link>
                        );
                      }
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
