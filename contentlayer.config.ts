import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { format } from "date-fns";
import { readFileSync } from "fs";
import rehypePrettyCode from "rehype-pretty-code";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

function processString(inputString: string) {
  const escapedString = inputString
    .replace(/[\\"']/g, "\\$&")
    .replace(/\u0000/g, "\\0");
  const lowerCaseString = escapedString.toLowerCase();
  const words = lowerCaseString.split(/\W+/);
  const processedString = words.join("_");
  return processedString;
}

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    categories: {
      type: "list",
      of: { type: "string" },
      required: false,
    },
    draft: {
      type: "boolean",
      required: false,
      default: false,
    },
    archive: {
      type: "boolean",
      required: false,
      default: false,
    },
    hide: {
      type: "boolean",
      required: false,
      default: false,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/posts/${doc._raw.flattenedPath}`,
    },
    slug: {
      type: "string",
      resolve: (doc) => processString(doc.title),
    },
    parsed_date: {
      type: "string",
      resolve: (doc) => format(new Date(doc.date), "MMM dd, yyyy"),
    },
    parsed_tags: {
      type: "list",
      of: {
        type: "object",
      },
      resolve: (doc) => {
        //@ts-ignore
        const items = doc?.categories?._array as unknown as string[];

        return items.map((item: string) => {
          return {
            name: item,
            slug: processString(item),
          };
        });
      },
    },
  },
}));

const themePath = "./assets/OneHunterTheme.json";
export default makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [
      remarkGfm,
      rehypeAccessibleEmojis,
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          // theme: "github-dark",
          theme: JSON.parse(readFileSync(themePath, "utf-8")),
          onVisitLine(node: any) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node: any) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node: any) {
            node.properties.className = ["word--highlighted"];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },
});
