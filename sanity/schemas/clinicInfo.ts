import { defineType, defineField } from "sanity";

export default defineType({
  name: "clinicInfo",
  title: "Clinic Info",
  type: "document",
  fields: [
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp Number",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "object",
      fields: [
        { name: "en", type: "string", title: "English" },
        { name: "ar", type: "string", title: "Arabic" },
      ],
    }),
    defineField({
      name: "workingHours",
      title: "Working Hours",
      type: "object",
      fields: [
        { name: "en", type: "text", title: "English", rows: 3 },
        { name: "ar", type: "text", title: "Arabic", rows: 3 },
      ],
    }),
    defineField({
      name: "aboutText",
      title: "About Text",
      type: "object",
      fields: [
        { name: "en", type: "text", title: "English", rows: 6 },
        { name: "ar", type: "text", title: "Arabic", rows: 6 },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "object",
      fields: [
        { name: "instagram", type: "url", title: "Instagram" },
        { name: "facebook", type: "url", title: "Facebook" },
      ],
    }),
    defineField({
      name: "mapEmbedUrl",
      title: "Google Maps Embed URL",
      type: "url",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Clinic Info" }),
  },
});
