'use client';

import { 
  Header, 
  Hero, 
  ProblemSection, 
  SolutionSection, 
  CTASection, 
  Footer 
} from "@/components/landing-page";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
