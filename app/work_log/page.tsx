import React from "react";
import SectionHeader from "../components/SectionHeader";

const WorklogPage = () => {
  return (
    <SectionHeader
      title="Work-Log"
      description="This will just be a long form daily journal where I sketch out things"
    >
      <div className="text-sm leading-6">
        <h1>17 Apr 2023</h1>
        <p>
          Finished up draft 1 of the new website. Moving on to start writing up
          articles. Excited to finally integrate the blog into the website and
          to have a working version which looks nice
        </p>
        <p>New Libraries Used</p>
        <ol className="list-disc">
          <li className="ml-4">
            Next JS 13 - was quite straight forward to integrate and to get it
            working
          </li>
          <li className="ml-4">
            Content Layer - had a small bug with the new version of next js but
            managed to fix it.
          </li>
        </ol>
      </div>
    </SectionHeader>
  );
};

export default WorklogPage;
