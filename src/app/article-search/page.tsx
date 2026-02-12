"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { DropdownInput, DropdownItem } from "@/primitives/DropdownInput";
import Button from "@/primitives/Button";
import TextInput from "@/design-system/primitives/TextInput";
import { FlexChild, Flex } from "@/design-system/primitives/Flex";
import Text from "@/design-system/primitives/Text";
import MediaCard from "@/components/MediaCard";
import { PaginationBar } from "@/design-system/components/PaginationBar";
import Box from "@/design-system/primitives/Box";
import { X, Search as SearchIcon, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import Link from "@/design-system/primitives/Link";
import { ParallaxScrollSection } from "@/design-system/components/ParallaxScrollSection";
import Divider from "@/design-system/primitives/Divider";
import { Categories, Article } from "@/lib/types/types";
import { searchArticles } from "@/lib/api/articles";

type FilterTag = {
  id: string;
  label: string;
  type: "title" | "category" | "sort";
};

const CATEGORY_LABEL: Record<string, string> = Object.values(Categories).reduce(
  (acc, category) => {
    acc[category] = category;
    return acc;
  },
  { all: "All categories" } as Record<string, string>,
);

const truncateByWords = (text: string, wordLimit: number): string => {
  if (!text) return "No description available.";
  const words = text.trim().split(/\s+/);
  if (words.length <= wordLimit) {
    return text;
  }
  return words.slice(0, wordLimit).join(" ") + "...";
};

export default function ArticleSearchPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"asc" | "desc">("desc");
  const [articles, setArticles] = useState<Article[]>([]);

  const [loading, setLoading] = useState(true);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [resultsCount, setResultsCount] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(15);

  // to handle value for uncontrolled dropdown input
  const [keys, setKeys] = useState({
    category: 0,
    sort: 0,
  });

  // Build filter tags from current state
  const buildFilterTags = useCallback((): FilterTag[] => {
    const tags: FilterTag[] = [];
    if (title.trim()) {
      tags.push({ id: "title", label: `Title: "${title.trim()}"`, type: "title" });
    }
    if (category && category !== "all") {
      tags.push({ id: "category", label: CATEGORY_LABEL[category] || category, type: "category" });
    }
    if (sortBy !== "desc") {
      tags.push({ id: "sort", label: `Sort: Oldest first`, type: "sort" });
    }
    return tags;
  }, [title, category, sortBy]);

  const [filterTags, setFilterTags] = useState<FilterTag[]>([]);

  // Remove a specific filter
  const removeFilter = (tagId: string) => {
    switch (tagId) {
      case "title":
        setTitle("");
        break;
      case "category":
        setCategory("all");
        setKeys((k) => ({ ...k, category: k.category + 1 }));
        break;
      case "sort":
        setSortBy("desc");
        setKeys((k) => ({ ...k, sort: k.sort + 1 }));
        break;
    }
  };

  // Update filter tags when state changes
  useEffect(() => {
    setFilterTags(buildFilterTags());
  }, [buildFilterTags]);

  const performSearch = useCallback(
    async (page: number = 1, searchTitle: string, searchCategory: string, searchSortBy: "asc" | "desc") => {
      setLoading(true);

      const request = {
        limit: 12,
        skip: (page - 1) * 12,
        textQuery: searchTitle.trim() || undefined,
        categories: searchCategory && searchCategory !== "all" ? [searchCategory] : undefined,
        sortBy: searchSortBy,
      };

      const result = await searchArticles(request);
      if (result.ok) {
        setArticles(result.data);
        // If we got a full page (12 articles), there might be more pages
        // For now, we'll estimate total based on current page and results
        // If we have exactly 12 results, assume there are more pages
        if (result.data.length === 12) {
          setResultsCount((page - 1) * 12 + result.data.length + 1); // Estimate: at least one more
        } else {
          setResultsCount((page - 1) * 12 + result.data.length);
        }
        setSearchPerformed(true);
      } else {
        console.error("Search failed:", result.error);
        setArticles([]);
        setResultsCount(0);
        setSearchPerformed(true);
      }

      setLoading(false);
      setInitialLoad(false);
    },
    [],
  );

  const onSearch = async () => {
    setCurrentPage(1);
    await performSearch(1, title, category, sortBy);
  };

  const onReset = () => {
    setTitle("");
    setCategory("all");
    setSortBy("desc");
    setSearchPerformed(false);
    setResultsCount(null);
    setCurrentPage(1);
    setArticles([]);
    setKeys((k) => ({
      category: k.category + 1,
      sort: k.sort + 1,
    }));
  };

  // Handle Enter key in search inputs
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, action: () => void) => {
    if (e.key === "Enter") {
      e.preventDefault();
      action();
    }
  };

  // Track previous filter values to detect changes
  const prevFiltersRef = useRef({ title, category, sortBy });

  // Fetch articles when page changes
  useEffect(() => {
    if (searchPerformed && currentPage > 0) {
      performSearch(currentPage, title, category, sortBy);
    }
  }, [currentPage, performSearch, searchPerformed, title, category, sortBy]);

  // Reset to page 1 when filters change (but not on initial mount)
  useEffect(() => {
    const filtersChanged =
      prevFiltersRef.current.title !== title ||
      prevFiltersRef.current.category !== category ||
      prevFiltersRef.current.sortBy !== sortBy;

    if (searchPerformed && filtersChanged && currentPage !== 1) {
      setCurrentPage(1);
    }

    prevFiltersRef.current = { title, category, sortBy };
  }, [title, category, sortBy, searchPerformed, currentPage]);

  // Load initial articles on mount (most recent)
  useEffect(() => {
    if (!searchPerformed) {
      performSearch(1, "", "all", "desc");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasActiveFilters = filterTags.length > 0;
  const showResults = searchPerformed && !loading;
  const showInitialLoadingScreen = initialLoad && loading;

  // Fast loading bar animation for the initial page load only
  useEffect(() => {
    if (!showInitialLoadingScreen) return;

    setLoadingProgress(15);
    const intervalId = window.setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 90) return 15;
        const next = prev + 10 + Math.round(Math.random() * 12);
        return Math.min(next, 90);
      });
    }, 120);

    return () => window.clearInterval(intervalId);
  }, [showInitialLoadingScreen]);

  const LoadingScreen = () => <div className="min-h-screen bg-white flex items-center justify-center" />;

  if (showInitialLoadingScreen) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Parallax Hero Section with Header and Search Form */}
      <div className="animate-fadeIn">
        <ParallaxScrollSection
          imageSrc="/icy.png"
          imageAlt="Article search background"
          parallaxIntensity="medium"
          offset="lg"
          maxWidth="max-w-7xl"
          padding="px-4 laptop:px-8"
        >
          <Box className="px-4 laptop:px-16 py-16">
            {/* Main Search Bar - Full Width */}
            <Box className="mb-4">
              <Box className="flex flex-col gap-4">
                <Flex direction="row" gap={2} className="items-center w-full">
                  <FlexChild className="flex-1">
                    <TextInput
                      variant="outline"
                      size="lg"
                      color="black"
                      label=""
                      value={title}
                      onChange={(value) => setTitle(value)}
                      placeholder="Search articles..."
                      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, onSearch)}
                      className="w-[900px]"
                    />
                  </FlexChild>
                  <FlexChild>
                    <Button
                      variant="default"
                      size="lg"
                      color="forest-green"
                      onClick={onSearch}
                      disabled={loading}
                      className="min-w-[120px] flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Searching...
                        </>
                      ) : (
                        <>
                          <SearchIcon className="w-5 h-5" />
                          Search
                        </>
                      )}
                    </Button>
                  </FlexChild>
                </Flex>

                {/* Advanced Search Toggle */}
                <Box className="flex justify-center">
                  <Button
                    size="sm"
                    color="white"
                    variant="default"
                    onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                    className="flex items-center gap-2"
                  >
                    Advanced Search
                    {showAdvancedSearch ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </Button>
                </Box>

                {/* Advanced Search Filters - Collapsible */}
                {showAdvancedSearch && (
                  <Box className="pt-4 border-t border-neutral-200">
                    <Flex direction="col" gap={6}>
                      <Flex direction="row" wrap="wrap" gap={4} className="items-end">
                        <FlexChild className="flex-col gap-1 min-w-[200px] flex-1 max-w-[280px]">
                          <Text size={12} color="black" className="opacity-70">
                            Category
                          </Text>
                          <DropdownInput placeholder="All categories" key={keys.category} onChange={setCategory}>
                            {Object.entries(CATEGORY_LABEL).map(([key, label]) => (
                              <DropdownItem value={key} key={key}>
                                {label}
                              </DropdownItem>
                            ))}
                          </DropdownInput>
                        </FlexChild>
                        <FlexChild className="flex-col gap-1 min-w-[160px] max-w-[200px]">
                          <Text size={12} color="black" className="opacity-70">
                            Sort By Date
                          </Text>
                          <DropdownInput
                            key={keys.sort}
                            placeholder="Newest first"
                            onChange={(value) => setSortBy(value as "asc" | "desc")}
                          >
                            <DropdownItem value="desc">Newest first</DropdownItem>
                            <DropdownItem value="asc">Oldest first</DropdownItem>
                          </DropdownInput>
                        </FlexChild>
                      </Flex>
                    </Flex>
                  </Box>
                )}
              </Box>
            </Box>

            {/* Active Filters */}
            {hasActiveFilters && (
              <Box className="mb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Text size={14} color="black" className="opacity-70 mr-2">
                    Active filters:
                  </Text>
                  {filterTags.map((tag) => (
                    <Box
                      key={tag.id}
                      className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm border-2 border-forest-green/30 bg-forest-green/10 text-forest-green hover:bg-forest-green/20 transition-colors"
                    >
                      <span>{tag.label}</span>
                      <button
                        onClick={() => removeFilter(tag.id)}
                        className="hover:bg-forest-green/20 rounded-full p-0.5 transition-colors"
                        aria-label={`Remove ${tag.label} filter`}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </Box>
                  ))}
                  <Button variant="outline" size="sm" color="forest-green" onClick={onReset} disabled={loading}>
                    Reset filters
                  </Button>
                </div>
              </Box>
            )}

            <Divider />

            {/* Results Section */}
            {(showResults || !searchPerformed) && (
              <Box className="mt-8">
                {/* Results Header */}
                {resultsCount !== null && (
                  <Flex direction="row" className="justify-between items-center mb-6 flex-wrap gap-4">
                    <Box>
                      <Text size={14} color="black" className="opacity-60">
                        {resultsCount} {resultsCount === 1 ? "article found" : "articles found"}
                      </Text>
                    </Box>
                  </Flex>
                )}

                {/* Results List */}
                {articles.length > 0 ? (
                  <>
                    <Box className="flex flex-col gap-6 mb-8">
                      {articles.map((article) => (
                        <Link
                          key={`${article.issueNumber}-${article.slug}`}
                          href={`/issue/${article.issueNumber}/article/${article.slug}`}
                          className="block w-full"
                        >
                          <MediaCard
                            className="w-full max-w-none"
                            mediaType="image"
                            mediaDirection="right"
                            border="none"
                            title={article.title}
                            size="md"
                            shadow="none"
                            subtitle={article.categories[0] || "Uncategorized"}
                            description={truncateByWords(article.articleContent[0]?.content || "", 35)}
                            imageProps={{
                              src: "/succulent.png",
                              alt: article.title,
                            }}
                          />
                        </Link>
                      ))}
                    </Box>

                    {/* Pagination */}
                    {resultsCount && resultsCount > 12 && (
                      <Flex direction="row" gap={2} className="justify-center items-center pt-6 border-t border-neutral-200">
                        <PaginationBar
                          maxItems={Math.ceil(resultsCount / 12)}
                          activeItem={currentPage}
                          onClickFunctionGenerator={(index) => () => setCurrentPage(index)}
                          onClickLeft={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          onClickRight={() => setCurrentPage((p) => Math.min(Math.ceil(resultsCount / 12), p + 1))}
                        />
                      </Flex>
                    )}
                  </>
                ) : (
                  <Box className="text-center py-16">
                    <Text size={24} style="bold" color="black" className="mb-2">
                      No articles found
                    </Text>
                    <Text size={16} color="black" className="opacity-60 mb-6">
                      Try adjusting your search criteria or filters
                    </Text>
                    <Button variant="outline" size="md" color="forest-green" onClick={onReset}>
                      Clear all filters
                    </Button>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </ParallaxScrollSection>
      </div>
    </div>
  );
}
