'use client';

import { useState } from 'react';
import Box from '@/design-system/primitives/Box';
import Text from '@/design-system/primitives/Text';
import Link from '@/design-system/primitives/Link';
import MediaCard from '@/design-system/components/MediaCard';
import { PaginationBar } from '@/design-system/components/PaginationBar';
import { IconName } from '@/design-system/primitives/Icon';
import categoryToIcon from '@/lib/helpers/categoryToIcon';
import categoryToIconColor from '@/lib/helpers/categoryToIconColor';
import { Article, PhotographyStatus } from '@/lib/types/types';

const ARTICLES_PER_PAGE = 5;

function describe(article: Article): string {
  const first = (article.articleContent ?? []).find((p) => p && p.length > 0);
  const text = first ? first.map((seg) => seg.content).join(' ') : '';
  const words = text.split(/\s+/).filter(Boolean);
  return words.length > 35 ? `${words.slice(0, 35).join(' ')}…` : text;
}

export default function ProfileArticles({ articles }: { articles: Article[] }) {
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const visible = articles.slice(
    (page - 1) * ARTICLES_PER_PAGE,
    page * ARTICLES_PER_PAGE,
  );

  return (
    <Box className="bg-white shadow-md-top">
      <Box className="max-w-6xl mx-auto px-4 laptop:px-8 py-16">
        <Text
          style="bold"
          color="black"
          size={36}
          className="tracking-tight mb-8"
        >
          Articles
        </Text>
        <Box className="flex flex-col gap-6 mb-8">
          {visible.map((article) => {
            const hasNoPhoto =
              String(article.photographyStatus) ===
              String(PhotographyStatus.NoPhoto);
            const subtitle = [
              ...(article.categories?.length
                ? article.categories
                : ['Uncategorized']),
              article.issueNumber ? `Issue ${article.issueNumber}` : null,
            ]
              .filter(Boolean)
              .join(' • ');
            const common = {
              className: 'w-full max-w-none',
              mediaDirection: 'right' as const,
              border: 'none' as const,
              title: article.title,
              size: 'md' as const,
              shadow: 'none' as const,
              subtitle,
              description: describe(article),
            };

            return (
              <Link
                key={article.slug}
                href={`/${article.slug}`}
                className="block w-full"
              >
                {hasNoPhoto ? (
                  <MediaCard
                    {...common}
                    mediaType="icon"
                    iconProps={{
                      icon: categoryToIcon(
                        article.categories?.[0] || 'uncategorized',
                      ) as IconName,
                      size: 128,
                      color: categoryToIconColor(
                        article.categories?.[0] || 'uncategorized',
                      ),
                    }}
                  />
                ) : (
                  <MediaCard
                    {...common}
                    mediaType="image"
                    imageProps={{ src: '/succulent.png', alt: article.title }}
                  />
                )}
              </Link>
            );
          })}
        </Box>
        {pageCount > 1 && (
          <Box className="flex justify-center pt-6 border-t border-neutral-200">
            <PaginationBar
              maxItems={pageCount}
              activeItem={page}
              onClickFunctionGenerator={(index) => () => setPage(index)}
              onClickLeft={() => setPage((p) => Math.max(1, p - 1))}
              onClickRight={() => setPage((p) => Math.min(pageCount, p + 1))}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
