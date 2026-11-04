import type { Metadata } from "next";
import Link from "next/link";
import { DocHero } from "@/components/heroes/DocHero";
import { TearStrip } from "@/components/system/TearStrip";
import { Rise } from "@/components/desk/Rise";
import { ClauseIndex, Clauses, SplitFacts, type ClauseDef } from "@/components/desk/LegalDesk";
import { Contour } from "@/components/desk/Contour";
import { SectionHeader } from "@/components/system/SectionHeader";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms and conditions",
  description: "The terms and conditions for using the Aditya Flexipack website and services, governed by the laws of India.",
  alternates: { canonical: "/terms-conditions/" },
};

/** The terms in plain words, condensed from clauses 1, 3, 4, 5, 10 and 11. The clauses below stay in full. */
const SUMMARY = [
  { label: "Operated by", value: `${site.name}.` },
  { label: "Content", value: `Our text, images, logos and trademarks belong to ${site.name}.` },
  { label: "Product details", value: "Prices, specifications and availability can change without notice." },
  { label: "Liability", value: "We are not liable for damages from using our website or services." },
  { label: "Governing law", value: "The laws of India." },
  {
    label: "Contact",
    value: (
      <>
        <a href={site.phoneHref} className="inline-flex min-h-11 items-center font-semibold text-crimson underline underline-offset-4">
          {site.phone}
        </a>
        , {site.cityOffice.lines.join(", ")},{" "}
        <a href={`mailto:${site.emailAlt}`} className="inline-flex min-h-11 items-center font-semibold text-crimson underline underline-offset-4 [overflow-wrap:anywhere]">
          {site.emailAlt}
        </a>
      </>
    ),
  },
];

const CLAUSES: ClauseDef[] = [
  {
    id: "terms-1",
    title: "Introduction",
    body: (
      <p>
        Welcome to Aditya Flexipack. By accessing or using our website and services, you agree to comply with these Terms and Conditions.
        Please read them carefully before using our platform.
      </p>
    ),
  },
  {
    id: "terms-2",
    title: "Use of website",
    body: (
      <ul>
        <li>You must use this website only for lawful purposes and in accordance with these terms.</li>
        <li>Unauthorized use, including hacking, data mining, or infringement of intellectual property, is strictly prohibited.</li>
        <li>We reserve the right to modify or discontinue any part of the website without prior notice.</li>
      </ul>
    ),
  },
  {
    id: "terms-3",
    title: "Intellectual property rights",
    body: (
      <ul>
        <li>All content, including text, images, logos, and trademarks, is the property of Aditya Flexipack and protected by applicable laws.</li>
        <li>You may not copy, reproduce, distribute, or modify any content without prior written permission.</li>
      </ul>
    ),
  },
  {
    id: "terms-4",
    title: "Product and service information",
    body: (
      <ul>
        <li>We strive to provide accurate descriptions of our products and services, but we do not guarantee that all information is error-free.</li>
        <li>Prices, specifications, and availability are subject to change without notice.</li>
      </ul>
    ),
  },
  {
    id: "terms-5",
    title: "Limitation of liability",
    body: (
      <ul>
        <li>We shall not be liable for any direct, indirect, or incidental damages arising from the use of our website or services.</li>
        <li>We do not guarantee uninterrupted or error-free access to our website.</li>
      </ul>
    ),
  },
  {
    id: "terms-6",
    title: "Privacy policy",
    body: (
      <p>
        Your use of our website is also governed by our <Link href="/privacy-policy/">Privacy Policy</Link>, which explains how we collect
        and handle your data.
      </p>
    ),
  },
  {
    id: "terms-7",
    title: "Third-party links",
    body: (
      <p>
        Our website may contain links to third-party websites. We do not endorse or control these websites and are not responsible for
        their content or policies.
      </p>
    ),
  },
  {
    id: "terms-8",
    title: "Indemnification",
    body: (
      <p>
        You agree to indemnify and hold Aditya Flexipack harmless from any claims, losses, or liabilities arising from your use of our
        website or violation of these terms.
      </p>
    ),
  },
  {
    id: "terms-9",
    title: "Changes to terms and conditions",
    body: <p>We reserve the right to update or modify these Terms and Conditions at any time. Changes will be effective upon posting.</p>,
  },
  {
    id: "terms-10",
    title: "Governing law",
    body: (
      <p>
        These Terms and Conditions are governed by the laws of India. Any disputes shall be resolved in the appropriate courts of
        jurisdiction.
      </p>
    ),
  },
  {
    id: "terms-11",
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

export default function TermsPage() {
  return (
    <>
      <DocHero
        tone="wash"
        title="Terms and conditions"
        intro={<p className="hand inline-block -rotate-2 text-note text-crimson">Governed by the laws of India</p>}
      />

      <section aria-labelledby="terms-summary" className="panel relative bg-foil py-[var(--section-y)]">
        <Contour hue="foil" shape={2} />
        <Rise className="shell relative">
          <div data-rise>
            <SectionHeader id="terms-summary" title="Declaration" standfirst="The terms in plain words. The full clauses follow below." />
          </div>
          <div className="page-grid gap-y-12">
            <div data-rise className="span-lead">
              <SplitFacts facts={SUMMARY} />
            </div>
            <div data-rise className="span-quarter">
              <ClauseIndex clauses={CLAUSES} label="Clauses of these terms" />
            </div>
          </div>
        </Rise>
      </section>

      <div className="py-[var(--section-y)]">
        <Rise className="shell">
          <Clauses clauses={CLAUSES} />
        </Rise>
      </div>

      <TearStrip from="/terms-conditions/" />
    </>
  );
}
