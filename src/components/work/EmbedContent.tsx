"use client";

import { InstagramEmbed, XEmbed } from "react-social-media-embed";
import ReactPlayer from 'react-player';

type EmbedComponentProps = {
  url: string;
};

export default function EmbedComponent({ url }: EmbedComponentProps) {
  if (typeof window === "undefined") {
    return null;
  }

  const getDomain = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace('www.', '');
    } catch {
      console.error("Invalid URL:", url);
      return "";
    }
  };

  const domain = getDomain(url);

  if (domain.includes('x.com') || domain.includes('twitter.com')) {
    return (
      <div className="mx-auto w-full max-w-lg">
        <XEmbed url={url} width="512px" />
      </div>
    );
  } else if (domain.includes('instagram.com')) {
    return (
      <div className="mx-auto w-full max-w-lg">
        <InstagramEmbed url={url} width="512px" />
      </div>
    );
  } else if (domain.includes('youtube.com') || domain.includes('vimeo.com')) {
    return (
      <div className="w-full aspect-video overflow-hidden rounded-lg">
        <ReactPlayer
          url={url}
          className="aspect-video"
          width="100%"
          height="100%"
          controls
        />
      </div>
    );
  } else {
    return (
      <div className="flex justify-center my-8">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-600 hover:text-cyan-800 underline"
        >
          {url}
        </a>
      </div>
    );
  }
}