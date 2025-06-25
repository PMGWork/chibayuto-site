"use client";

import { PortableText } from "@portabletext/react";

import { ImageGroupComponent } from "./ImageGroupComponent";
import EmbedComponent from "./EmbedContent";

import type { ImageGroupValue, EmbedValue } from "../../types";

interface ProtableTextComponentProps {
  value: any
}

export default function PortableTextComponent({ value }: ProtableTextComponentProps) {
  return (
    <PortableText
      value={value}
      components={{
        block: {
          h3: ({children}) => (
            <h3 className="text-xl sm:text-2xl mt-6 w-full">
              {children}
            </h3>
          ),
          normal: ({children}) => (
            <p className="mb-2 w-full">
              {children}
            </p>
          )
        },
        types: {
          imageGroup: ({value}: {value: ImageGroupValue}) => {
            return <ImageGroupComponent value={value} />;
          },
          embed: ({value}: {value: EmbedValue}) => {
            const { url } = value;
            if (!url) return null;

            return <EmbedComponent url={url} />;
          }
        }
      }}
    />
  );
}