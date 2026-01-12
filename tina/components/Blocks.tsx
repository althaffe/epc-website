import React from "react";

import { tinaField } from "tinacms/dist/react";
import type { PageQuery } from "../__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

function getGridClass(columnCount: string) {
  return columnCount === "2"
    ? "grid-cols-2"
    : columnCount === "3"
    ? "grid-cols-3"
    : columnCount === "4"
    ? "grid-cols-4"
    : "";
}

const Blocks = ({ page }: { page: PageQuery["page"] }) => {
  const blocks = page.content;

  if (!blocks?.length) return <></>;

  return (
    <>
      {blocks.map((block, i) => {
        switch (block?.__typename) {
          case "PageContentRichText":
            return (
              <div
                className="prose my-8 prose-img:mt-2"
                key={String(i) + block.__typename}
                data-tina-field={tinaField(block, "body")}
              >
                <TinaMarkdown content={block.body} />
              </div>
            );

          case "PageContentImage":
            return (
              <div
                className="relative"
                key={String(i) + block.__typename}
                data-tina-field={tinaField(block, "image")}
              >
                <img
                  className="w-full object-cover object-center h-full"
                  src={block.image}
                  alt=""
                />
                {block.caption && (
                  <div className="absolute left-0 right-0 bottom-0 bg-white/50 py-2 text-center px-4">
                    {block.caption}
                  </div>
                )}
              </div>
            );

          case "PageContentEmbed":
            return (
              <div
                className="relative"
                key={String(i) + block.__typename}
                data-tina-field={tinaField(block, "youtubeId")}
              >
                <LiteYouTubeEmbed id={block.youtubeId || ""} title="Video" />
              </div>
            );

          case "PageContentGrid":
            return (
              <div
                className={`grid gap-8 max-md:grid-cols-1 my-8 ${getGridClass(
                  block.columnCount || ""
                )}`}
              >
                {block.columns?.map((column, j) => {
                  switch (column?.__typename) {
                    case "PageContentGridColumnsRichText":
                      return (
                        <div
                          className="prose prose-img:mt-2 prose-img:mb-4"
                          key={String(i) + String(j) + column.__typename}
                          data-tina-field={tinaField(column, "body")}
                        >
                          <TinaMarkdown content={column.body} />
                        </div>
                      );
                    case "PageContentGridColumnsImage":
                      return (
                        <div
                          className="relative"
                          key={String(i) + String(j) + column.__typename}
                          data-tina-field={tinaField(column, "image")}
                        >
                          <img
                            className="w-full object-cover object-center h-full"
                            src={column.image}
                            alt=""
                          />
                          {column.caption && (
                            <div className="absolute left-0 right-0 bottom-0 bg-white/50 py-2 text-center px-4">
                              {column.caption}
                            </div>
                          )}
                        </div>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            );
          default:
            return null;
        }
      })}
    </>
  );
};
export default Blocks;
