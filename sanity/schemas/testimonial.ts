import { defineType, defineField } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Patient Name",
      type: "object",
      fields: [
        { name: "en", type: "string", title: "English" },
        { name: "ar", type: "string", title: "Arabic" },
      ],
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "object",
      fields: [
        { name: "en", type: "text", title: "English", rows: 3 },
        { name: "ar", type: "text", title: "Arabic", rows: 3 },
      ],
    }),
    defineField({
      name: "service",
      title: "Service",
      type: "reference",
      to: [{ type: "service" }],
    }),
    defineField({
      name: "rating",
      title: "Rating (1-5)",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "name.en", subtitle: "quote.en" },
  },
});
