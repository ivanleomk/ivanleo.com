import { allPosts } from "@/.contentlayer/generated";
import React from "react";
import { getMDXComponent } from "next-contentlayer/hooks";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import CodeTitle from "@/app/components/CodeTitle";
import { clsxm } from "@/app/utils/css";
import Callout from "@/app/components/Callout";
import KommyImage from "@/app/components/KommyImage";
import KommyLink from "@/app/components/KommyLink";
import Pre from "@/app/components/Pre";
import { getAllTweetData } from "@/app/utils/tweet";
import TableOfContents from "@/app/components/TableOfContent";
import { Tweet } from "react-tweet";
import 'katex/dist/katex.min.css';
//@ts-ignore
import { InlineMath, BlockMath } from 'react-katex';

export const CodeBlocks = {
    Callout,
    CodeTitle,
    KommyImage,
    KommyLink,
    InlineMath,
    BlockMath,
    a: ({ ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
        <a
            className="animated-underline border-b border-dotted border-dark hover:border-dark/0"
            {...props}
        />
    ),
    p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p
            className={clsxm(
                "text-md leading-7 [&:not(:first-child)]:mt-6 break-words",
                className
            )}
            {...props}
        />
    ),
    ul: ({ ...props }) => (
        <ul className="my-6 ml-6 list-outside list-disc text-md" {...props} />
    ),
    ol: ({ ...props }) => (
        <ol className="my-6 ml-6 list-outside list-decimal text-md" {...props} />
    ),
    li: ({ ...props }) => <li className="mt-2 text-md leading-7" {...props} />,
    blockquote: ({
        className,
        ...props
    }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
        <blockquote
            className="mt-6 border-l-4 border-dark pl-6 italic text-dark [&>*]:text-zinc-600"
            {...props}
        />
    ),
    b: ({ ...props }: React.HTMLAttributes<HTMLTableElement>) => (
        <b {...props} className="text-md leading-6" />
    ),
    table: ({ ...props }: React.HTMLAttributes<HTMLTableElement>) => (
        <div className="my-6 min-w-full overflow-y-auto rounded-md">
            <table className="min-w-full divide-y divide-gray-400" {...props} />
        </div>
    ),
    tr: ({ ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
        <tr className="m-0 p-0 even:bg-white" {...props} />
    ),
    th: ({ ...props }) => (
        <th
            className="border border-gray-400 bg-white px-4 py-2 text-left font-semibold [&[align=center]]:text-center [&[align=right]]:text-right"
            {...props}
        />
    ),
    td: ({ ...props }) => (
        <td
            className="border border-gray-400 px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
            {...props}
        />
    ),
    code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <code
            className={clsxm(
                "relative rounded border bg-gray-300 bg-opacity-25 py-[0.2rem] px-[0.3rem] font-mono text-base text-gray-600",
                className
            )}
            {...props}
        />
    ),
    pre: Pre,
};