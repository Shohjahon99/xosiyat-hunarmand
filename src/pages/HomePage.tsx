import Hero from '../components/home/Hero';
import StatsStrip from '../components/home/StatsStrip';
import CategoryCards from '../components/home/CategoryCards';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Marquee from '../components/home/Marquee';
import Testimonials from '../components/home/Testimonials';
import ImpactTeaser from '../components/home/ImpactTeaser';
import CTABanner from '../components/home/CTABanner';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <CategoryCards />
      <FeaturedProducts />
      <Marquee />
      <Testimonials />
      <ImpactTeaser />
      <CTABanner />
    </>
  );
}
