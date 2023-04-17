import Image from "next/image";
import { Inter } from "next/font/google";
import { allPosts } from "contentlayer/generated";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      {allPosts.map((post) => (
        <div key={post._id}>
          <h1>{post.title}</h1>
        </div>
      ))}
    </div>
  );
}
