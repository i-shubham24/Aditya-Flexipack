# Inner pages: creative direction

Research and specification only. No site code is written here. Prepared 3 Nov 2026.

Scope: every route under `src/app/` except the homepage. That is About, Sustainability, Awards and recognitions, Gallery, Career, Products (index), the six product pages, Offerings, Packaging partnership, Vendor partnership, Contact, Privacy policy and Terms and conditions.

What stays fixed:

- Copy and claims stay exactly as published (old-site text in the scratchpad `text/*.txt`, mirrored in `src/content/`). Only presentation changes. The few new UI labels this plan needs are listed in section 7 for client sign-off.
- The v3 language stays: Cabinet Grotesk 800, General Sans, Caveat notes, full-bleed colour heroes, rounded colour panels, split buttons, white photo frames, the wine footer the sheet lifts off.
- Palette stays the logo palette only: crimson, crimson-deep, crimson-light, crimson-wash, blush, wine (and wine-2), foil, foil-2, foil-3, ink, white.

---

## 1. Diagnosis: why the inner pages feel basic, samey and unordered

The client's words were "basic and similar", "unordered and just thrown". Both are accurate, and both have specific causes in the code.

1. **One hero for every page.** `src/components/page/PageHero.tsx` opens all 13 inner routes and all six product slugs with the same anatomy: H1 in columns 1-7 popping in word by word, a Caveat note, an intro, and two white-framed photos at 8° and -4° in columns 8-12, over the same three contour paths. Only the tone (four options) and the photos change. The homepage hero (`components/home/Hero.tsx`) uses the same tilted photo cards and the same contour paths, so every inner page opens by restating the homepage.

2. **The tilted card is the only idea, and it is everywhere.** The inner-page components and pages carry 71 hard-coded rotations and 21 "leans, then squares up on hover" cards: `FactCards`, `Capabilities`, `ReasonTags`, `SplitRow`, `CertificateSeals`, `AwardWall`, `GalleryWall`, `PlantStrip`, `Initiatives`, `SolutionCards`, `FilmLines`, `ProductGrid`, `IndustryTiles`, `RelatedProducts`, `ExtraPanel`, `RecycleBand`, `FormSection` and the contact cards. On top of the tilts sit fake staggers (`ProductGrid` `md:translate-y-32`, `PlantStrip` `md:translate-y-10`, `Applications` `lg:translate-y-8`) and percentage indents (`ReasonTags` `lg:ml-[4%]` to `lg:ml-[30%]`, `ClosingLines` `lg:ml-[14%]`). This is, literally, "thrown".

3. **The same section header, 21 times.** A display H2 in `lg:col-span-7`, then a Caveat note rotated -2° in `col-span-5` or straight under it. A reader meets the same header shape six to ten times per page, and the handwriting stops reading as a note.

4. **Split rows and card grids in rotation.** About uses `SplitRow` and its clones seven times. `Initiatives` and `AwardGroup` are `SplitRow` clones (alternating flip). Everything else is `grid sm:grid-cols-2 lg:grid-cols-3|4` of rounded colour cards, usually with a lucide icon in a crimson square: `ReasonGrid`, `PartnerSteps`, `FactCards`, `SolutionCards`, `IndustryTiles`, `PackIndex`, `Glance`, `ExtraPanel`, `Capabilities`, `Applications`.

5. **Whole pages are copies of each other.**
   - `packaging-partnership/page.tsx` and `vendor-partnership/page.tsx` are built from the same four components in the same order (PageHero, ReasonGrid, PartnerSteps, FormSection), with the same step icons. Vendor only adds one "who can apply" section.
   - The partnership steps repeat the homepage `ProcessCards` steps.
   - All six product pages are one template (Glance, SplitRow, OfferingList or FilmLines, SolutionCards, ExtraPanel, RelatedProducts, RecycleBand, CtaPanel) that differs only in tone and photos.

6. **Every page ends the same way.** `CtaPanel` ("Have a pack in mind?") closes seven routes, `RecycleBand` closes the products index and all six product pages, and three pages end on `FormSection`.

7. **There is no scale, so nothing lines up.** The inner pages use about 40 different `clamp()` display sizes for headings and figures, six section paddings (`--section-y` times 1, 0.55, 0.7, 0.75, 0.8, and `--frame`), 13 content widths from `16ch` to `64rem`, and seven column splits (7/5, 6/6, 5/7, 6+5, 4/8, 3/9, 5+6). Edges and baselines move from section to section.

8. **The panel left edge still drifts at two widths.** The new `.panel .shell` rule (`globals.css`, lines 131-134) aligns panel content with the page between about 640 and 1472 px. At 375 px, panel content sits 8 px further in (8 px frame plus a 16 px floor, against a 16 px gutter). Above 1500 px it sits 14 px further left, because the panel's shell centres inside a narrower box. Section 2.3 gives the fix.

9. **Generic icons stand in for content.** Rocket, TrendingUp, BadgeCheck and Handshake tiles (`ReasonGrid`, `Glance`, `ExtraPanel`, `IndustryTiles`, `PackIndex`, `Capabilities`) are the template tell that `AGENTS.md` warns against.

10. **Content is repeated, and photos are stretched.**
    - `Capabilities` restates the homepage web path.
    - The same four figures appear as dealt cards on About and Career.
    - Every hero is `min(86svh, 54rem)` tall, so every page spends a full screen before its content. Aardvark's inner pages use a short hero.
    - The 648 px plant photos are set 500 to 600 px wide (`SplitRow`, hero cards), so they look soft on 2x screens.

---

## 2. Layout system

One grid, one left line, one rhythm. Every page below is specified in these terms.

### 2.1 The grid

| Viewport | Columns | Column gap | Gutter |
|---|---|---|---|
| under 640 px | 4 | 1 rem | `--gutter` (24 px at 375) |
| 640 to 1023 px | 8 | 1.25 rem | `--gutter` |
| 1024 px and up | 12 | clamp(1.25rem, 1.8vw, 1.5rem) | `--gutter` (48 px at 1440) |

The shell stays `max-width: 92rem` with `padding-inline: var(--gutter)`. At 1440 px the content box is 1344 px and a column is about 90 px.

Named spans (desktop, 12 columns). Use these names in component props so nobody invents a new split.

| Name | Columns | Use |
|---|---|---|
| Full | 1-12 | centrepieces, panoramic photos, strips |
| Lead | 1-7 | H1, H2, centrepiece copy |
| Side | 8-12 | standfirst beside an H2, hero objects, photos |
| Half L / Half R | 1-6 / 7-12 | two-up text, address pairs |
| Text | 1-6 | running copy (capped by the measure) |
| Quarter | 9-12 | portrait photos, the small 648 px plant photos, form side notes |
| Document | 3-9, numbers in 1-2 | legal clauses |

On 8 columns, Lead and Side stack. Half spans become 1-4 / 5-8. On 4 columns everything is 1-4 unless a page says otherwise.

### 2.2 Fixed alignment rules

- **Left line.** Every H1 and H2 starts at column 1, inside panels and outside them. No centred headings, no percentage indents.
- **Section header.** It is always the same pair. The H2 sits in Lead (1-7). The standfirst (one or two sentences, max 30 rem) sits in Side (8-12), bottom-aligned to the H2's last line. On 8 and 4 columns it drops under the H2 with a 1.25 rem gap.
- **Measure.** `--measure: 36rem` for body copy and `--measure-doc: 42rem` for legal text. No other `max-w` values for text.
- **Images.**
  - Photos snap to column edges and use one of five ratios: 1:1, 4:5, 4:3, 16:9 or 21:9.
  - No photo is rotated.
  - A 648 px plant photo is never wider than four columns (about 430 px) on desktop.
  - Only 1,200 px and larger sources may span six columns or more.
- **Type scale.** Five display steps. Nothing else is allowed.

  | Token | Size | Use |
  |---|---|---|
  | `--d0` | clamp(3.5rem, 11vw, 10rem) | product and range names in range heroes only |
  | `--d1` | clamp(3rem, 7.5vw, 7.5rem) | every other H1 |
  | `--d2` | clamp(2.5rem, 5.2vw, 5.25rem) | section H2 |
  | `--d3` | clamp(1.75rem, 2.8vw, 2.75rem) | H3, figures in strips, centrepiece labels |
  | `--d4` | clamp(1.375rem, 1.9vw, 1.75rem) | row and list titles |

  Body text is 1.0625 rem with 1.6 leading, lead text 1.25 rem, small text 0.9375 rem and captions 0.875 rem. Caveat notes are fixed at clamp(1.5rem, 2.2vw, 2rem).
- **Vertical rhythm.** There are two spacing tokens and nothing in between.
  - `--section-y`: block padding for every white section and inside every panel.
  - `--stack`: clamp(2.5rem, 5vw, 4rem), the gap between a section header and its body.
  - Panels next to panels (or the hero) are separated by the `--frame` seam, as today.
  - White sections take `padding-block: var(--section-y)`.
  - The 0.55, 0.7, 0.75 and 0.8 multipliers are retired.
- **Panels and the shell.** Panels inset by `--frame`, and `.panel .shell` pulls their content back out to the page's left line (the coordinator's update). Two edits close the remaining drift (see 2.3).
- **The end of the sheet.** The last panel on every page (the tear strip, section 4.2) keeps a `--frame` white margin below it, so the sheet's rounded bottom never melts into the wine footer even when the strip itself is wine.

### 2.3 Panel alignment, checked

| Viewport | Page content starts at | Panel content starts at (today) | With the fix |
|---|---|---|---|
| 375 | 16 px | 24 px (8 frame + max(16, 8)) | 24 px = 24 px |
| 1024 | 34.8 px | 34.8 px | 34.8 px |
| 1440 | 48 px | 48 px | 48 px |
| 1920 | 272 px | 258 px | 272 px |

The fix, as a spec for the build:

```css
:root { --gutter: clamp(1.5rem, 3.4vw, 3rem); }      /* floor 1rem -> 1.5rem */
.panel .shell {
  max-width: calc(92rem - 2 * var(--frame));        /* re-centre inside the inset panel */
  padding-inline: calc(var(--gutter) - var(--frame));
}
```

The 24 px mobile gutter leaves 327 px of content at 375 px, which every centrepiece below is drawn for. The alternative (`--frame: 0` under 640 px, so panels go edge to edge on phones) also aligns. It loses the rounded panel edges on mobile, which carry the v3 look, so it is not recommended.

### 2.4 Always

