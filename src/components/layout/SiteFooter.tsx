import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { footerNav, site } from "@/content/site";
import { FacebookIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { ButtonLink } from "@/components/ui/Button";
import { Year } from "@/components/layout/Year";

/** The wine field the white page lifts off. */
export function SiteFooter() {
  return (
    <footer className="relative text-white">
      <div className="shell grid gap-14 pb-12 pt-20 lg:grid-cols-12 lg:pt-28">
        <div className="lg:col-span-5">
          <p className="display text-[clamp(2.8rem,5.6vw,5.4rem)]">
            Quality is our <span className="text-crimson-light">identity.</span>
          </p>
          <p className="mt-5 max-w-md text-white/75">{site.footerLine}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            <ButtonLink href="/contact-us/" tone="white">
              Start an enquiry
            </ButtonLink>
          </div>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
          {footerNav.map((col) => (
            <div key={col.title}>
              <h2 className="hand text-[1.6rem] text-crimson-light">{col.title}</h2>
              <ul className="mt-3 grid gap-0.5">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href} className="inline-flex min-h-10 items-center text-white/90 transition-colors hover:text-white hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-4">
          <div className="rounded-[var(--radius-lg)] bg-wine-2 p-6 sm:col-span-2">
            <p className="flex items-center gap-2 text-sm font-semibold text-white/60">
              <MapPin className="size-4" /> {site.plant.label}
            </p>
            <address className="mt-2 not-italic leading-relaxed">
              {site.plant.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <a href={site.plant.mapUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block font-semibold text-crimson-light underline">
              Open in Google Maps
            </a>
          </div>
          <div className="rounded-[var(--radius-lg)] bg-wine-2 p-6">
            <p className="flex items-center gap-2 text-sm font-semibold text-white/60">
              <MapPin className="size-4" /> {site.cityOffice.label}
            </p>
            <address className="mt-2 not-italic leading-relaxed">
              {site.cityOffice.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
          </div>
          <div className="grid content-start gap-2.5 rounded-[var(--radius-lg)] bg-wine-2 p-6">
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:underline">
              <Mail className="size-4 text-white/60" /> {site.email}
            </a>
            <a href={site.phoneHref} className="flex items-center gap-2 hover:underline">
              <Phone className="size-4 text-white/60" /> {site.phone}
            </a>
            <div className="mt-2 flex gap-2">
              <a href={site.social.facebook} target="_blank" rel="noreferrer" aria-label="Aditya Flexipack on Facebook" className="grid size-11 place-items-center rounded-[var(--radius-sm)] bg-crimson hover:bg-crimson-light">
                <FacebookIcon className="size-5" />
              </a>
              <a href={site.social.linkedin} target="_blank" rel="noreferrer" aria-label="Aditya Flexipack on LinkedIn" className="grid size-11 place-items-center rounded-[var(--radius-sm)] bg-crimson hover:bg-crimson-light">
                <LinkedInIcon className="size-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black/30">
        <div className="shell flex flex-col gap-1 py-4 text-sm text-white/60 sm:flex-row sm:justify-between">
          <p>
            © <Year /> {site.legalName}. CIN {site.cin}
          </p>
          <p>Kanpur Dehat, Uttar Pradesh, India</p>
        </div>
      </div>
    </footer>
  );
}
