import React from "react";

type Props = {
  children: React.ReactNode;
  title: string;
  description?: string;
};

const SectionHeader = ({ children, title, description = "" }: Props) => {
  return (
    <div>
      <h1 className="text-md">{title}</h1>
      <p className="mt-1 mb-4 text-sm leading-8 text-gray-600">{description}</p>
      {children}
    </div>
  );
};

export default SectionHeader;