1. Start every heading on the left line, at one of the five display steps.
2. Give each page exactly one centrepiece. It must start within the first two and a half screens.
3. Alternate backgrounds: no two neighbouring sections share a field.
4. Ship the finished, static end state of every centrepiece in the HTML, and animate from it with JS. Reduced-motion and no-JS visitors get that end state.
5. Give every interactive element a 44 px target and the existing focus ring.
6. Caption photos with what they show, using the alt text in `docs/old-site-media.md`.
7. Pair crimson text with white, foil or crimson-wash only. Pair white text with crimson, crimson-deep, wine or ink.
8. End every page with the tear strip to the next page (section 4.2).
9. Scrubbed motion is linear and one to one with scroll. Reveals are a 24 px rise and fade over 0.6 s, once.

### 2.5 Never

1. Rotate a card, photo or panel. The only rotated element on an inner page is a Caveat note, at -2°.
2. Fake a stagger with `translate-y` or indent with `ml-[%]`.
3. Put a Caveat line directly under an H2, or use more than two Caveat notes on a page.
4. Use icon tiles (an icon in a coloured square) as content. Use numbers, the `Pack` silhouettes, or nothing.
5. Pin a section on mobile, or pin more than one section on a page. None of the centrepieces below needs a pin.
6. Draw a scroll-driven connecting path. That is the homepage web path's job.
7. Use these colour pairs:
   - crimson text on wine (2.8:1);
   - crimson text below 24 px on blush (4.0:1);
   - white text on crimson-light (3.3:1);
   - steel `#8b9198` for any text, including form placeholders (3.2:1 on white).
8. Use em dashes, divider lines, pill shapes, eyebrow labels, drop shadows, gradient text, or any figure, logo or testimonial the client has not published.
9. Reuse a device from the banned list:
   - ring fly-through, circle clip portal, horizontal pin-pan or rolling ring;
   - a floating object that bobs and tilts;
   - a word-by-word manifesto or a counter loader;
   - a labelled cursor, a sticky left heading or an auto marquee;
   - magnetic buttons, drag rails, or a hover list that swaps an image;
   - a grain overlay.

   Nor a homepage centrepiece: hero photo cards, product carousel, fanned process cards, web path, giant industry list, arc title with stickers, tape bands, awards scatter, sustainability loop, FAQ, wave headline with floating pouches, or the pack shelf.

---

## 3. Page by page

Each page has one family (it sets the hero, section 4.1), one field colour, and one centrepiece found nowhere else on the site. Sequences list the hero as section 1 and the tear strip last. Grid columns are desktop; the mobile column is in the centrepiece spec.

Every new microcopy label used below is listed in section 7.

### 3.1 About us: "Under One Roof"

Company family. Wine field, stand-up pouch window. Next page: Sustainability.

**Speciality: Under One Roof, a section drawing of the integrated plant.** This is an architect's cut-through elevation of one long factory shed with a saw-tooth roof. It is drawn in 2 px crimson lines on the foil panel and makes "heavily backward integrated" visible in one image.

- **Drawing.**
  - Inline SVG, viewBox 1200 × 420, spanning columns 1-12.
  - Six roof bays, each 200 units wide, so each bay sits over exactly two grid columns.
  - Each bay holds a simple line glyph of one capability from the old About list, in the old order:
    1. In-house ink manufacturing: a drum and stirrer.
    2. Cylinder making: a cylinder on stands.
    3. CPP film processing: a flat die over a roll.
    4. In-house metallising: a chamber with a reel.
    5. Liquid and shaped pouching: a `Pack` stand-up outline.
    6. Pyrolysis plant and waste recycling: a hopper feeding three boxes.
  - Solar panels run along the saw-tooth slopes. Three rainwater tanks sit under the ground line at the right end, for the old item "Solar energy generation and rainwater harvesting".
  - A capacity plate on the left gable reads "Laminates production capacity: 4,000 MT/month".
- **Captions.** An HTML `<ol>` sits under the drawing with six items, each spanning the two columns under its bay. Each item has a number in `--d3`, the capability title in `--d4`, and a 1:1 photo thumbnail where a real photo exists (see images).
  - A second row under the ground line holds the solar and rainwater item. It links to `/sustainability/`.
  - A "Visit the gallery" text link closes the caption row.
- **Motion.** ScrollTrigger scrub (linear, no pin) from the section top at 75 % of the viewport to its bottom at 40 %. Progress lights the bays one by one, cumulatively:
  - the bay interior fills foil to white;
  - its caption text goes from ink-soft to ink;
  - its thumbnail goes from 40 % to 100 % opacity.

  At 90 % progress the roof panels light in one quick pass and the tanks fill. By the end the whole plant is lit: everything under one roof.
- **Mobile (under 640).** A second SVG (viewBox 360 × 1100) turns the shed into a stacked section: six storeys top to bottom in the same order, the solar roof on top and the tanks at the base. Each storey carries its caption on its right half and lights when it crosses 60 % of the viewport (toggle, not scrub).
- **640 to 1023.** The desktop drawing scales down, with the captions in a 3 × 2 grid.
- **Reduced motion.** Every bay is lit and every caption is at full strength.
- **Accessibility.** The SVG is `aria-hidden`. The `<ol>` carries all the content.

**Section sequence**

| # | Section | Purpose | Grid | Background |
|---|---|---|---|---|
| 1 | Hero | "Pioneering flexible packaging for India's leading food brands", intro, Contact us and Our products | H1 1-7, window 8-12 | wine |
| 2 | Story and identity strip | The 25-years story, then the four published figures (25+ years, 500+ people, 4,000 MT/month, 18 acres) as type only: four equal cells, figure in `--d2`, label below, no cards | H2 1-7, copy 8-12; strip 1-3/4-6/7-9/10-12 (2 × 2 on mobile) | white |
| 3 | Under One Roof | The centrepiece; H2 "Our integrated infrastructure", standfirst "Heavily backward integrated" | Full | foil panel |
| 4 | Why us | The five reasons as a typeset list, one per line in `--d3`, straight, white on crimson; the family paragraph beside them | List 1-7, paragraph 8-12 | crimson panel |
| 5 | Infrastructure | 18 acres, NH-2, 15 km from Kanpur; the five compliance lines as rows with a crimson check glyph, separated by alternating foil and white fills | Copy 1-6, photo 7-12 (16:9) | white |
| 6 | Quality | The QC laboratory text | Copy 1-6, photo 9-12 (4:5) | foil panel |
| 7 | Recognised by clients and the nation | Two paragraphs, link to Awards | Copy 1-6, photo 7-12 (4:3) | white |
| 8 | Circular economy | "Pioneering sustainable packaging for a better future", body, link | Copy 1-6, photo 7-12 (16:9) | wine panel |
| 9 | Application areas | The eight areas as `Pack` silhouettes with names, in a straight 4 × 2 grid with no colour cards and no offsets, plus a link to Offerings | 3 columns each, 2 per row on mobile | white |
| 10 | Tear strip | Next: Sustainability | Full | foil |

**Images**

- Hero window: `/media/old/home/plant-exterior-building.webp`
- Bay thumbnails:
  - ink: `/media/old/products-inks/photo-ink-pots-printing-unit.webp`
  - cylinders: `/media/old/home/plant-copper-cylinder-engraver.webp`
  - film: `/media/old/home/plant-blown-film-tower-close.webp`
  - metallising: `/media/old/products-films/banner-film-slitting-rolls.webp`
  - converting: `/media/old/home/plant-super-perfast-machine.webp`. Caption it as "the Super Perfast machine" until the client confirms it is a pouching line.
- Infrastructure: `/media/old/about-us/plant-exterior-wide.webp`
- Quality: `/media/old/gallery/plant-proof-press-sleeve-close.webp`
- Recognition: `/media/old/awards-recognitions/award-presentation-president-patil.webp`
- Circular economy: `/media/old/home/photo-eco-pouch-shopping-basket.webp`. This replaces the Frame-33 wood-table mockup, which the earlier research flagged as AI-generated.

**References**

