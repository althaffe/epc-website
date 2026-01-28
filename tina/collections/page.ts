import type { Collection, Template } from "tinacms";

const richTextBlock: Template = {
  name: "richText",
  label: "Rich Text",
  fields: [
    {
      type: "rich-text",
      name: "body",
      label: "Body",
    },
  ],
};

const imageBlock: Template = {
  name: "image",
  label: "Image",
  fields: [
    {
      type: "image",
      name: "image",
      label: "Image",
    },
    {
      type: "string",
      name: "caption",
      label: "Caption",
    },
  ],
};

const embedBlock: Template = {
  name: "embed",
  label: "Youtube Embed",
  fields: [
    {
      type: "string",
      name: "youtubeId",
      label: "Youtube Video ID",
    },
  ],
};

const gridBlock: Template = {
  name: "grid",
  label: "Grid",
  ui: {
    defaultItem: () => {
      return {
        columnCount: "2",
        columns: [],
      };
    },
  },
  fields: [
    {
      name: "columnCount",
      label: "Number of columns",
      type: "string",
      options: [
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
      ],
    },
    {
      name: "columns",
      label: "Columns",
      type: "object",
      list: true,
      templates: [richTextBlock, imageBlock],
    },
  ],
};

export const PageCollection: Collection = {
  name: "page",
  label: "Pages",
  path: "src/content/page",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      return `/${document._sys.filename}`;
    },
  },
  fields: [
    {
      name: "seoTitle",
      type: "string",
      required: true,
    },
    {
      name: "banner",
      label: "Banner",
      type: "object",
      list: true,
      ui: {
        defaultItem: () => {
          return {
            textPosition: "left",
            textAlignment: "middle",
            textInContainer: false,
          };
        },
      },
      fields: [
        {
          type: "string",
          name: "headline",
          label: "Headline",
        },
        {
          name: "textPosition",
          label: "Text position",
          type: "string",
          options: [
            { value: "left", label: "Left" },
            { value: "center", label: "Center" },
            { value: "right", label: "Right" },
          ],
        },
        {
          name: "textAlignment",
          label: "Text alignment",
          type: "string",
          options: [
            { value: "top", label: "Top" },
            { value: "middle", label: "Middle" },
            { value: "bottom", label: "Bottom" },
          ],
        },
        {
          type: "boolean",
          name: "textInContainer",
          label: "Should the text be inside a container?",
        },
        {
          type: "image",
          name: "image",
          label: "Image or Video",
        },
      ],
    },
    {
      name: "content",
      type: "object",
      list: true,
      label: "Content",
      templates: [richTextBlock, imageBlock, embedBlock, gridBlock],
    },
    // {
    //   name: "body",
    //   type: "rich-text",
    //   isBody: true,
    //   required: true,
    // },
  ],
};
