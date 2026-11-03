# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary:** brand, procurement and packaging-development teams at Indian FMCG companies (biscuits, snacks, namkeen, staples, confectionery, home and personal care, pet food). They are choosing or adding a flexible packaging converter, and they compare suppliers on barrier performance, print quality, certifications, capacity, lead time and sustainability compliance (EPR, recyclable mono-material).
- **Secondary:**
  - Job seekers (Career).
  - Suppliers of raw materials, machinery and logistics (Vendor Partnership).
  - Brands applying to partner (Packaging Partnership).
  - Local searchers looking for a flexible packaging manufacturer in Kanpur / Uttar Pradesh.

## Product Purpose

This is the corporate website of Aditya Flexipack Private Limited, a backward-integrated flexible packaging converter in Kanpur Dehat, Uttar Pradesh. It replaces the current WordPress site at adityaflexipack.com and must keep every page and fact that site carries, presented with far more detail.

Success means:

- a qualified buyer understands the capability depth and starts an enquiry or sample request;
- secondary audiences complete their own forms.

## Positioning

Aditya makes almost every layer of a pack in-house on one campus:

- blown and cast films (3/5/7-layer blown, CPP);
- metallising: the first converter in India with a Bobst Vision K5 1,650 mm metalliser with AluBond and Hawkeye, reported by trade press in 2020;
- gravure cylinders (prepress to engraving and re-engraving);
- inks, through an ISO 22000:2018 certified sister concern;
- rotogravure printing, lamination, slitting and pouching;
- recycling and three-stage pyrolysis.

This vertical integration is what a neighbouring converter cannot truthfully copy.

## Operating Context

- Buyers evaluate structures (layers, microns, barrier), finishes, formats and filling-machine fit.
- They request samples and trials, check certificates (BRCGS, HACCP, SEDEX), and must meet EPR rules under India's Plastic Waste Management Rules.
- The business is family-owned and managed, with 25+ years of operation. The first unit dates from around 2000; the business became an LLP in 2014 and a Pvt Ltd in 2019.

## Capabilities and Constraints

- **Pages that must exist** (parity with the old site, same URLs):
  - Home, About (Our Story), Our Offerings, Awards & Recognitions, Sustainability
  - Products: Laminates, Pouches, Films, Inks, Cylinders, Polybags
  - Career, Packaging Partnership, Vendor Partnership, Contact
  - Gallery, Privacy Policy, Terms & Conditions
- **Forms** (with the same fields as the old site): contact; career with resume upload; packaging partnership; vendor partnership with catalogue upload.
  - Delivery: a server route that emails info@adityaflexipack.com through a mail service once its API key is configured. Until then it validates and states that delivery is not live.
- **Stack:** the existing Next.js 16 / React 19 / Tailwind 4 project in this repo. Lenis smooth scrolling is required.
- **Open:**
  - The mail provider.
  - A vector logo, which is not yet supplied; only a 341×56 PNG exists.
  - Full-resolution photography; only 648 px plant photos plus the gallery webps exist.

## Brand Commitments

- **Name and tagline:** Aditya Flexipack; tagline "Quality is our Identity".
- **Logo:** red oval AF monogram, red serif wordmark, silver tagline. The logo red is #CE0000.
- **Binding constraints from the user:**
  - Colours derived from the logo.
  - A smooth, curvy theme: round buttons, soft rounded surfaces, nothing boxy.
  - No em dashes in copy.
  - No divider lines and no pill badges or tags.
  - The hero follows the Dribbble "Soft Drink FMCG Brand Website" composition (dribbble.com/shots/27034033), adapted to packaging.
  - Packs float and shift between positions on scroll.
  - Do not reuse the signature devices of the user's earlier Bliss Wedding and Knurl sites.

## Evidence on Hand

- **Claims kept from the old site** (user decision: keep old-site claims):
  - Laminates capacity 4,000 MT/month
  - 18-acre campus on NH-2, 15 km from Kanpur
  - 500+ team
  - BRCGS Issue 7 Grade A, SEDEX/SMETA 7 (4-pillar), HACCP, ISO 22000:2018 (ink unit)
  - 1.35 MW solar, three rainwater-harvesting systems, recycling plant and three-stage pyrolysis, PIR materials on request
- **Awards** (the old Awards page):
  - Entrepreneur of the Year (India), twice: presented by Dr A.P.J. Abdul Kalam and by Smt. Pratibha Patil
  - Parle Certificate of Excellence, two-time Gold
  - ITC Foods Innovation & Contribution, twice
  - BCIC, two awards
  - Highest Export in Plastics (U.P.)
  - Entrepreneur of the Year (U.P.), three times
  - MSME Excellence, Udyam Samaagam 2019
  - Business Standard Best Employer Brand 2018
  - Britannia Certificate of Appreciation, COVID-19 support
- **Third-party verified:** Bobst Vision K5 with AluBond, first in India (The Packman, PrintWeek, 2020).
- **Assets:**
  - Real plant photos (2025)
  - Award and gallery photos
  - Certificate marks (BRC, HACCP, ISO, d2w, VRC)
  - CEO message from Aditya Tandon, Managing Director & Global CEO (the old site spells it "Tondon"; confirm)
  - All of these are in `public/media/`.
- **Absent, never to be fabricated:**
  - Testimonials, client logos, case-study numbers
  - Barrier test values (OTR/WVTR)
  - Lead times, MOQ, pricing

## Product Principles

1. Show the machine, not adjectives: every claim ties to a process, a material or a document.
2. Buyers first: structure, barrier, format and compliance answers are one scroll away.
3. Complete parity, deeper detail: nothing the old site said is lost.
4. Honest numbers: state the client's published figures; never invent new ones.

## Accessibility & Inclusion

- WCAG 2.2 AA.
- Touch targets of at least 44 px.
- Full keyboard operation.
- `prefers-reduced-motion` gets complete static compositions.
- Content readable without JavaScript.
