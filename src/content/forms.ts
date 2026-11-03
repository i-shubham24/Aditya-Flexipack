/**
 * The four forms from the old site, field for field, so nothing a team relies on goes missing.
 * Labels are tidied; options are kept as the client published them.
 */
export type Field = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "date" | "select" | "textarea" | "file";
  required?: boolean;
  options?: readonly string[];
  autoComplete?: string;
  wide?: boolean;
  hint?: string;
  /** File fields only: how many files may be attached (the old vendor form took two catalogues). */
  maxFiles?: number;
};

export type FormId = "contact" | "career" | "packaging" | "vendor";

export type FormDef = { id: FormId; subject: string; submit: string; fields: Field[] };

const person: Field[] = [
  { name: "firstName", label: "First name", type: "text", required: true, autoComplete: "given-name" },
  { name: "lastName", label: "Last name", type: "text", autoComplete: "family-name" },
  { name: "email", label: "Email address", type: "email", required: true, autoComplete: "email" },
  { name: "phone", label: "Phone number", type: "tel", required: true, autoComplete: "tel" },
];

export const PRODUCT_NEEDS = ["Single layer", "Laminate", "Laddi pack / polybag", "CPP films", "PE film", "Inks", "Cylinders", "Pouches"] as const;

export const VENDOR_PRODUCTS = [
  "Bearings and belts",
  "Tapes",
  "Cartons",
  "Films",
  "Machinery parts",
  "Lubricants",
  "Machinery",
  "Chemicals",
  "Electrical parts",
  "Cores",
  "Pigments and masterbatches",
  "Granules",
] as const;

export const forms: Record<FormId, FormDef> = {
  contact: {
    id: "contact",
    subject: "Website enquiry",
    submit: "Send message",
    fields: [...person, { name: "city", label: "City", type: "text", autoComplete: "address-level2" }, { name: "message", label: "Your message", type: "textarea", wide: true }],
  },
  career: {
    id: "career",
    subject: "Job application",
    submit: "Send application",
    fields: [
      ...person,
      { name: "industry", label: "Current industry", type: "text" },
      { name: "employer", label: "Current employer", type: "text", autoComplete: "organization" },
      { name: "designation", label: "Current designation", type: "text", autoComplete: "organization-title" },
      { name: "dob", label: "Date of birth", type: "date", autoComplete: "bday" },
      { name: "city", label: "Current city", type: "text", autoComplete: "address-level2" },
      { name: "state", label: "Current state", type: "text", autoComplete: "address-level1" },
      { name: "country", label: "Country", type: "text", autoComplete: "country-name" },
      { name: "hometownCity", label: "Hometown city", type: "text" },
      { name: "hometownState", label: "Hometown state", type: "text" },
      { name: "department", label: "Department of interest", type: "text" },
      { name: "experience", label: "Experience range", type: "text", hint: "For example, 3 to 5 years" },
      { name: "qualifications", label: "Qualifications", type: "text" },
      { name: "source", label: "How did you hear about us?", type: "text" },
      { name: "about", label: "Describe yourself in brief", type: "textarea", wide: true },
      { name: "resume", label: "Upload resume", type: "file", wide: true, hint: "PDF or Word, up to 5 MB" },
    ],
  },
  packaging: {
    id: "packaging",
    subject: "Packaging partnership enquiry",
    submit: "Send requirement",
    fields: [
      { name: "name", label: "Your name", type: "text", required: true, autoComplete: "name" },
      { name: "email", label: "Contact email", type: "email", required: true, autoComplete: "email" },
      { name: "company", label: "Brand or company name", type: "text", required: true, autoComplete: "organization" },
      { name: "industry", label: "Industry", type: "text" },
      { name: "phone", label: "Phone number", type: "tel", required: true, autoComplete: "tel" },
      { name: "city", label: "City", type: "text", autoComplete: "address-level2" },
      { name: "country", label: "Country", type: "text", autoComplete: "country-name" },
      { name: "product", label: "Product requirement", type: "select", required: true, options: PRODUCT_NEEDS },
      { name: "brief", label: "Brief explanation of the requirement", type: "textarea", wide: true },
    ],
  },
  vendor: {
    id: "vendor",
    subject: "Vendor registration",
    submit: "Register as a vendor",
    fields: [
      ...person,
      { name: "company", label: "Company name", type: "text", required: true, autoComplete: "organization" },
      { name: "gst", label: "GST number", type: "text", required: true },
      { name: "revenue", label: "Revenue range", type: "select", required: true, options: ["0 to 20 Cr.", "20 to 100 Cr.", "100 to 500 Cr.", "500 Cr. and above"] },
      { name: "type", label: "You are a", type: "select", required: true, options: ["Manufacturer", "Distributor", "Trader"] },
      { name: "product", label: "Product you supply", type: "select", options: VENDOR_PRODUCTS },
      { name: "city", label: "City", type: "text", autoComplete: "address-level2" },
      { name: "state", label: "State", type: "text", autoComplete: "address-level1" },
      { name: "country", label: "Country", type: "text", autoComplete: "country-name" },
      { name: "pincode", label: "Pincode", type: "text", autoComplete: "postal-code" },
      { name: "brief", label: "Company brief", type: "textarea", wide: true },
      { name: "catalogue", label: "Upload catalogue", type: "file", wide: true, maxFiles: 2, hint: "Up to two PDFs, 5 MB each" },
    ],
  },
};
