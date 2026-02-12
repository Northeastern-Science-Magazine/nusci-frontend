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

const HARDCODED_STATS = {
  legacyYears: 17,
  publishedIssues: 66,
  reachArticles: 1300,
};

const HOMEPAGE_CONTENT = {
  hero: {
    subtitle: "Northeastern University's student-run science magazine",
    title: "NU Sci",
    description:
      "Science communication for the community. Written, designed, photographed, and developed by students.",
    primaryButtonText: "Browse articles",
    secondaryButtonText: "Learn more",
  },
  magazines: {
    title: "Our Magazines",
    description:
      "Look through our print archive - click a cover to bring it front and center.",
    archiveButtonText: "View the archive",
  },
  featuredArticles: {
    title: "Recent Articles",
    viewAllText: "View all articles",
  },
  cta: {
    title: "Made by students. Read by everyone.",
    description:
      "Want to write, design, photograph, or build with us? NU Sci is a community for curious people.",
    primaryButtonText: "Learn about NU Sci",
    secondaryButtonText: "Join the team",
    backgroundImageSrc: "/icy.png",
    backgroundImageAlt: "A textured green moss background",
  },
};

export default async function Homepage() {
  try {
    const [magazines, recentArticles, featuredArticles] = await Promise.all([
      getMagazineIssues(),
      getRecentArticles(),
      getFeaturedArticles(),
    ]);

    return (
      <main>
        <Hero stats={HARDCODED_STATS} content={HOMEPAGE_CONTENT.hero} />
        <PrintMagazines
          magazines={magazines}
          content={HOMEPAGE_CONTENT.magazines}
        />
        <FeaturedArticles
          featuredArticles={featuredArticles}
          recentArticles={recentArticles}
          content={HOMEPAGE_CONTENT.featuredArticles}
        />
        <CTA {...HOMEPAGE_CONTENT.cta} />
      </main>
    );
  } catch (error) {
    console.error("Failed to fetch homepage data:", error);

    return (
      <main>
        <Hero stats={HARDCODED_STATS} content={HOMEPAGE_CONTENT.hero} />
        <PrintMagazines magazines={[]} content={HOMEPAGE_CONTENT.magazines} />
        <FeaturedArticles
          featuredArticles={[]}
          recentArticles={[]}
          content={HOMEPAGE_CONTENT.featuredArticles}
        />
        <CTA {...HOMEPAGE_CONTENT.cta} />
      </main>
    );
  }
}
