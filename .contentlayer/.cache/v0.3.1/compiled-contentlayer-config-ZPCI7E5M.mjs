// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { format } from "date-fns";
import { readFileSync } from "fs";
import rehypePrettyCode from "rehype-pretty-code";
function processString(inputString) {
  const escapedString = inputString.replace(/[\\"']/g, "\\$&").replace(/\u0000/g, "\\0");
  const lowerCaseString = escapedString.toLowerCase();
  const words = lowerCaseString.split(/\W+/);
  const processedString = words.join("_");
  return processedString;
}
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true
    },
    description: {
      type: "string",
      required: true
    },
    categories: {
      type: "list",
      of: { type: "string" },
      required: false
    }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/posts/${doc._raw.flattenedPath}`
    },
    slug: {
      type: "string",
      resolve: (doc) => processString(doc.title)
    },
    parsed_date: {
      type: "string",
      resolve: (doc) => format(new Date(doc.date), "MMM dd, yyyy")
    },
    parsed_tags: {
      type: "list",
      of: {
        type: "object"
      },
      resolve: (doc) => {
        const items = doc?.categories?._array;
        return items.map((item) => {
          return {
            name: item,
            slug: processString(item)
          };
        });
      }
    }
  }
}));
var themePath = "./assets/OneHunterTheme.json";
var contentlayer_config_default = makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          // theme: "github-dark",
          theme: JSON.parse(readFileSync(themePath, "utf-8")),
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ["word--highlighted"];
          }
        }
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section"
          }
        }
      ]
    ]
  }
});
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-ZPCI7E5M.mjs.map
