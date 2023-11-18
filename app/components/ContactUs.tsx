"use client";
import Script from "next/script";
import React from "react";

const ContactUs = () => {
  return (
    <>
      <div className="max-w-lg mx-auto mb-10">
        <iframe
          data-tally-src="https://tally.so/embed/nPpZaP?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
          width="100%"
          height="284"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Contact form"
        ></iframe>
        <Script
          id="tally-js"
          src="https://tally.so/widgets/embed.js"
          onLoad={() => {
            // @ts-ignore
            Tally.loadEmbeds();
          }}
        />
      </div>
    </>
  );
};

export default ContactUs;
