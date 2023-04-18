import React from "react";

type Props = {
  children: React.ReactNode;
  title: string;
  description?: string;
};

const SectionHeader = ({ children, title, description = "" }: Props) => {
  return (
    <div>
      <h1 className="text-sm text-gray-700">{title}</h1>
      <p className="mt-1 mb-4 text-xs leading-8 text-gray-600">{description}</p>
      {children}
    </div>
  );
};

export default SectionHeader;
