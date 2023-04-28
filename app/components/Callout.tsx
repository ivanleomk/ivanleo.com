import React from "react";
import { clsxm } from "../utils/css";

interface ICallout extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Callout({ className, children, ...props }: ICallout) {
  return (
    <div
      className={clsxm(
        "my-4 inline-block rounded-md border border-l-4 border-dark bg-light p-4"
      )}
      {...props}
    >
      <div className={clsxm("m-0 text-lg break-words", className)}>
        {children}
      </div>
    </div>
  );
}
