"use server";

import Hero from "./components/Hero";
import PrintMagazines from "./components/PrintMagazines";
import FeaturedArticles from "./components/FeaturedArticles";
import CTA from "./components/CTA";
import {
  getMagazineIssues,
  getRecentArticles,
  getFeaturedArticles,
} from "@/lib/api/articles";

export default async function Homepage() {
  try {
    const [magazines, recentArticles, featuredArticles] = await Promise.all([
      getMagazineIssues(),
      getRecentArticles(7),
      getFeaturedArticles(),
    ]);

    return (
      <main>
        <Hero />
        <PrintMagazines magazines={magazines} />
        <FeaturedArticles
          featuredArticles={featuredArticles}
          recentArticles={recentArticles}
        />
        <CTA />
      </main>
    );
  } catch (error) {
    console.error("Failed to fetch homepage data:", error);

    return (
      <main>
        <Hero />
        <PrintMagazines magazines={[]} />
        <FeaturedArticles featuredArticles={[]} recentArticles={[]} />
        <CTA />
      </main>
    );
  }
}
