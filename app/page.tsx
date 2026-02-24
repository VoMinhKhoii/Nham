'use client';

import {
  CTASection,
  Footer,
  Header,
  Hero,
  ProblemSection,
  SolutionSection,
} from '@/components/landing-page';

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
