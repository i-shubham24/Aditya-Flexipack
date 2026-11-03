import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { Prose } from "@/components/page/Prose";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Aditya Flexipack collects, uses, stores and safeguards your data when you visit our website or use our services.",
  alternates: { canonical: "/privacy-policy/" },
};

const h2 = "display";

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero tone="wash" title="Privacy policy" note="We do not sell or rent your personal data" />

      <Prose>
        <h2 className={h2}>1. Introduction</h2>
        <p>
          Aditya Flexipack values your privacy and is committed to protecting your personal information. This Privacy Policy explains
          how we collect, use, store, and safeguard your data when you visit our website or use our services.
        </p>

        <h2 className={h2}>2. Information we collect</h2>
        <p>We may collect personal and non-personal information, including:</p>
        <ul>
          <li>
            <strong>Personal details:</strong> name, email address, phone number, and company details when you contact us or submit a
            form.
          </li>
          <li>
            <strong>Usage data:</strong> information about how you interact with our website, including IP address, browser type, and
            pages visited.
          </li>
        </ul>

        <h2 className={h2}>3. How we use your information</h2>
        <p>Your information helps us:</p>
        <ul>
          <li>Improve our services and website experience.</li>
          <li>Respond to inquiries and customer support requests.</li>
          <li>Send updates, promotions, and important company communications.</li>
          <li>Ensure security and prevent fraudulent activities.</li>
        </ul>

        <h2 className={h2}>4. Data protection and security</h2>
        <p>
          We implement strict security measures to protect your personal data from unauthorized access, alteration, or disclosure.
          However, while we strive to ensure security, no method of data transmission is 100% secure.
        </p>

        <h2 className={h2}>5. Cookies and tracking technologies</h2>
        <p>
          We use cookies to enhance user experience, analyze website traffic, and personalize content. You can control or disable cookies
          through your browser settings.
        </p>

        <h2 className={h2}>6. Third-party sharing</h2>
        <p>
          We do not sell or rent your personal data. However, we may share it with trusted third-party service providers for business
          operations, legal compliance, or security purposes.
        </p>

        <h2 className={h2}>7. Your rights and choices</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Request access, correction, or deletion of your personal data.</li>
          <li>Opt-out of marketing communications at any time.</li>
          <li>Restrict or object to data processing in certain cases.</li>
        </ul>

        <h2 className={h2}>8. Policy updates</h2>
        <p>We may update this Privacy Policy periodically. Changes will be posted on this page with the updated revision date.</p>

        <h2 className={h2}>9. Contact us</h2>
        <p>For any privacy-related concerns or requests, please contact us at:</p>
        <address className="mt-4 not-italic">
          <strong>{site.name}</strong>
          <br />
          <a href={site.phoneHref}>{site.phone}</a>
          <br />
          {site.cityOffice.lines.join(", ")}
          <br />
          <a href={`mailto:${site.emailAlt}`}>{site.emailAlt}</a>
        </address>
      </Prose>
    </>
  );
}
