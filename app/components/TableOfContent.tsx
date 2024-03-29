"use client";

import { Disclosure } from "@headlessui/react";
import GithubSlugger from "github-slugger";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { clsxm } from "../utils/css";

interface TOCProps {
  source: string;
}

const useIntersectionObserver = (
  setActiveId: Dispatch<SetStateAction<string | undefined>>
) => {
  const headingElementsRef: any = useRef({});

  useEffect(() => {
    const callback = (headings: IntersectionObserverEntry[]) => {
      headingElementsRef.current = headings.reduce(
        (
          map: { [x: string]: any },
          headingElement: { target: { id: string | number } }
        ) => {
          map[headingElement.target.id] = headingElement;

          return map;
        },
        headingElementsRef.current
      );

      const visibleHeadings: any[] = [];

      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      const getIndexFromId = (id: string) =>
        headingElements.findIndex((heading) => heading.id === id);

      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id);
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(b.target.id) - getIndexFromId(a.target.id)
        );

        setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "0px 0px -70% 0px",
    });

    const headingElements = Array.from(document.querySelectorAll("h2,h3,h4"));

    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [setActiveId]);
};

const TableOfContents = ({ source }: TOCProps) => {
  const headingLines = source
    .split("\n")
    .filter((line) => line.match(/^#{2,5}\s/));

  const generateSpacing = (level: 1 | 2 | 3 | 4 | 5) => {
    switch (level) {
      case 1:
      case 2:
        return "pl-2";
      case 3:
        return "pl-6";
      case 4:
        return "pl-12";
      case 5:
        return "pl-16";
    }
  };

  const headings = headingLines
    .map((raw) => {
      const text = raw.replace(/^###*\s/, "");

      const level = raw.match(/^###*\s/)?.at(0)?.length ?? 0;

      const slugger = new GithubSlugger();

      return {
        text,
        level,
        id: slugger.slug(text.trim()),
      };
    })
    .filter((item) => {
      return item.level <= 5;
    });

  const [activeId, setActiveId] = useState<string>();

  useIntersectionObserver(setActiveId);

  return (
    <div className="w-full mt-4 mb-0 lg:mr-10 cursor-pointer lg:sticky lg:top-20 lg:border-b-2 lg:border-dark max-w-md max-h-[80vh] overflow-y-auto">
      <Disclosure
        as="div"
        className="flex flex-col items-start justify-center"
        defaultOpen={true}
      >
        {({ open }) => (
          <>
            <dt>
              <Disclosure.Button
                as="h3"
                className="mb-4 flex flex-row flex-nowrap items-center justify-start text-base font-medium text-dark"
              >
                <span className="animated-underline font-bold capitalize tracking-wide">
                  Contents:
                </span>
                <span className="ml-20 flex items-center md:ml-16">
                  <RiArrowDownSLine
                    className={clsxm(
                      open ? "-rotate-180" : "rotate-0",
                      "h-6 w-6 transform"
                    )}
                    aria-hidden="true"
                  />
                </span>
              </Disclosure.Button>
            </dt>
            <Disclosure.Panel
              as="dd"
              className="flex flex-col items-start justify-start "
            >
              {headings.map((heading, index) => {
                return (
                  <a
                    key={index}
                    href={`#${heading.id}`}
                    className={clsxm(
                      heading.id === activeId ? "font-bold" : "font-normal",
                      generateSpacing(heading.level as 1 | 2 | 3 | 4),
                      "mb-4 text-base text-slate-700 last:mb-6 hover:underline text-wrap"
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(heading.id);
                      document
                        .querySelector<any>(`#${heading.id}`)
                        ?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                          inline: "nearest",
                        });
                    }}
                  >
                    {heading.text}
                  </a>
                );
              })}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default TableOfContents;
