import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { IntroSection } from "./IntroSection";
import { Stats } from "./Stats";
import { EducationalGames } from "./EducationalGames";
import { CompetitiveSection } from "./CompetitiveSection";
import { AppDownload } from "./AppDownload";
import { LearningJourney } from "./LearningJourney";
import { SubscriptionPlans } from "./SubscriptionPlans";
import { ParentReviews } from "./ParentReviews";
import { LatestNews } from "./LatestNews";
import { Footer } from "./Footer";

interface LandingPageProps {
  onLoginClick?: () => void;
}

export function LandingPage({ onLoginClick }: LandingPageProps) {
  return (
    <div
      className="min-h-screen"
      style={{ fontFamily: "'Cairo', 'Tajawal', sans-serif", direction: "rtl" }}
    >
      <Navbar onLoginClick={onLoginClick} />
      <Hero />
      <IntroSection />
      <Stats />
      <EducationalGames />
      <AppDownload />
      <CompetitiveSection />
      <LearningJourney />
      <SubscriptionPlans />
      <ParentReviews />
      <LatestNews />
      <Footer />
    </div>
  );
}
