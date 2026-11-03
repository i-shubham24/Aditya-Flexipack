import Image from "next/image";

/**
 * The CEO's message, word for word from the old Sustainability page. The old page paired it with a stock
 * portrait, so the company emblem stands in until a real photograph is supplied.
 */
export function CeoMessage() {
  return (
    <section aria-labelledby="ceo-title" className="pt-[var(--frame)]">
      <div className="panel bg-wine py-[var(--section-y)] text-white">
        <svg aria-hidden viewBox="0 0 1200 800" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path d="M0 560 C 240 470, 420 660, 700 560 S 1040 420, 1200 500 V800 H0 Z" fill="#520912" />
        </svg>
        <figure className="shell relative">
          <h2 id="ceo-title" className="hand -rotate-2 text-[2.4rem] text-blush">
            Message from our CEO
          </h2>
          <blockquote className="mt-6 max-w-[64rem]">
            <p className="display text-[clamp(1.9rem,3.8vw,3.7rem)] leading-[1.04]">
              <span aria-hidden className="text-crimson-light">&ldquo;</span>
              At Aditya Flexipack, we are committed to innovation, quality and customer satisfaction. Our focus is on delivering
              advanced, sustainable and reliable packaging solutions. Strong partnerships and ethical business practices drive our
              success. Together, we shape the future of flexible packaging.
              <span aria-hidden className="text-crimson-light">&rdquo;</span>
            </p>
          </blockquote>
          <figcaption className="mt-12 flex items-center gap-5">
            <span className="relative block size-20 shrink-0 overflow-hidden rounded-full bg-[#fff6f5] ring-4 ring-crimson">
              <Image src="/media/brand/af-emblem.png" alt="" fill sizes="5rem" className="object-contain p-3" />
            </span>
            <span>
              <span className="display block text-[1.9rem]">Aditya Tondon</span>
              <span className="block text-[1.02rem] text-white/75">Managing Director &amp; Global CEO</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
