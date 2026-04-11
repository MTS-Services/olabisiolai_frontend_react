import { Category } from "@/components/sections/home/Category";
import { Hero } from "@/components/sections/home/Hero";
import Featured from "@/components/sections/home/Featured";
import HowGidiraWorks from "@/components/sections/home/HowGidiraWorks";
import WhyChooseGidira from "@/components/sections/home/WhyChooseGidira";

export default function Home() {

  return (
    <div className="min-h-dvh">
      <Hero />
      <Category />
      <Featured />
      <HowGidiraWorks />
      <WhyChooseGidira />
    </div>
  );
}
