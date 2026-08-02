import HeroSection from "./_components/HeroSection";
import FeaturesSection from "./_components/FeaturesSection";
import FeaturedProducts from "./_components/FeaturedProducts";
import DashboardFeatureSection from "./_components/DashboardFeatureSection";
import FunctionalFeatureOfApp from "./_components/FunctionalFeatureOfApp";

export default async function Home() {
  return (
    <main className="w-full">
      <HeroSection />

      <FeaturesSection />
      <FeaturedProducts />

      <DashboardFeatureSection />

      <FunctionalFeatureOfApp />
    </main>
  );
}
