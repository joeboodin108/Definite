import { defineType, defineField } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        { name: "en", type: "string", title: "English" },
        { name: "ar", type: "string", title: "Arabic" },
      ],
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.en", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "serviceCategory" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "object",
      fields: [
        { name: "en", type: "text", title: "English", rows: 3 },
        { name: "ar", type: "text", title: "Arabic", rows: 3 },
      ],
    }),
    defineField({
      name: "fullDescription",
      title: "Full Description",
      type: "object",
      fields: [
        { name: "en", type: "text", title: "English", rows: 6 },
        { name: "ar", type: "text", title: "Arabic", rows: 6 },
      ],
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "benefits",
      title: "Benefits / What to Expect",
      type: "object",
      fields: [
        {
          name: "en",
          type: "array",
          title: "English",
          of: [{ type: "string" }],
        },
        {
          name: "ar",
          type: "array",
          title: "Arabic",
          of: [{ type: "string" }],
        },
      ],
    }),
    defineField({
      name: "icon",
      title: "Icon Name (Lucide)",
      type: "string",
      description: "Lucide icon name, e.g. Sparkles, Heart, Shield",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "title.en", subtitle: "category.title.en", media: "heroImage" },
  },
});
