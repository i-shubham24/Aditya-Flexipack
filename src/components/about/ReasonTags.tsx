/**
 * "Why us" from the old About page, set as swing tags: each reason hangs at its own angle and squares up
 * when you point at it. The punched hole takes the panel colour so the tag reads as cut card.
 */
const TAGS = [
  { t: "Benchmarked quality", c: "bg-crimson text-white", r: "-rotate-[4deg]", x: "lg:ml-[4%]" },
  { t: "Rapid turnaround time", c: "bg-white text-crimson", r: "rotate-[3deg]", x: "lg:ml-[22%]" },
  { t: "Heavily backward integrated", c: "bg-wine text-white", r: "-rotate-[2deg]", x: "lg:ml-0" },
  { t: "Customer satisfaction", c: "bg-ink text-white", r: "rotate-[4deg]", x: "lg:ml-[30%]" },
  { t: "Ethical practices", c: "bg-blush text-wine", r: "-rotate-[3deg]", x: "lg:ml-[10%]" },
];

export function ReasonTags() {
  return (
    <section aria-labelledby="why-title" className="pt-[var(--frame)]">
      <div className="panel bg-crimson-wash py-[var(--section-y)]">
        <svg aria-hidden viewBox="0 0 1200 800" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path d="M0 250 C 200 160, 380 360, 620 280 S 980 110, 1200 210 V800 H0 Z" fill="#ffd9d3" />
        </svg>
        <div className="shell relative grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <h2 id="why-title" className="display text-[clamp(3rem,7vw,7.4rem)] text-wine">
              Why us
            </h2>
            <p className="hand mt-2 -rotate-2 text-[2rem] text-crimson">Family owned, professionally run</p>
            <p className="mt-6 max-w-[34rem] text-[1.1rem] leading-relaxed text-ink">
              As a family-owned and managed company, we combine experience with professionalism to deliver lasting value. Our stable
              leadership, transparent communication and deep commitment to customers enable swift decision making and enduring
              partnerships, while our aligned vision has driven over 25 years of sustained growth. Guided by perseverance, we embrace
              challenges as opportunities for continued excellence.
            </p>
          </div>
          <ul className="flex flex-col gap-4 lg:col-span-7">
            {TAGS.map(({ t, c, r, x }) => (
              <li
                key={t}
                className={`relative w-fit rounded-[1.1rem] py-4 pl-16 pr-7 transition-[rotate,translate] duration-500 ease-[var(--ease-back)] hover:-translate-y-1 hover:rotate-0 sm:py-5 sm:pl-20 sm:pr-9 ${c} ${r} ${x}`}
              >
                <span aria-hidden className="absolute left-6 top-1/2 size-5 -translate-y-1/2 rounded-full bg-crimson-wash sm:left-7 sm:size-6" />
                <span className="display block text-[clamp(1.7rem,3.6vw,3.3rem)] leading-none">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
