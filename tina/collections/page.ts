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
      fields: [
        {
          type: "string",
          name: "headline",
          label: "Headline",
        },
        {
          type: "string",
          name: "content",
          label: "Content",
          ui: {
            component: "textarea",
          },
        },
        {
          type: "image",
          name: "image",
          label: "Image",
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
