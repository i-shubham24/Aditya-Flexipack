import { Hero } from "@/components/home/Hero";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import { ProcessCards } from "@/components/home/ProcessCards";
import { WebPath } from "@/components/home/WebPath";
import { IndustryList } from "@/components/home/IndustryList";
import { WhyUs } from "@/components/home/WhyUs";
import { Credentials } from "@/components/home/Credentials";
import { Loop } from "@/components/home/Loop";
import { Faq } from "@/components/home/Faq";
import { Shelf } from "@/components/home/Shelf";
import { TapeBands } from "@/components/home/TapeBands";
import { RisingPacks } from "@/components/home/RisingPacks";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductCarousel />
      <ProcessCards />
      <WebPath />
      <IndustryList />
      <WhyUs />
      <TapeBands />
      <Credentials />
      <Loop />
      <Faq />
      <RisingPacks />
      <Shelf />
    </>
  );
}
