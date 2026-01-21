"use server";

import Hero from "./components/Hero";
import PrintMagazines from "./components/PrintMagazines";
import FeaturedArticles from "./components/FeaturedArticles";
import { getUserRoles } from "@/lib/helpers/auth";
import CTA from "./components/CTA";
import {
  getStatistics,
  getMagazineIssues,
  getRecentArticles,
  getFeaturedArticles,
  getCTAData,
} from "@/lib/api/articles";

export default async function Homepage() {
  const roles = getUserRoles();
  console.log(roles);

  try {
    const [stats, magazines, recentArticles, featuredArticles, ctaData] =
      await Promise.all([
        getStatistics(),
        getMagazineIssues(),
        getRecentArticles(),
        getFeaturedArticles(),
        getCTAData(),
      ]);

    return (
      <main>
        <Hero stats={stats} />
        <PrintMagazines magazines={magazines} />
        <FeaturedArticles
          featuredArticles={featuredArticles}
          recentArticles={recentArticles}
        />
        <CTA
          title={ctaData.title}
          description={ctaData.description}
          primaryButtonText={ctaData.primaryButtonText}
          secondaryButtonText={ctaData.secondaryButtonText}
          backgroundImageSrc={ctaData.backgroundImageSrc}
          backgroundImageAlt={ctaData.backgroundImageAlt}
        />
      </main>
    );
  } catch (error) {
    console.error("Failed to fetch homepage data:", error);

    return (
      <main>
        <Hero
          stats={{ legacyYears: 17, publishedIssues: 66, reachArticles: 1300 }}
        />
        <PrintMagazines magazines={[]} />
        <FeaturedArticles featuredArticles={[]} recentArticles={[]} />
        <CTA
          title="Made by students. Read by everyone."
          description="Want to write, design, photograph, or build with us? NU Sci is a community for curious people."
          primaryButtonText="Learn about NU Sci"
          secondaryButtonText="Join the team"
          backgroundImageSrc="/icy.png"
          backgroundImageAlt="A textured green moss background"
        />
      </main>
    );
  }
}
