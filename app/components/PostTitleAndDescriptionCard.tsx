import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  description: string;
  href: string;
};

const PostTitleAndDescriptionCard = ({ title, description, href }: Props) => {
  return (
    <li>
      <Link href={href} className=" hover:underline">
        <h3>{title}</h3>
        <p className="text-sm text-muted-foreground">{`${description.slice(
          0,
          100
        )}${description.length > 100 ? "..." : ""}`}</p>
      </Link>
    </li>
  );
};

export default PostTitleAndDescriptionCard;
