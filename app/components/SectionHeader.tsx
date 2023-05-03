import React from "react";

type Props = {
  children?: React.ReactNode;
  title: string;
  description?: string;
};

const SectionHeader = ({ children = null, title, description = "" }: Props) => {
  return (
    <div>
      <div className="max-w-3xl mx-5 sm:mx-0">
        <h1 className="text-4xl font-display tracking-tight text-zinc-800 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 text-base text-zinc-600">{description}</p>
      </div>

      {children}
    </div>
  );
};

export default SectionHeader;
