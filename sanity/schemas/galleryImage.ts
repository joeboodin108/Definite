import { defineType, defineField } from "sanity";

export default defineType({
  name: "galleryImage",
  title: "Gallery Image",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "object",
      fields: [
        { name: "en", type: "string", title: "English" },
        { name: "ar", type: "string", title: "Arabic" },
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Clinic", value: "clinic" },
          { title: "Before & After", value: "before-after" },
          { title: "Dental", value: "dental" },
          { title: "Facial", value: "facial" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "caption.en", media: "image", subtitle: "category" },
  },
});
