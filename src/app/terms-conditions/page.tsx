import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { Prose } from "@/components/page/Prose";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms and conditions",
  description: "The terms and conditions for using the Aditya Flexipack website and services, governed by the laws of India.",
  alternates: { canonical: "/terms-conditions/" },
};

const h2 = "display";

export default function TermsPage() {
  return (
    <>
      <PageHero tone="foil" title="Terms and conditions" note="Governed by the laws of India" />

      <Prose>
        <h2 className={h2}>1. Introduction</h2>
        <p>
          Welcome to Aditya Flexipack. By accessing or using our website and services, you agree to comply with these Terms and
          Conditions. Please read them carefully before using our platform.
        </p>

        <h2 className={h2}>2. Use of website</h2>
        <ul>
          <li>You must use this website only for lawful purposes and in accordance with these terms.</li>
          <li>Unauthorized use, including hacking, data mining, or infringement of intellectual property, is strictly prohibited.</li>
          <li>We reserve the right to modify or discontinue any part of the website without prior notice.</li>
        </ul>

        <h2 className={h2}>3. Intellectual property rights</h2>
        <ul>
          <li>All content, including text, images, logos, and trademarks, is the property of Aditya Flexipack and protected by applicable laws.</li>
          <li>You may not copy, reproduce, distribute, or modify any content without prior written permission.</li>
        </ul>

        <h2 className={h2}>4. Product and service information</h2>
        <ul>
          <li>We strive to provide accurate descriptions of our products and services, but we do not guarantee that all information is error-free.</li>
          <li>Prices, specifications, and availability are subject to change without notice.</li>
        </ul>

        <h2 className={h2}>5. Limitation of liability</h2>
        <ul>
          <li>We shall not be liable for any direct, indirect, or incidental damages arising from the use of our website or services.</li>
          <li>We do not guarantee uninterrupted or error-free access to our website.</li>
        </ul>

        <h2 className={h2}>6. Privacy policy</h2>
        <p>
          Your use of our website is also governed by our <Link href="/privacy-policy/">Privacy Policy</Link>, which explains how we
          collect and handle your data.
        </p>

        <h2 className={h2}>7. Third-party links</h2>
        <p>
          Our website may contain links to third-party websites. We do not endorse or control these websites and are not responsible for
          their content or policies.
        </p>

        <h2 className={h2}>8. Indemnification</h2>
        <p>
          You agree to indemnify and hold Aditya Flexipack harmless from any claims, losses, or liabilities arising from your use of our
          website or violation of these terms.
        </p>

        <h2 className={h2}>9. Changes to terms and conditions</h2>
        <p>We reserve the right to update or modify these Terms and Conditions at any time. Changes will be effective upon posting.</p>

        <h2 className={h2}>10. Governing law</h2>
        <p>
          These Terms and Conditions are governed by the laws of India. Any disputes shall be resolved in the appropriate courts of
          jurisdiction.
        </p>

        <h2 className={h2}>11. Contact us</h2>
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
