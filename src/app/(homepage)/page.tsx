'use server';

import Hero from './components/Hero';
import PrintMagazines from './components/PrintMagazines';
import FeaturedArticles from './components/FeaturedArticles';
import CTA from './components/CTA';
import {
  getRecentArticles,
  getFeaturedArticles,
  apiGetPublishedArticleCount,
} from '@/lib/api/articles';
import { getMagazineIssues } from '@/lib/api/archive';
import { apiGetIssueCount } from '@/lib/api/issues';

export default async function Homepage() {
  try {
    const [
      magazines,
      recentArticles,
      featuredArticles,
      issueCount,
      articleCount,
    ] = await Promise.all([
      getMagazineIssues(),
      getRecentArticles(7),
      getFeaturedArticles(),
      apiGetIssueCount(),
      apiGetPublishedArticleCount(),
    ]);

    return (
      <main>
        <Hero
          publishedIssues={issueCount.ok ? issueCount.data.count : undefined}
          publishedArticles={
            articleCount.ok ? articleCount.data.count : undefined
          }
        />
        <PrintMagazines magazines={magazines} />
        <FeaturedArticles
          featuredArticles={featuredArticles}
          recentArticles={recentArticles}
        />
        <CTA />
      </main>
    );
  } catch (error) {
    console.error('Failed to fetch homepage data:', error);

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