- Q Industrial, About ([q-industrial.com/en-de/about](https://www.q-industrial.com/en-de/about), Awwwards SOTD [awwwards.com/sites/q-industrial](https://www.awwwards.com/sites/q-industrial)). A red (#CA0000) and grey (#E6E6E6) industrial site whose About page explains capability in numbered, ordered blocks instead of prose walls.
- Zajno, Industrial Manufacturing Website ([dribbble.com/shots/27522234](https://dribbble.com/shots/27522234)). A machined part opens to show what is inside. We take the cut-away idea, drawn as a section instead of a 3D split.
- Anti-reference: UFlex About ([uflexltd.com](https://www.uflexltd.com/)): long text blocks with Read More toggles and a ten-card business grid.

### 3.2 Sustainability: "The Mimic Panel"

Company family. Foil field, flat-bottom (gusset) bag window. Next page: Awards.

**Speciality: The Mimic Panel, a control-room board for the plant's resources.** Factories run on mimic panels: a dark board with a schematic and indicator lamps. Here the board is the wine panel itself, with foil-silver line work and crimson-light lamps. It holds the four initiatives as one object, not four cards.

- **Layout (desktop).**
  - Four system regions on the 12-column grid: Rainwater harvesting (1-6, row 1), 1.35 MW solar power (7-12, row 1), Recycling and three-stage pyrolysis (1-6, row 2), and PIR materials (7-12, row 2).
  - A static 2 px foil-3 "bus" runs round the four regions into a centre node, which reads "Rania, Kanpur Dehat" (from the plant address).
  - Each region contains:
    - a glyph (SVG, foil line art);
    - an indicator lamp (16 px, foil-3 when off, crimson-light when on);
    - a readout in `--d2` tabular figures, from the old copy: "3", "1.35 MW", "3 stages" and "PIR";
    - the title in `--d4`;
    - the old paragraph in white at 80 %, 34 rem measure.
- **Glyphs.**
  - Rainwater: three tanks with a level fill.
  - Solar: a 6 × 3 array of panel cells.
  - Recycling and pyrolysis: a hopper feeding three chambers in series.
  - PIR: a film band whose loose flakes close into a smooth band.
- **Motion.** Once, when the panel's top reaches 70 % of the viewport:
  - the lamps switch on one by one, 0.25 s apart;
  - the tanks fill bottom up over 0.8 s;
  - the solar cells light in a diagonal sweep over 0.6 s;
  - the three chambers go from foil to crimson-light in turn, 0.2 s each;
  - the flakes close up over 0.6 s.

  Nothing loops.
- **Mobile.** The regions stack in the same order. The bus becomes a single vertical line down the left edge, linking the four lamps like a ladder diagram. Each region animates as it enters.
- **Reduced motion.** Lamps on, tanks full, chambers lit, band smooth.
- **Accessibility.** Each region is an `<article>` with an H3. Glyphs are `aria-hidden`, and readouts are real text.

**Section sequence**

| # | Section | Purpose | Grid | Background |
|---|---|---|---|---|
| 1 | Hero | "Sustainability at the core of our packaging solutions", intro, recyclable-packs action | H1 1-7, window 8-12 | foil |
| 2 | The Mimic Panel | H2 "Our key sustainability initiatives" and the board | Full | wine panel |
| 3 | Message from our CEO | The quote in `--d3`, the name set as a Caveat signature, title below | Quote 1-10 | white |
| 4 | Our eco-friendly approach | Heading, the line "Moving towards a greener tomorrow" in `--d4`, the paragraph; the panoramic seedling photo as a 21:9 band | Copy 1-6, photo Full | crimson-wash panel |
| 5 | Closing line | "Smart packaging. Cleaner planet. Sustainable future." as three straight lines in `--d1` on the left line, in crimson, wine and ink; the recyclable-packs split button in 8-12 | Lines 1-7, button 8-12 | white |
| 6 | Tear strip | Next: Awards | Full | crimson |

**Images**

- Hero window: `/media/old/home/photo-eco-pouch-shopping-basket.webp`
- Eco approach band: `/media/old/about-us/photo-seedling-in-hand.webp` (2000 × 672, a true panorama)
- CEO mark: `/media/old/shared/af-emblem-tile.webp`
- Avoid `/media/old/sustainability/stock-businessman-portrait.webp` (stock) and `leaf-green-cutout.webp` (off-palette graphic).

**References**

- Constantia Flexibles ([cflex.com](https://www.cflex.com/)): each sustainability claim is a short, findable teaser ("PPWR ready."). We keep one claim per region, each with its figure.
- Zajno, Motion for a Recycling Website ([dribbble.com/shots/21968292](https://dribbble.com/shots/21968292)): material moving through a system, explained as a diagram, not adjectives.
- Anti-references: UFlex's sustainability is a single image tile, and Jindal Poly Films ([jindalpoly.com](https://www.jindalpoly.com/)) offers three bullets with no figures. Both state sustainability as adjectives.

### 3.3 Awards and recognitions: "The Honours Board"

Company family. Crimson field, pillow pack window. Next page: Gallery.

**Speciality: The Honours Board.** This is the lacquered board Indian institutions hang in their halls, with every honour typeset in rows. The board leads with the tallies the old copy already states: twice, two-time, thrice. That makes the depth of recognition legible in one glance, without inventing a number.

- **Board.**
  - A wine-2 field (radius xl) inside the wine panel, spanning columns 1-12.
  - Nine rows, grouped as the current page groups them:
    - Nation and state: Entrepreneur of the Year (India) ×2, Entrepreneur of the Year (U.P.) ×3, Highest export in plastics (U.P.) ×1, MSME Excellence at Udyam Samaagam 2019 ×1.
    - Brands: Parle Certificate of Excellence ×2, ITC Foods Division awards ×2, Britannia Certificate of Appreciation ×1.
    - Industry: BCIC ×2, Best Employer Brand 2018 ×1.
- **Row anatomy.**
  - The tally in columns 1-2, in `--d2` crimson-light (4.9:1 on wine).
  - The title in columns 3-8, `--d3`, white.
  - The awarding body in columns 9-10, blush, body size.
  - A small split-button link "See it" in columns 11-12, at least 44 px, which jumps to that award's evidence below.
  - Rows are at least 5.5 rem tall, separated by alternating wine-2 and wine fills, never by lines.
- **Motion.** When the board enters, rows rise 16 px and fade, 0.06 s apart, once. Each tally then snaps into register: two offset copies, one in crimson and one in blush, set 4 px apart, slide onto the final glyph in 0.35 s with a slight overshoot. The copies are `aria-hidden`.
- **Mobile.** Each row becomes two lines: tally and title, then awarding body and link.
- **Reduced motion.** The final board, with no register snap.
- **Evidence below the board.** Three contact sheets: Nation and state, From the brands, and Industry and workplace.
  - Each award's label block (title, by, body) sits in columns 1-4.
  - Its photographs sit in columns 5-12 as a justified row: equal heights, widths from each image's real ratio, white 8 px frames, straight.
  - The short object captions stay, set in General Sans at caption size.
  - The tally in `--d3` heads each label block, so board and evidence match.

**Section sequence**

| # | Section | Purpose | Grid | Background |
|---|---|---|---|---|
| 1 | Hero | "Celebrating excellence in sustainable packaging", intro, Our story | H1 1-7, window 8-12 | crimson |
| 2 | The Honours Board | H2 "Awards and achievements" and the nine rows | Full | wine panel |
| 3 | Our certificates | Five marks in one straight row: mark, name, line of body; 2 per row on mobile | 5 equal cells across 1-12 | white |
| 4 | Honours from the nation and the state | Contact sheet | Labels 1-4, photos 5-12 | crimson-wash panel |
| 5 | From the brands we pack for | Contact sheet | Labels 1-4, photos 5-12 | white |
| 6 | From industry and the workplace | Contact sheet | Labels 1-4, photos 5-12 | foil panel |
| 7 | Tear strip | Next: Gallery | Full | ink |

**Images**

- Hero window: `/media/old/awards-recognitions/award-presentation-trophy-photo.webp`
- Certificates: `/media/old/awards-recognitions/cert-brc-global-standards.webp`, `cert-vrc-compliance.webp`, `cert-d2w.webp`, `cert-haccp.webp`, `cert-iso-22000.webp`
- Contact sheets: all 19 photographs in `/media/old/awards-recognitions/`. The same files exist under `/media/awards/`, which the code uses today.
- Flag for the client: the ISO badge still reads 22000:2005.

**References**

- Q Industrial, About ([q-industrial.com/en-de/about](https://www.q-industrial.com/en-de/about)): a row of year cards at the foot of the story that link into each milestone. Our board rows link into their evidence the same way.
- Aardvark, book page ([aardvarkbookclub.com/books/stations](https://www.aardvarkbookclub.com/books/stations)): proof (press quotes) sits right beside the claim it supports. We take the adjacency, not the scattered angles.
- Anti-reference: Jindal Poly Films' grid of about 40 thumbnails, every one with alt text "...", which proves nothing.

### 3.4 Gallery: "The Imposition Sheet"

Company family. Ink field, sachet window. Next page: Career.

**Speciality: The Imposition Sheet.** A printer lays repeats out on one press sheet in a strict step-and-repeat, with crop marks, registration targets and a colour bar. The gallery is that sheet. It answers "unordered" head on: the 648 × 648 plant photos are squares, so they impose perfectly.

- **Sheet.**
  - A white sheet (radius 6 px, since sheets are square) on the foil panel, which reads as the press bed.
  - Cells are 3 columns wide and 1:1. The one wide photo spans 6 columns and takes the row's height.
  - 10 px crop marks (L-ticks in ink-soft) sit 6 px outside each image corner.
  - A 20 px registration target sits at the middle of each sheet edge.
  - Captions under each cell use the alt text (caption size) and the area name.
- **Colour bar as filter.** The sheet's bottom edge is a colour bar of six patches: All, Printing, Cylinders, Film, Converting, Campus.
  - Each patch is a palette colour with its label inside, at least 44 px tall, square-cornered, `aria-pressed`.
  - The existing live count ("Showing 17 photographs") sits under it.
  - Choosing an area re-imposes the sheet with GSAP Flip:
    - leaving cells shrink to 0.96 and fade over 0.2 s;
    - staying cells move to their new slots over 0.5 s, expo-out;
    - new cells fade in.
- **Viewer.** Activating a cell opens a `<dialog>` on ink with:
  - the photo, capped at 1.25× its native size so 648 px images stay sharp;
  - the caption and area;
  - a position line, for example "3 of 17";
  - previous and next buttons (48 px) and a close button.

  Left and right arrow keys move, Esc closes, focus is trapped and returns to the cell. Navigation is by buttons only, with no swipe rail.
- **Mobile.** Two cells per row (2 of 4 columns each). The wide photo spans 4 columns at 16:9. The colour bar wraps to 3 × 2 patches above the sheet.
- **Reduced motion.** Filters swap instantly and the viewer opens without a zoom.

**Section sequence**

| # | Section | Purpose | Grid | Background |
|---|---|---|---|---|
| 1 | Hero | "Our journey in packaging innovation", note "Capturing excellence", intro | H1 1-7, window 8-12 | ink |
| 2 | The Imposition Sheet | H2 "Around the plant", filter, sheet, viewer | Full | foil panel |
| 3 | Tear strip | Next: Career | Full | blush |

**Images**

- Hero window: `/media/old/gallery/plant-printed-film-rewinder.webp`
- Sheet: the 17 photos now in `GalleryWall`.
  - From `/media/old/home/`: plant-press-hall-overview, plant-copper-cylinder-engraver, plant-super-perfast-machine, plant-exterior-building, plant-copper-cylinder-engraver-wide, plant-laminator-unwind-s575, plant-blown-film-tower-close, plant-grey-enclosed-machine, plant-production-hall-floor.
  - From `/media/old/gallery/`: plant-blown-film-tower-stairs, plant-proof-press-wide, plant-printed-film-rewinder, plant-printed-web-rewind, plant-proof-press-sleeve-close, plant-enclosed-line-cabinets, plant-control-cabinet-c1.
  - The wide cell: `/media/old/about-us/plant-exterior-wide.webp`.
- Do not use `banner-skyline-dusk-faded.webp`: it is faded to white with a baked-in notch.

**References**

- Aardvark, All books ([aardvarkbookclub.com/allbooks](https://www.aardvarkbookclub.com/allbooks)): a filter row over a grouped catalogue, with a proper "no results" state.
- Q Industrial, Industries ([q-industrial.com/en-de/industries](https://www.q-industrial.com/en-de/industries)): zero-padded, numbered photo tiles in a strict grid, with every tile one link.
- Porter Packaging ([awwwards.com/sites/porter-packaging-1](https://www.awwwards.com/sites/porter-packaging-1)): a packaging maker's gallery and case-study index treated as a primary page.

### 3.5 Career: "The Headcount Print"

Company family. Blush field (wine type), spout pouch window. Next page: About.

**Speciality: The Headcount Print.** A field of exactly 500 dots, one for each person in the published "500+ skilled professionals". The dots print row by row like an inkjet coder, the kind that marks batch codes on every pack. The dots that fall inside a dot-matrix "500+" print in crimson-light and the rest in wine-2, so the number emerges from the people. One dot, bottom right, stays an empty white ring: the "+". It is the link to the application form.

- **Field.**
  - SVG grid of 25 × 20 dots across columns 1-12, about 54 px pitch and 18 px dots at 1440.
  - The glyphs use a 5 × 7 dot-matrix figure set, scaled 2× vertically, with one blank column between characters.
  - The empty ring is a 2 px white outline. Its link has a 44 px hit area and the accessible name "Apply now". A visible "Apply now" split button sits beside the field's last row.
- **Facts.** Under the field, three cells in `--d2` with labels: 25+ years, 18 acres, 1.35 MW solar.
- **Motion.** When the panel's top reaches 70 %, a print head runs down the rows (30 ms per row, about 0.6 s in all), and dots appear as it passes. The empty ring then pulses once (scale 1 to 1.3 to 1, 0.6 s). No loop, and no counting numbers.
- **Mobile.** The same 25 × 20 grid scaled to 327 px (13 px pitch, 6 px dots). The "500+" still reads as a shape.
- **Reduced motion.** Printed state, no pulse.
- **Accessibility.** `role="img"`, `aria-label="Five hundred dots, one for each of our 500+ people"`.
- **Supporting device (from Aardvark's book page).** On mobile only, a riding "Apply now" split button sits bottom right. It drops away (y 12em, 0.8 s) when the form's top reaches 80 % of the viewport.

**Section sequence**

| # | Section | Purpose | Grid | Background |
|---|---|---|---|---|
| 1 | Hero | "A career with purpose. A company with impact.", note "Our team", intro, Apply now | H1 1-7, window 8-12 | blush |
| 2 | Join a team of visionaries | Both old paragraphs; the Business Standard National Best Employer Brand 2018 certificate and trophy as published proof | Copy 1-6, photos 9-12 (two 4:5 frames stacked on desktop, side by side on mobile) | white |
| 3 | The Headcount Print | H2 "Where you would work", the field, three facts | Full | ink panel |
| 4 | Apply now | The career form in four fieldsets: About you; Where you work today; Where you live; About yourself and resume. Two fields per row | Intro 1-4, form 5-12 | foil panel |
| 5 | Tear strip | Next: About | Full | wine |

**Images**

- Hero window: `/media/old/home/plant-production-hall-floor.webp`
- Proof: `/media/old/awards-recognitions/best-employer-brand-certificate.webp` and `/media/old/awards-recognitions/best-employer-brand-trophy.webp`
- Avoid every `/media/old/career/stock-*.webp`: they are stock photographs of other companies' people and plants.

**References**

- Aardvark, book page ([aardvarkbookclub.com/books/stations](https://www.aardvarkbookclub.com/books/stations)): the "scrolling CTA" that rides along and leaves when its target arrives (`initScrollingCta`, y 12em).
- Dribbble, "Company Career Pages Design" ([dribbble.com/shots/24233062](https://dribbble.com/shots/24233062)): culture first, then the way in. Only the title and summary could be read in this session (see 6.4).
- Anti-references: Sealed Air and UFlex push careers to separate portals, and Jindal Poly Films links two different careers URLs. Here the page itself is the application.

### 3.6 Products (index): "The Slitter"

Range family. Crimson-wash field. Next page: Laminates.

**Speciality: The Slitter.** One master reel of printed film is slit into six lanes, and each lane becomes one product. It is the honest picture of the range: one plant, one web, six products cut from it. Laminating stacks layers, so its inverse, slitting, is the index.

- **Desktop.**
  - The section opens on one continuous printed web spanning columns 1-12, about 60svh tall.
  - It is built as six adjacent lanes with no gap. Each lane carries the same crimson print repeat: the six product names set in `--d3` on foil.
  - As the section scrolls from its top at 80 % to its top at 20 % of the viewport (scrub, linear, no pin):
    - the column gap grows from 0 to the grid gap;
    - a small V-shaped knife glyph travels down each of the five cuts;
    - behind each knife, that lane's print layer clears top to bottom (mask position) to reveal the lane card.
- **Lane card** (two columns each):
  - the product's own field colour (crimson, foil, wine, blush, ink, crimson-deep), with text colour chosen for contrast;
  - a cover photo at 4:5;
  - the name in `--d3`;
  - the lead line;
  - "See laminates" (and so on) with the arrow block.

  The whole card is one link.
- **640 to 1023.** Two rows of three lanes, each row slitting as it enters.
- **Mobile.** The web is a tall block that slits horizontally into six stacked strips, with the knife running left to right across each cut. Each strip becomes a row card: cover in columns 1-2 (1:1), name, lead and link in 3-4.
- **Reduced motion.** The six lane cards, with no print layer.
- **Accessibility.** The lanes are a `<ul>` of links. The print layer and knives are `aria-hidden`.

**Section sequence**

| # | Section | Purpose | Grid | Background |
|---|---|---|---|---|
| 1 | Hero | "Innovative packaging solutions for every industry", intro, Get in touch and Packaging partnership; the spec strip holds the six product names as jump links | H1 1-8, photo 9-12 | crimson-wash |
| 2 | The Slitter | H2 "Product offerings", standfirst "Leading the future of flexible and sustainable packaging solutions" | Full | white |
| 3 | Solutions for your industry | The old line, shown once as the standfirst; the five industries as a typographic row in `--d3`, no icon tiles | H2 1-7, standfirst 8-12, row 5 equal cells | wine panel |
| 4 | Recycling maximised. Forests sustained. | The pledge, the line under it, link to Sustainability | Copy 1-6, photo 8-12 (4:3) | white |
| 5 | Tear strip | Next: Laminates | Full | crimson |

**Images**

- Hero: `/media/old/home/photo-printed-film-rolls-on-shafts.webp` (1220 × 1616 portrait, suits the tall photo column)
- Lane covers:
  - Laminates: `/media/old/home/photo-laminate-film-roller.webp`
  - Pouches: `/media/old/products-pouches/photo-pouch-range-autumn.webp`
  - Films: `/media/old/products-films/banner-film-slitting-rolls.webp`
  - Inks: `/media/old/products-inks/photo-ink-pots-printing-unit.webp`
  - Cylinders: `/media/old/products-cylinders/photo-cylinders-printed-film-close.webp`
  - Polybags: `/media/old/products-polybags/photo-polybag-film-roll.webp`
- Pledge: `/media/old/home/photo-eco-pouch-shopping-basket.webp`
- Replace the AI mockups in the current covers (`mockup-clear-zip-bag.webp`, `mockup-kraft-pouch-green.webp`).

**References**

- Aardvark, All books ([aardvarkbookclub.com/allbooks](https://www.aardvarkbookclub.com/allbooks)): every card carries its own colour, and its text turns black or white by luminance (`initCheckContrast`). Our lanes do the same with product colours.
- Porter Packaging, products index ([porterpackaging.com/packaging](https://porterpackaging.com/packaging)).
- Anti-references: Amcor ([amcor.com/products](https://www.amcor.com/products)) has market filters only, with cards that carry no specs, and the same product appears two or three times. UFlex has ten identical cards that each say "VIEW MORE".

### 3.7 Product pages: one template, six specialities

Range family. Each product page keeps one shared sequence, so the six read as a set, and gets its own centrepiece, so no two are alike. The template removes `Glance` (now the hero's spec strip), `RelatedProducts` (now the tear strip) and the separate `RecycleBand` and `CtaPanel` (now one closing panel).

**Shared sequence**

| # | Section | Purpose | Grid | Background |
|---|---|---|---|---|
| 1 | Hero (spec sheet) | Name in `--d0`, lead, Inquire now (to `/packaging-partnership/#begin` with the product requirement preselected) and All products; spec strip of the four `glance` facts | Name 1-9, photo 9-12 full bleed; strip 4 equal cells | product field |
| 2 | About the product | The old headline as H2, body copy | H2 and copy 1-6, photo 8-12 | white |
| 3 | Centrepiece | Per product, below | Full | panel (per product) |
| 4 | Second list | The product's other list, as numbered rows in two columns (number in `--d3` crimson, text in `--d4`), no icon tiles | 1-6 and 7-12 | white |
| 5 | Closing panel | Left: "Inquire now" in `--d2` with two split buttons. Right: "Recycling maximised. Forests sustained." with its line and a link | 1-6 / 8-12 | per product |
| 6 | Tear strip | The next product | Full | next product's field |

Where a product's centrepiece already carries its second list, section 4 is dropped. The table for each product below gives the actual backgrounds, so no neighbours repeat.

#### Laminates: "The Lay-up"

Crimson field. Next page: Pouches.

**Speciality: The Lay-up.** The ten laminate types from "Our offering" are drawn as ten physical layers of one laminate. Each band carries its matching solution line from "Our laminate solutions", so both lists become one object.

- **Bands.**
  - Ten full-width bands (columns 1-12), each at least 5.5 rem tall.
  - Fills cycle through crimson, white, wine, foil-2, crimson-deep, blush, ink, white, crimson-wash and foil-3, with text colour chosen per band for contrast.
  - Each band holds the offering name in `--d3` (columns 1-5) and the solution line (columns 7-12).
  - "Paper-based" and "Foil-based" share the old "Paper and foil based" line.
- **Motion.** Scrub, linear, no pin, from the section top at 60 % to its bottom at 80 %. The bands start exploded, 2 rem apart, and press together until the gaps reach 0. The stack's outer corners round off as one laminate.
  - At the end, a plate at the stack's left edge reads "Laminates production capacity: 4,000 MT/month".
  - Bands never shrink, so the text stays readable at every point.
- **Mobile.** The same vertical stack, with the name above the line in each band.
- **Reduced motion.** The laminated, closed state.

| # | Section | Background |
|---|---|---|
| 1 | Hero | crimson |
| 2 | About laminates | white |
| 3 | The Lay-up (offering and solutions) | foil panel |
| 5 | Closing panel | crimson-wash panel |
| 6 | Tear strip: Pouches | foil |

**Images**

- Hero: `/media/old/home/photo-laminate-film-roller.webp`
- About: `/media/old/home/plant-laminator-unwind-s575.webp`
- Do not use `photo-clear-film-roll-on-machine.webp`, which the earlier research flagged as stock or AI.

**References**

- BioForge ([dribbble.com/shots/26850448](https://dribbble.com/shots/26850448)): an object explained as stacked layers. We invert it: built, not exploded.
- Zeezoy ([dribbble.com/shots/22606413](https://dribbble.com/shots/22606413)): text set on the layers themselves.

#### Pouches: "The Format Morph"

Foil field. Next page: Films.

**Speciality: The Format Morph.** A technical die-line of the selected pouch format is drawn large in white on crimson. Choosing a format morphs the outline into the next one.

- **Selector.** Columns 1-5 hold H2 "Our offering" and a radio group of the seven formats:
  1. Shaped
  2. Liquid
  3. Centre seal
  4. Side seal
  5. Three side seal
  6. Stand-up
  7. High barrier

  The options are 56 px rows (radius sm), with arrow-key navigation and a live region.
- **Drawing.** Columns 6-12 hold a 600 × 700 SVG. It shows:
  - the outline;
  - seal zones as 45° white hatching at 30 %;
  - the tear notch;
  - the zip track on stand-up;
  - the spout on liquid;
  - the gusset fold on stand-up;
  - unnumbered W and H dimension arrows (no invented sizes);
  - the format name.

  "High barrier" shows the stand-up outline with an inner second outline for the barrier layer.
- **Motion.** On change, the outline morphs over 0.6 s (GSAP MorphSVGPlugin, power2.inOut) and the seal hatching crossfades. There is no auto-advance.
- **Mobile.** The formats sit in a 2-column button grid above a full-width 1:1 drawing. No horizontal scrolling.
- **Reduced motion.** Formats swap instantly.
- **Accessibility.** The drawing is `role="img"` and its label names the format.

| # | Section | Background |
|---|---|---|
| 1 | Hero | foil |
| 2 | About pouches | white |
| 3 | The Format Morph (offering) | crimson panel |
| 4 | "Our machines' capabilities include" (four rows) with the machine photo in 9-12 | white |
| 5 | Closing panel | crimson-wash panel |
| 6 | Tear strip: Films | wine |

**Images**

- Hero: `/media/old/products-pouches/photo-pouch-range-autumn.webp`
- About: `/media/old/products-pouches/banner-foil-pouches-red.webp` (shown 21:9)
- Machines: `/media/old/home/plant-super-perfast-machine.webp`

**References**

- KMBCH ([dribbble.com/shots/20585200](https://dribbble.com/shots/20585200)): one pack holds its place while the world around it changes. Here the drawing holds its place while the format changes.
- Mondi's per-product blocks show machine fit and recyclability (from the earlier audit in `aditya_flexipack_creative_direction_research.md`, section 5). That block structure is our model.

#### Films: "The Three Dies"

Wine field. Next page: Inks.

**Speciality: The Three Dies.** Three process windows show how each film line makes its film. They replace the `FilmIndex` jump tiles and act as the index to the three sections below.

- **Windows.** Columns 1-4, 5-8 and 9-12. Each is a white field (radius lg) at 4:5 with:
  - an SVG of its process;
  - the film name in `--d3`;
  - an arrow link to its section (`#cpp`, `#metallised`, `#blown`).
- **The three processes.**
  - CPP film: a flat die drops a curtain onto a static chill roll, and flat film runs off to the right.
  - Metallised film: a clear band passes through a chamber while a silver front sweeps along it. This reuses the `.metal-swatch` colours.
  - Blown film: a tube inflates upward from a ring die and closes flat at the top nip.
- **Motion.** Each window plays once (1.2 s) as it enters and holds its end frame. Hover or focus replays it, so the user starts it. No loops.
- **Mobile.** The windows stack full width at 16:10.
- **Reduced motion.** End frames only.
- **The three film sections below** keep all their copy.
  - Intro: columns 1-6, photo 8-12.
  - Offerings and features: two numbered columns.
  - "The film advantage": three straight cells in `--d4`.

| # | Section | Background |
|---|---|---|
| 1 | Hero | wine |
| 2 | About films | white |
| 3 | The Three Dies | foil panel |
| 4a | CPP film | white |
| 4b | Metallised film | crimson-wash panel |
| 4c | Blown film | white |
| 5 | Closing panel | foil panel |
| 6 | Tear strip: Inks | blush |

**Images**

- Hero: `/media/old/products-films/banner-film-slitting-rolls.webp`
- About: `/media/old/home/plant-production-hall-floor.webp`
- CPP: `/media/old/home/plant-laminator-unwind-s575.webp`, captioned as what it shows
- Metallised: `/media/old/products-films/banner-film-slitting-rolls.webp`
- Blown: `/media/old/gallery/plant-blown-film-tower-stairs.webp` and `/media/old/home/plant-blown-film-tower-close.webp`

**References**

- Zajno, Industrial Manufacturing Website ([dribbble.com/shots/27522234](https://dribbble.com/shots/27522234)): a heat-coloured wave rolling through a material macro. This is the model for the metallising front.
- Q Industrial, "Template page for Industries and Surfaces" ([awwwards.com/sites/q-industrial](https://www.awwwards.com/sites/q-industrial)): one index leading into parallel detail sections.

#### Inks: "The Drawdown Card"

Blush field. Next page: Cylinders.

**Speciality: The Drawdown Card.** Ink labs judge an ink by drawing it down a test card with a rod. The six offering statements are six drawdown stripes on one white card.

- **Card.**
  - A white card (radius sm) on the foil panel, spanning columns 1-12.
  - Six vertical stripes, two columns each, about 22 rem tall, in crimson, crimson-deep, wine, ink, crimson-light and blush.
  - Each stripe has an ink puddle (a rounded blob) at its top. Its statement is set in `--d4`, in white or ink by contrast, with crimson-light carrying ink text.
  - A foil-3 rod spans the card above the stripes.
- **Motion.** Scrub, linear, from the card's top at 70 % to its bottom at 60 % of the viewport. The rod travels down the card, and each stripe's ink is revealed down to the rod's position (clip height). The statements appear as the ink covers them.
- **Mobile.** Three rows of two stripes (2 of 4 columns each, 14 rem tall). The rod runs down each row in turn.
- **Reduced motion.** A fully drawn card.
- **Key features (section 4).** NTNK; gravure-optimised; compatible with all lamination processes, including solvent-free; superior bond strength. Set as four numbered rows under the card's pull, with the ink-pots photo in 9-12.

| # | Section | Background |
|---|---|---|
| 1 | Hero | blush |
| 2 | About inks | white |
| 3 | The Drawdown Card (offering) | foil panel |
| 4 | Key features | white |
| 5 | Closing panel | crimson-wash panel |
| 6 | Tear strip: Cylinders | ink |

**Images**

- Hero: `/media/old/products-inks/banner-yellow-ink-roller.webp`, cropped to the tall photo column
- About: `/media/old/home/photo-blue-ink-stirring.webp`
- Key features: `/media/old/products-inks/photo-ink-pots-printing-unit.webp`

**References**

- No web reference does this. The device comes from print-lab practice. Aardvark's `/books/stations` "At a glance" facets set the tone for short statements, one per object.

#### Cylinders: "The Engraving Pass"

Ink field. Next page: Polybags.

**Speciality: The Engraving Pass.** A chrome gravure cylinder lies across the panel. An engraving head travels along it, and the cells it cuts form the word "Cylinders" in halftone.

- **Cylinder.**
  - SVG at 4:1 across columns 1-12.
  - Chrome is drawn as flat foil, foil-2, foil-3 and white bands (plated cylinders are chrome, so no copper outside the palette). A journal sits at each end.
  - The cells are an SVG `<pattern>` of 6 px rhombs, masked by the word set in Cabinet Grotesk 800. That keeps the DOM light.
- **"Why our cylinders".** The four items sit under the cylinder in columns 1-3, 4-6, 7-9 and 10-12: micro-precision engraving, robust base construction, specialised coatings and geometry, and re-engraving processes.
- **Motion.** Scrub, linear, from the section top at 75 % to its bottom at 50 %.
  - A diamond-stylus glyph travels left to right over the cylinder.
  - The mask that reveals the cells widens with the head.
  - Each item under the cylinder goes from 40 % to full white as the head passes its column.
- **Mobile.** The cylinder stands vertical in columns 1-2, with the four items in 3-4. The head travels top to bottom.
- **Reduced motion.** Fully engraved, all items lit.

| # | Section | Background |
|---|---|---|
| 1 | Hero | ink |
| 2 | About cylinders | white |
| 3 | The Engraving Pass (why our cylinders) | wine panel |
| 4 | Our offering (four rows), engraver photo in 9-12 | white |
| 5 | Closing panel | foil panel |
| 6 | Tear strip: Polybags | crimson-deep |

**Images**

- Hero: `/media/old/home/plant-copper-cylinder-engraver.webp`
- About: `/media/old/products-cylinders/photo-cylinders-printed-film-close.webp`
- Offering: `/media/old/home/plant-copper-cylinder-engraver-wide.webp`
- Optional 21:9 band: `/media/old/products-cylinders/banner-gravure-cylinders.webp`

**References**

- QVELTY ([dribbble.com/shots/25507639](https://dribbble.com/shots/25507639)): the material quality bar for chrome.
- Zajno, Industrial Manufacturing Website ([dribbble.com/shots/27522234](https://dribbble.com/shots/27522234)): a machined part as the hero of a page.

#### Polybags: "Three Sides Sealed"

Crimson-deep field. Next page: Offerings.

**Speciality: Three Sides Sealed.** One large clear polybag is sealed on its three sides, one after another, as the page scrolls. It is the product's own claim, "3-side seal", performed. The eight offering lines are printed on the bag.

- **Bag.**
  - SVG at about 400 × 520 in columns 1-6: white film at 60 % with a foil-3 outline and an open top.
  - Its "print" is an HTML list of the eight offering lines in crimson, positioned inside the bag.
  - A Caveat note at the open top reads "up to 120 micron", from the copy.
- **Seals.** Three crimp bands (zig-zag serration, crimson-deep) on the left, bottom and right edges.
- **Industries catered to.** Columns 8-12 hold the eight industries as a two-column list.
- **Motion.** Scrub, linear, no pin, from the section top at 70 % to its bottom at 70 %.
  - First third: the left seal stamps top to bottom.
  - Second third: the bottom seal stamps left to right.
  - Last third: the right seal stamps bottom to top.
  - Each seal finishes with a 0.15 s press (scaleX 1.2 to 1).
- **Mobile.** The bag sits on top in columns 1-4, at most 280 px wide, with the industries list below.
- **Reduced motion.** Sealed.

| # | Section | Background |
|---|---|---|
| 1 | Hero | crimson-deep |
| 2 | About polybags | white |
| 3 | Three Sides Sealed (offering and industries) | foil panel |
| 5 | Closing panel | crimson-wash panel |
| 6 | Tear strip: Offerings | foil |

**Images**

- Hero: `/media/old/products-polybags/photo-polybag-film-roll.webp`, replacing the AI zip-bag mockup
- About: `/media/old/products-polybags/banner-film-rolls-blue-tint.webp`
- Optional: `/media/old/home/photo-stretch-film-wrapping.webp` for secondary packaging

**References**

- Aardvark, Merch ([aardvarkbookclub.com/merch](https://www.aardvarkbookclub.com/merch)): a whole page built round one object, with its features gathered beside it.
- Yucca Packaging, Food Processing ([yucca.co.za/food-processing](https://yucca.co.za/food-processing/), Awwwards SOTD [awwwards.com/sites/yucca-packaging](https://www.awwwards.com/sites/yucca-packaging)): a packaging maker's product page that leads with the pack and lists segments beside it.

### 3.8 Offerings: "The Laddi"

Range family. Foil field. Next page: Products.

**Speciality: The Laddi.** Laddi packs, strips of joined sachets hung in kirana shops, are on the old Offerings list itself. They are a format no global packaging site shows. The thirteen offering lines hang as sachets in three laddi strips from a rail.

- **Rail and strips.**
  - A wine rail (radius sm, 1.25 rem) spans columns 1-12.
  - Strip A (columns 1-4, five sachets): Biscuits and snacks, Kitchen essentials, Confectionery, Cereals and oats, Frozen food.
  - Strip B (columns 5-8, four sachets): Home care, Personal care, Pet food and meat packaging, Liquid pouching.
  - Strip C (columns 9-12, four sachets): Shrink film and collation packs, Laddi packs, Aluminium-based foil wrappers and liners, Polybags.
- **Sachets.** Each is a white die-cut sachet about 9 rem tall, with crimped top and bottom bands and a side tear notch. Sachets share their crimp band with the next one. Each holds a `Pack` silhouette (40 px), the name in `--d4` (ink) and its items in small text.
- **Motion.** When the section's top reaches 75 %, each strip unrolls downward: sachets drop from behind the rail one by one (y -100 % to 0, 0.45 s, a 4 px settle, 0.08 s apart), with the strips offset by 0.12 s. Hover or focus tugs a sachet 4 px down and stretches the crimp under it. No rotation.
- **Mobile.** One strip of all thirteen sachets, full width, about 6.5 rem each.
- **Reduced motion.** The strips hang in full.
- **Accessibility.** An `<ol>` of thirteen items. The rail and crimps are `aria-hidden`.

**Section sequence**

| # | Section | Purpose | Grid | Background |
|---|---|---|---|---|
| 1 | Hero | "Packaging that works as hard as the recipe", the snacks paragraph, Explore products and Partner with us; spec strip of the four phrases from that paragraph (high-barrier, superior sealing, freshness-lock, shelf-ready); the photo as a 21:9 band | H1 1-8 | foil |
| 2 | From our plant to your aisle | The home and personal care paragraph beside the snacks line | Half L / Half R | white |
| 3 | The Laddi | H2 "Packaging, from our plant to yours" | Full | crimson panel |
| 4 | Closing | Explore products and Packaging partnership split buttons | H2 1-7, buttons 8-12 | white |
| 5 | Tear strip | Next: Products | Full | crimson-wash |

**Images**

- Hero band: `/media/old/home/mockup-pouches-supermarket-shelf.webp`. It is a rendered mockup and a sibling of the flagged Frame-33, so swap it for a real shelf photograph when one arrives. Until then, `/media/old/products-pouches/banner-foil-pouches-red.webp` is the safe fallback.
- The sachets use the `Pack` silhouettes, not photos.

**References**

- Aardvark, Gifting ([aardvarkbookclub.com/gifting](https://www.aardvarkbookclub.com/gifting)): the subscription "boxes" are die-cut with the aardvark's ears instead of plain rectangles. Here the product unit is given its real shape.
- The earlier research (`aditya_flexipack_creative_direction_research.md`, station 05) names laddi packs as the format no global site shows.
- `Aisles.tsx` and `PackIndex.tsx` retire from this page. The homepage `IndustryList` already gives the aisle-by-aisle switch.

### 3.9 Packaging partnership: "The Job Ticket"

Partner family. Ink field. Next page: Vendor partnership.

**Speciality: The Job Ticket.** Every job in a print plant travels on a ticket. As the brand fills the form, a printed job ticket beside it fills in live. The four partnership steps are printed on the ticket as its route, so the process is not a separate set of cards and does not echo the homepage's fanned steps.

- **Form (columns 1-7).**
  - Name, contact email, brand or company name, industry, phone, city, country, brief.
  - "Product requirement" is a radio group of eight 56 px tiles in 2 × 4, each with a `Pack` silhouette and its label: Single layer, Laminate, Laddi pack / polybag, CPP films, PE film, Inks, Cylinders, Pouches. The field is still required, and still submits the same value as today's select.
- **Ticket (columns 9-12).** It sticks while the form is in view; it is a preview, not a heading.
  - A white card (radius sm) with a punched hole at the top and a tear-off stub at the bottom, cut by a zig-zag perforation.
  - It mirrors the form as you type:
    - brand or company name in `--d3`;
    - product requirement in `--d2` crimson;
    - industry;
    - city and country;
    - the first 120 characters of the brief.
  - Its route lists the four steps with their old titles and bodies. Step 1 is drawn as an outline box.
- **Submit.**
  - On real success, step 1's box fills crimson and the stub tears away along the perforation: it separates and drops 24 px, straight. The stub then shows the existing success message.
  - While mail delivery is not live, the stub shows the existing not-live message instead. It never fakes success.
- **Mobile.** A compact ticket header above the form shows company and product requirement. The full ticket appears after submitting.
- **Reduced motion.** The states swap with no tear.

**Section sequence**

| # | Section | Purpose | Grid | Background |
|---|---|---|---|---|
| 1 | Hero (short) | "Packaging partnership", note "Ready to innovate? Partner with the leaders.", intro, Begin your partnership; a blank ticket stub peeks from the hero's bottom edge in 9-12 | H1 1-7 | ink |
| 2 | Why partner with Aditya Flexipack? | The six reasons as a 3 × 2 numbered grid: number in `--d3` crimson, title in `--d4`, body; text only | 1-4 / 5-8 / 9-12 | white |
| 3 | The Job Ticket | H2 "Begin your partnership", the who-can-apply paragraph as standfirst, form and ticket | Form 1-7, ticket 9-12 | foil panel |
| 4 | Tear strip | Next: Vendor partnership | Full | wine |

**Images:** none by design. The ticket is the image. This also stops the page leaning on the AI pouch mockups it uses today.

**References**

- Terminal Industries ([terminal-industries.com](https://terminal-industries.com/), Awwwards SOTD and Site of the Month [awwwards.com/sites/terminal-industries](https://www.awwwards.com/sites/terminal-industries)): a B2B form with typed request options, and a calculator whose result redraws as inputs change. We take the "your inputs, reflected back" loop.
- CU Mehrweg ([dribbble.com/shots/27752816](https://dribbble.com/shots/27752816)): the form set beside a strong object instead of alone on a panel.
- Yucca Packaging, Food Processing ([yucca.co.za/food-processing](https://yucca.co.za/food-processing/)): a packaging maker that prints its process steps next to the conversion point.

### 3.10 Vendor partnership: "The Stores Rack"

Partner family. Wine field. Next page: Contact.

**Speciality: The Stores Rack.** Twelve labelled stores bins, one for each product the plant sources. A supplier finds their bin and picks it, and the form arrives with "Product you supply" already chosen.

- **Bins.** A 4 × 3 grid, each bin three columns wide.
  - Each bin's front face is an SVG: a foil-2 body, a foil-3 lip, rounded lower corners, and a white label holder.
  - The product name sits in the holder in `--d4`: Bearings and belts, Tapes, Cartons, Films, Machinery parts, Lubricants, Machinery, Chemicals, Electrical parts, Cores, Pigments and masterbatches, Granules.
  - Bins stand on the grid gap. No shelf bars are drawn.
- **Interaction.** Each bin is a `<button aria-pressed>`. Activating it:
  - sets the vendor form's product field;
  - turns its label holder crimson with white text;
  - announces "Films selected in the form" (and so on) in a live region;
  - scrolls the form into view with Lenis (offset by the header height) and focuses the field.
- **Motion.** As the rack enters, rows slide in from the right one row at a time (x 40 px to 0, 0.5 s, rows 0.12 s apart), like stock being racked. Hover or focus lifts the label card 4 px in its holder.
- **Mobile.** A 2 × 6 grid, same behaviour.
- **Reduced motion.** Static rack.

**Section sequence**

| # | Section | Purpose | Grid | Background |
|---|---|---|---|---|
| 1 | Hero (short) | "Partner with a leader. Join a trusted supply chain.", note "Vendor partnership", Fill the form; one bin label teaser in 9-12 | H1 1-7 | wine |
| 2 | Why partner with Aditya Flexipack? | The six vendor reasons as a 2 × 3 numbered list, text only | 1-6 / 7-12 | white |
| 3 | Join our trusted network | The who-can-apply paragraph; raw materials, machinery and equipment, logistics and distribution, each with a straight 4:3 photo | 1-4 / 5-8 / 9-12 | crimson-wash panel |
| 4 | The Stores Rack | H2 "Products we source" and the twelve bins | Full | white |
| 5 | Our vendor application process | Four steps as a numbered route, numbers in `--d1`, white on crimson | 4 equal cells | crimson panel |
| 6 | Fill the form | "Register as a vendor", the vendor form with the catalogue upload | Intro 1-4, form 5-12 | foil panel |
| 7 | Tear strip | Next: Contact | Full | crimson |

**Images**

- Supply streams: `/media/old/products-polybags/photo-polybag-film-roll.webp`, `/media/old/home/plant-grey-enclosed-machine.webp`, `/media/old/home/photo-stretch-film-wrapping.webp`
- Do not use `banner-robot-line-faded.webp` (faded banner with a baked-in notch) or `photo-clear-film-roll-on-machine.webp` (flagged as stock).

**References**

- Aardvark, FAQ ([aardvarkbookclub.com/faq](https://www.aardvarkbookclub.com/faq)): category tiles that move you straight to the right place (`initFaqSidebar` with Lenis `scrollTo`). Our bins move you straight to a pre-filled field. The sticky sidebar is not taken.
- Q Industrial, Industries ([q-industrial.com/en-de/industries](https://www.q-industrial.com/en-de/industries)): an ordered grid where every tile is one clear action.

### 3.11 Contact: "The Kilometre Stone"

Partner family. Crimson field. Next page: Packaging partnership.

**Speciality: The Kilometre Stone.** An Indian highway milestone stands in the hero. Its cap reads "NH 2", and its face reads "KANPUR" over "15 km". It is the published location ("15 km from Kanpur", "along the Kolkata to Delhi highway (NH-2)") as a local, physical sign.

- **Stone.**
  - SVG at about 320 × 420 in columns 9-11.
  - A white body with a wine cap, standing on a white verge band that runs full bleed along the hero's bottom (12 % of its height).
  - Cap text in white `--d3`. "KANPUR" in ink `--d3`, and "15 km" in crimson `--d2`.
  - A Caveat note on the verge reads "on the Kolkata to Delhi highway", from the About copy.
- **Motion.** After the H1 lines settle, the stone rises from behind the verge (y 100 % to 0, 0.7 s, expo-out) and stays put. No bob, no parallax.
- **Mobile.** The stone sits under the actions, in columns 1-2 (about 160 px wide), on the same verge.
- **Reduced motion.** Static.
- **Accessibility.** `role="img"`, `aria-label="Highway milestone: NH 2, Kanpur 15 km"`. The same facts are in text in section 2.
- **Check with the client.** NH-2 has since been renumbered NH-19. Keep "NH-2" as published unless they change it.

**Section sequence**

| # | Section | Purpose | Grid | Background |
|---|---|---|---|---|
| 1 | Hero (short) with the stone | "Get in touch", note "Let's connect and collaborate", intro, Fill the form, Call | H1 1-7, stone 9-11 | crimson |
| 2 | Contact us | Plant and registered office (Half L) and city office (Half R), each in `--d3` with its address and 48 px actions (Open in Google Maps, Copy address, Call, Email). A line under them gives the NH-2 and 15 km directions. Facebook and LinkedIn as 48 px square buttons | Half L / Half R | white |
| 3 | Fill the form | "You can reach us anytime", the contact form, and the link to the partnership form | Intro 1-4, form 5-12 | foil panel |
| 4 | Tear strip | Next: Packaging partnership | Full | ink |

**Images**

- Plant address: `/media/old/home/plant-exterior-building.webp` as a 1:1 photo in columns 11-12 beside the address on desktop, and under it on mobile.
- Do not use `banner-handshake-factory-faded.webp`.

**References**

- Aardvark, inner heroes on `/faq` and `/gifting` ([aardvarkbookclub.com/faq](https://www.aardvarkbookclub.com/faq)): each short hero hides a small page-specific mark (`hero-xs__easter-egg`). Our stone is that mark, made local.
- Dribbble's contact-and-map pattern survey ([dribbble.com/search/contact-us-map](https://dribbble.com/search/contact-us-map)): almost all pair a map embed with a form. We avoid the embed, which is heavy and has its own consent problems, and link to Google Maps instead.

### 3.12 Privacy policy: "The Privacy Information Panel"

Document family. Foil field. Next page: Terms.

**Speciality: the Privacy Information Panel.** Styled like the nutrition information panel on an FMCG pack, it gives the policy's key facts in one box.

- **Box.** A white box (radius sm) in columns 1-7 on the crimson-wash panel, titled in `--d3`. Rows alternate foil and white fills, never rules. Labels take 40 % of each row and values 60 %.
- **Rows.** Each condenses an existing clause:
  - Personal details collected: name, email, phone, company details, when you contact us or submit a form (clause 2).
  - Usage data: IP address, browser type, pages visited (2).
  - Used to: improve services, respond to inquiries, send updates, prevent fraud (3).
  - Sold or rented: never. This row is in crimson `--d3`, from clause 6, "We do not sell or rent your personal data".
  - Shared with: trusted service providers, for business operations, legal compliance or security (6).
  - Cookies: used; you can control or disable them in your browser (5).
  - Your rights: access, correction, deletion, opting out, restriction (7).
- **Clause index.** Columns 9-12 hold the nine clauses as numbered jump links, 44 px rows. It is not sticky.
- **Clauses (white section).** Clause numbers in `--d3` crimson in columns 1-2, headings and text in 3-9 at the 42 rem measure.
- **Motion.** None beyond the standard reveal. Legal pages stay calm.
- **Mobile.** The box goes full width, with each label above its value. The index sits under the box.

| # | Section | Background |
|---|---|---|
| 1 | Hero (document): "Privacy policy", note "We do not sell or rent your personal data" | foil |
| 2 | Privacy Information Panel and clause index | crimson-wash panel |
| 3 | Clauses 1-9 | white |
| 4 | Tear strip: Terms | crimson-wash |

**Images:** none.

**References**

- Aardvark, FAQ ([aardvarkbookclub.com/faq](https://www.aardvarkbookclub.com/faq)): long reference content made scannable by an index first.
- The FMCG nutrition panel itself, the most familiar "facts box" this audience reads every day.

### 3.13 Terms and conditions: "The Declaration Panel"

Document family. Crimson-wash field. Next page: Privacy.

**Speciality: the Declaration Panel.** Styled like the declaration block on the back of a pack (the lines that state who made it and where it is governed), it sums up the terms.

- **Box.** A white box with a crimped top band in columns 1-7 on the foil panel. Labels are set run-in, bold in `--d4`.
- **Rows.** Each condenses an existing clause:
  - Operated by: Aditya Flexipack (clause 1).
  - Content: text, images, logos and trademarks are the property of Aditya Flexipack (3).
  - Specifications and prices: subject to change without notice (4).
  - Liability: not liable for damages arising from use of the website or services (5).
  - Governing law: the laws of India (10).
  - Contact: phone, city office and email (11).
- **Clause index.** Columns 9-12 hold the eleven clauses as numbered jump links.
- **Clauses (white section).** The same layout as Privacy.
- **Copy note.** Clause 11 says "For any privacy-related concerns". It stays as published; flag it to the client.

| # | Section | Background |
|---|---|---|
| 1 | Hero (document): "Terms and conditions", note "Governed by the laws of India" | crimson-wash |
| 2 | Declaration Panel and clause index | foil panel |
| 3 | Clauses 1-11 | white |
| 4 | Tear strip: Privacy | foil |

**Images:** none.

**References:** as Privacy. The pair shares a layout and differs in its panel, so the legal pages read as one family.

---

## 4. Cross-page devices

These tie the pages together without making them identical.

### 4.1 Four hero families

All four keep the full-bleed field, the left line and the bottom-left H1. They differ in height, object and motion, so a visitor can tell which part of the site they are in.

| Family | Pages | Height (desktop) | Object | Entrance |
|---|---|---|---|---|
| Company: die-cut window | About, Sustainability, Awards, Gallery, Career | min(78svh, 46rem) | One real photo seen through a pack-shaped window in 8-12, its die-line drawn round it | Die-line strokes draw (0.9 s), photo settles from 1.04 to 1 inside, H1 lines rise (line by line, 0.08 s apart) |
| Range: spec sheet | Products, six product pages, Offerings | min(84svh, 50rem) | Name in `--d0`; photo as a full-height column in 9-12, bleeding off the top and right edges (clipped by the hero radius, no frame, no tilt); spec strip of four facts along the bottom | Name snaps into register: two offset solid copies (crimson-light and the field's dark tone, 6 px apart, `aria-hidden`) slide onto the final type in 0.5 s, back-ease |
| Partner: short desk | Packaging partnership, Vendor partnership, Contact | min(60svh, 36rem) | A teaser of the page's centrepiece in 9-12: ticket stub, bin label, kilometre stone | Lines rise; the teaser enters last |
| Document: plain sheet | Privacy, Terms | about 40svh | None | Lines rise only |

- **Company windows.** Each page has its own `Pack` silhouette: About stand-up, Sustainability gusset, Awards pillow, Gallery sachet, Career spout.
  - The window is a static SVG `clipPath`. It is not a portal and does not expand.
  - The field's tonal contour is that silhouette's offcut, scaled 3× and bleeding off the hero. It replaces the shared three paths.
  - Mobile: the window sits under the H1 in columns 1-4 (4:5, at most 60svh).
- **Range spec strip.** Four equal cells across 1-12 (2 × 2 on mobile) on a slightly deeper tone of the field (crimson-deep on crimson, foil-2 on foil). Each cell has a value in `--d3` and its label. The values are the `glance` facts already drawn from each product's copy.
- **Hero photos.** No hero uses tilted photo cards. That stays the homepage's signature.
- **Everywhere.** The existing word-by-word H1 pop is retired in favour of line reveals. Reduced motion shows the final hero.

### 4.2 The tear strip: a next-page panel on every page

This replaces `CtaPanel` and `RelatedProducts` as the shared ending.

- **What it is.** A full-width panel in the next page's field colour, clamp(18rem, 45vh, 28rem) tall. Its top edge is cut by a zig-zag perforation (12 px teeth, a CSS mask) like a pack's tear strip.
- **Content.**
  - The next page's name as an H2 in `--d1`, on the left line.
  - That page's nav note under it, from `src/content/site.ts` (for example "Solar, water, recycling, pyrolysis").
  - The split button's arrow block on the right.
  - A Caveat note "next page" beside the name, never above it, plus a visually hidden "Next page:" prefix for screen readers.
- **Behaviour.** The whole panel is one link.
  - Hover or focus lifts it 6 px and widens the perforation gap, as if the strip is being pulled.
  - On scroll entry the teeth draw in once.
  - Reduced motion: static.
- **Colour hand-off.** The route curtain (`RouteCurtain.tsx`) takes the destination's field colour instead of always wine. Clicking a crimson tear strip brings down a crimson curtain that lifts off a crimson hero.
- **The sequence**, so colours never repeat between neighbours:

  | Loop | Order |
  |---|---|
  | Company | About (wine) → Sustainability (foil) → Awards (crimson) → Gallery (ink) → Career (blush) → About |
  | Range | Products (crimson-wash) → Laminates (crimson) → Pouches (foil) → Films (wine) → Inks (blush) → Cylinders (ink) → Polybags (crimson-deep) → Offerings (foil) → Products |
  | Partner | Packaging partnership (ink) → Vendor partnership (wine) → Contact (crimson) → Packaging partnership |
  | Document | Privacy (foil) ↔ Terms (crimson-wash) |

- **Enquiry routes stay.** Product pages keep Inquire now in the hero and in the closing panel. Company pages carry their own actions in context: About's hero, Sustainability's closing line, Awards' "Our story". The generic "Have a pack in mind?" panel is no longer needed.

### 4.3 Shared system pieces (build once)

- `SectionHeader`: H2 in Lead, standfirst in Side, bottom-aligned. One component replaces about 20 hand-built headers.
- `NumberedList`: number in `--d3` crimson, title in `--d4`, optional body. One or two columns. It replaces icon-tile grids (ReasonGrid, Glance, ExtraPanel, OfferingList, PackIndex, IndustryTiles) wherever the content is a list.
- `ClosingPanel` (product pages) and `TearStrip` (all pages).
- `PhotoFrame`: white 8 px frame, ratio from the allowed set, caption under the frame, never rotated. It replaces the ad-hoc frames in about 15 components.
- The `Pack` silhouettes become the site's only pictograms.
- Caveat notes are budgeted at two per page, at -2°, always beside an object or the H1's last line, never under an H2.

### 4.4 Components to retire or rework

| Component | Fate |
|---|---|
| PageHero | Split into the four hero families |
| CtaPanel, RelatedProducts, RecycleBand | Become TearStrip and ClosingPanel |
| FactCards | Become the type-only identity strip (About) and fact cells (Career) |
| Capabilities | Become Under One Roof |
| Initiatives | Becomes the Mimic Panel |
| AwardWall | Becomes the Honours Board and contact sheets |
| GalleryWall | Becomes the Imposition Sheet |
| PlantStrip | Removed; its photos move into Under One Roof and the Gallery |
| ReasonTags | Becomes a typeset list |
| ClosingLines | Becomes three straight lines |
| Aisles, PackIndex | Removed from Offerings; replaced by the Laddi |
| Glance | Becomes the hero spec strip |
| OfferingList, SolutionCards, ExtraPanel, FilmIndex | Replaced by each product's centrepiece and NumberedList |
| IndustryTiles | Becomes a typographic row |
| ReasonGrid, PartnerSteps | Become NumberedList and the Job Ticket route |
| FormSection | Becomes a plain section with a 1-4 / 5-12 split |

---

## 5. Priority order

Order by visible impact for the client, then by dependency.

1. **The system and the shared ending.** Tokens (five display steps, two spacing tokens, the measure), the panel alignment fix (2.3), the no-rotation rule, `SectionHeader`, `NumberedList`, `PhotoFrame` and `TearStrip`. This alone answers "unordered" on every page at once.
2. **The four hero families.** They answer "similar" before a visitor scrolls.
3. **Products index (The Slitter) and the product template.** These are the buyer's main path, and the template carries six pages.
4. **The six product centrepieces**, in this order:
   1. Laminates (Lay-up), the capacity claim
   2. Pouches (Format Morph)
   3. Films (Three Dies), the Bobst metalliser story
   4. Cylinders (Engraving Pass)
   5. Inks (Drawdown Card)
   6. Polybags (Three Sides Sealed)
5. **Packaging partnership (The Job Ticket).** The conversion page, and today the most visibly duplicated one.
6. **About (Under One Roof).** The second most visited inner page; it carries the integration story.
7. **Contact (The Kilometre Stone).** Small to build, and fixes a thin page.
8. **Awards (The Honours Board).** Proof that buyers check.
9. **Offerings (The Laddi).**
10. **Sustainability (The Mimic Panel).**
11. **Vendor partnership (The Stores Rack).**
12. **Career (The Headcount Print).**
13. **Gallery (The Imposition Sheet).**
14. **Privacy and Terms (the information panels).**

Technical notes for the build:

- Everything above is inline SVG, CSS and GSAP 3.15. The installed package already ships `Flip`, `MorphSVGPlugin` and `SplitText`. No new heavy assets.
- No inner page pins. Every scrub is linear and has a static end state in the HTML.
- Read `node_modules/next/dist/docs/` before building, per `AGENTS.md`.

---

## 6. Research notes

### 6.1 aardvarkbookclub.com inner pages

Read from the live HTML and its custom script (`slater.app/18601/54937.js`).

Shared system:

- **Short hero (`hero-xs`).** Each page gets its own pale tint (pale pink Gifting, pale blue FAQ, pale periwinkle All books, soft orange on a book) and its own small hidden mark (`hero-xs__easter-egg is--gifting`, `is--book` and so on).
- **Background contours that breathe.** The stroke width eases between 0 and 60 while in view (`initBackgroundAnimation`), and they stop when off screen.
- **Other shared pieces.** Split buttons (`button-alt`), a peeking "Want to join the Club?" pop-up that opens on hover or click (`initPopUp`), and Barba transitions with a logo.

| Page | Its own centrepiece | What we take |
|---|---|---|
| [/gifting](https://www.aardvarkbookclub.com/gifting) | Subscription boxes die-cut with aardvark ears, with USA and Canada tabs; a heading set on a curve ("A gift outside of the box", `initTaglineCurve`); a gift-box image sequence with handwriting (`box-sequence`) | Give the product unit its real shape (the Laddi) |
| [/allbooks](https://www.aardvarkbookclub.com/allbooks) | Books grouped by month in twelve sliders; about 22 emoji genre filters plus MiniSearch; each card in its book's own colour with black or white text by luminance (`initCheckContrast`) | Per-item colour with computed contrast (the Slitter); filter with a real empty state (the Gallery) |
| [/faq](https://www.aardvarkbookclub.com/faq) | Seven colour-coded categories with emoji; a sidebar that tracks the section in view and scrolls with Lenis (`initFaqSidebar`); 44 accordions | Index first, then content (legal pages); tile that jumps to the right place (the Stores Rack). Not the sticky sidebar |
| [/merch](https://www.aardvarkbookclub.com/merch) | One product (the anniversary tote) with four feature blocks round it | One object owns the page (Polybags) |
| [/books/stations](https://www.aardvarkbookclub.com/books/stations) | Hero field in the book's own colour (for example #71002e); "At a glance" facets; three press quotes as "call-out" cards that rise with elastic ease and fan aside under the pointer (`initCallout`); a riding "Add to box!" that leaves at a trigger (`initScrollingCta`) | Product colour as the hero field (range heroes); the riding CTA (Career). Not the angled cards, which are the habit we are removing |

The lesson: Aardvark keeps one system (type, buttons, tints, contours) and gives each page one object that only it has. Its inner heroes are short, so that object arrives early.

### 6.2 Awwwards and industrial references

- **Q Industrial**, SOTD 2 Jun 2024, palette #CA0000 and #E6E6E6, the closest palette match found ([awwwards.com/sites/q-industrial](https://www.awwwards.com/sites/q-industrial), [q-industrial.com/en-de/about](https://www.q-industrial.com/en-de/about), [q-industrial.com/en-de/industries](https://www.q-industrial.com/en-de/industries)):
  - an About page with a heritage timeline and clickable year cards;
  - numbered values;
  - a zero-padded, numbered industries index;
  - a catalogue.
- **Yucca Packaging**, SOTD 31 Jan 2026, a packaging maker ([awwwards.com/sites/yucca-packaging](https://www.awwwards.com/sites/yucca-packaging), [yucca.co.za/food-processing](https://yucca.co.za/food-processing/)):
  - service landing pages with their own scroll behaviour;
  - a 5-step process;
  - a certifications wall;
  - a short FAQ.
- **Terminal Industries**, SOTD and Site of the Month Sep 2025 ([awwwards.com/sites/terminal-industries](https://www.awwwards.com/sites/terminal-industries), [terminal-industries.com](https://terminal-industries.com/)):
  - a working efficiency calculator;
  - path cards by operation size;
  - a lead form with typed requests;
  - a tabbed FAQ.
- **Porter Packaging**, Honorable Mention 2022 ([awwwards.com/sites/porter-packaging-1](https://www.awwwards.com/sites/porter-packaging-1)): a products index and a case-study gallery as first-class pages.
- **The Awwwards "packaging" listing** ([awwwards.com/websites/packaging](https://www.awwwards.com/websites/packaging/)) holds only one converter-type SOTD (Yucca). The category is still wide open.

### 6.3 Competitors' inner pages

| Company | What the inner pages do | Where they are weak |
|---|---|---|
| UFlex ([uflexltd.com](https://www.uflexltd.com/)) | Deep About tree (profile, values, board, milestones), Hall of fame, Careers tree | 11-slide banner carousel; ten identical business cards with "VIEW MORE", three pointing to the same page; sustainability is one image tile; `javascript:;` links; typos |
| Cosmo First ([cosmofirst.com](https://www.cosmofirst.com/)) | Audience-led navigation (investors, media, careers), heritage page, testimonials | Business content split across several domains; long text blocks; ESG as messaging without figures; © 2022 |
| Huhtamaki India ([huhtamaki.com/en-in/flexible-packaging](https://www.huhtamaki.com/en-in/flexible-packaging/)) | Clear calls to action, named market segments | "Find your product" is a paragraph and a link; sustainability delegated to the global site; news mostly from 2022 |
| Jindal Poly Films ([jindalpoly.com](https://www.jindalpoly.com/)) | About, quality, sustainability, careers pages | About 40 uncaptioned product thumbnails with alt "..."; placeholder "BRC (long form to explore)"; one image reused for three topics; customer portal on a bare IP over HTTP |
| TCPL ([tcpl.in](https://www.tcpl.in/)) | Products, infrastructure and sustainability in the navigation | Grey placeholder images throughout; an empty "inside look at our process" section; claims with no data |
| Amcor ([amcor.com/products](https://www.amcor.com/products)) | Market filters, concise product lines, keyword search | No format or material filters; cards without specs; products repeated; mixed CTA wording |
| Constantia Flexibles ([cflex.com](https://www.cflex.com/)) | Clear taxonomy; "PPWR ready." style sustainability teasers | Products and careers handed off to subdomains; most images lack alt text |
| Mondi | Per-product blocks with recyclability and machine fit (from the earlier audit) | The product URL tried this session returned 404, so this is not re-verified |
| Sealed Air | Careers on a separate jobs portal (search results) | Site returned 403 to this session, so this is not re-verified |

The gap this plan uses: every competitor builds inner pages from the same card grid and banner. None gives a page an object of its own, and none publishes proof as cleanly as Aditya can (tallied honours, a real plant, a stated location).

### 6.4 Dribbble and Behance

Dribbble search and shot pages and the Behance gallery page could not be read in this session. Dribbble returned empty pages to the fetch tool, and Behance returned 403. A shell workaround was blocked as bot-check circumvention, and was not pursued further.

What this document cites from Dribbble therefore comes from two sources:

- **The earlier frame-by-frame study** in `aditya_flexipack_creative_direction_research.md`, section 4:
  - CU Mehrweg 27752816
  - KMBCH 20585200
  - Zajno 27522234, 21968292, 27143593
  - BioForge 26850448
  - Zeezoy 22606413
  - QVELTY 25507639
- **Shot titles and summaries returned by search:**
  - Company Career Pages Design 24233062
  - Orix Creative "Packaging website" 23327490, a category anti-pattern
  - the `manufacturing-website` and `industrial-website` tags

Two leads were found but not seen: Behance "Colimatic, packaging equipment manufacturer website" ([behance.net/gallery/130432861](https://www.behance.net/gallery/130432861/Colimatic-packaging-equipment-manufacturer-website)) and Dribbble "SuperPrecision industrial website". Worth a manual look; neither shaped a decision here.

---

## 7. Open items for the client

- **New UI labels this plan introduces** (no claims):
  - "next page" on the tear strip;
  - the four Career fieldset legends;
  - the privacy and terms panel titles and row labels (they condense existing clauses);
  - "See it" on the Honours Board;
  - the milestone text "NH 2 / KANPUR / 15 km";
  - "Rania, Kanpur Dehat" on the mimic panel's centre node, taken from the address.
- **Confirm:**
  - whether `plant-super-perfast-machine` is a pouching line, and whether `plant-grey-enclosed-machine` is the metalliser (captions stay literal until then);
  - NH-2 versus NH-19;
  - the spelling "Aditya Tondon";
  - the outdated ISO 22000:2005 badge.
- **Assets:**
  - full-resolution plant photographs, since the 648 px set limits every photo to four columns;
  - one real shelf or kirana photograph to replace the rendered mockups;
  - one real team photograph for Career, if they have one.
