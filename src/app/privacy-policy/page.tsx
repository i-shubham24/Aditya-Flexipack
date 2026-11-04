import type { Metadata } from "next";
import { DocHero } from "@/components/heroes/DocHero";
import { TearStrip } from "@/components/system/TearStrip";
import { Rise } from "@/components/desk/Rise";
import { ClauseIndex, Clauses, FactBlocks, type ClauseDef, type Fact } from "@/components/desk/LegalDesk";
import { Contour } from "@/components/desk/Contour";
import { SectionHeader } from "@/components/system/SectionHeader";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Aditya Flexipack collects, uses, stores and safeguards your data when you visit our website or use our services.",
  alternates: { canonical: "/privacy-policy/" },
};

/** The policy in plain words, condensed from clauses 2, 3, 5, 6 and 7. The clauses below stay in full. */
const SUMMARY: Fact[] = [
  { label: "Details you give us", value: "Name, email, phone number and company details, when you contact us or send a form." },
  { label: "Details we record", value: "Your IP address, browser type and the pages you visit." },
  { label: "Sold or rented", value: "Never", tone: "crimson" },
  { label: "Why we use them", value: "To improve our services, answer enquiries, send updates and promotions, and prevent fraud." },
  { label: "Shared with", value: "Trusted service providers, for business operations, legal compliance or security." },
  { label: "Cookies", value: "Yes. You can control or turn them off in your browser settings.", tone: "blush" },
  { label: "Your rights", value: "See, correct or delete your data. Opt out of marketing. Limit or object to processing in some cases.", tone: "ink", wide: true },
];

const CLAUSES: ClauseDef[] = [
  {
    id: "privacy-1",
    title: "Introduction",
    body: (
      <p>
        Aditya Flexipack values your privacy and is committed to protecting your personal information. This Privacy Policy explains how
        we collect, use, store, and safeguard your data when you visit our website or use our services.
      </p>
    ),
  },
  {
    id: "privacy-2",
    title: "Information we collect",
    body: (
      <>
        <p>We may collect personal and non-personal information, including:</p>
        <ul>
          <li>
            <strong>Personal details:</strong> name, email address, phone number, and company details when you contact us or submit a form.
          </li>
          <li>
            <strong>Usage data:</strong> information about how you interact with our website, including IP address, browser type, and pages
            visited.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "privacy-3",
    title: "How we use your information",
    body: (
      <>
        <p>Your information helps us:</p>
        <ul>
          <li>Improve our services and website experience.</li>
          <li>Respond to inquiries and customer support requests.</li>
          <li>Send updates, promotions, and important company communications.</li>
          <li>Ensure security and prevent fraudulent activities.</li>
        </ul>
      </>
    ),
  },
  {
    id: "privacy-4",
    title: "Data protection and security",
    body: (
      <p>
        We implement strict security measures to protect your personal data from unauthorized access, alteration, or disclosure. However,
        while we strive to ensure security, no method of data transmission is 100% secure.
      </p>
    ),
  },
  {
    id: "privacy-5",
    title: "Cookies and tracking technologies",
    body: (
      <p>
        We use cookies to enhance user experience, analyze website traffic, and personalize content. You can control or disable cookies
        through your browser settings.
      </p>
    ),
  },
  {
    id: "privacy-6",
    title: "Third-party sharing",
    body: (
      <p>
        We do not sell or rent your personal data. However, we may share it with trusted third-party service providers for business
        operations, legal compliance, or security purposes.
      </p>
    ),
  },
  {
    id: "privacy-7",
    title: "Your rights and choices",
    body: (
      <>
        <p>You have the right to:</p>
        <ul>
          <li>Request access, correction, or deletion of your personal data.</li>
          <li>Opt-out of marketing communications at any time.</li>
          <li>Restrict or object to data processing in certain cases.</li>
        </ul>
      </>
    ),
  },
  {
    id: "privacy-8",
    title: "Policy updates",
    body: <p>We may update this Privacy Policy periodically. Changes will be posted on this page with the updated revision date.</p>,
  },
  {
    id: "privacy-9",
    title: "Contact us",
    body: (
      <>
        <p>For any privacy-related concerns or requests, please contact us at:</p>
        <address className="not-italic">
          <strong>{site.name}</strong>
          <br />
          <a href={site.phoneHref} className="inline-flex min-h-11 items-center">{site.phone}</a>
          <br />
          {site.cityOffice.lines.join(", ")}
          <br />
          <a href={`mailto:${site.emailAlt}`} className="inline-flex min-h-11 items-center [overflow-wrap:anywhere]">{site.emailAlt}</a>
        </address>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <DocHero
        tone="foil"
        title="Privacy policy"
        intro={<p className="hand inline-block -rotate-2 text-note text-crimson">We do not sell or rent your personal data</p>}
      />

      <section aria-labelledby="privacy-summary" className="panel relative bg-crimson-wash py-[var(--section-y)]">
        <Contour hue="wash" shape={1} />
        <Rise className="shell relative">
          <div data-rise>
            <SectionHeader id="privacy-summary" title="Privacy information" standfirst="The policy in plain words. The full clauses follow below." />
          </div>
          <div className="page-grid gap-y-12">
            <div data-rise className="span-lead">
              <FactBlocks facts={SUMMARY} />
            </div>
            <div data-rise className="span-quarter">
              <ClauseIndex clauses={CLAUSES} label="Clauses of this privacy policy" />
            </div>
          </div>
        </Rise>
      </section>

      <div className="py-[var(--section-y)]">
        <Rise className="shell">
          <Clauses clauses={CLAUSES} />
        </Rise>
      </div>

      <TearStrip from="/privacy-policy/" />
    </>
  );
}
