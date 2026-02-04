"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
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

type FilterTag = {
  id: string;
  label: string;
  type: "contributor" | "issue" | "category" | "date" | "sort";
};

const CATEGORY_LABEL: Record<string, string> = {
  all: "All categories",
  ArtificialIntelligence: "Artificial Intelligence",
  Biology: "Biology",
  Chemistry: "Chemistry",
  ComputerScience: "Computer Science",
  Culture: "Culture",
  Health: "Health",
  Environment: "Environment",
  Medicine: "Medicine",
  Newsletter: "Newsletter",
  Opinion: "Opinion",
  Physics: "Physics",
  Psychology: "Psychology",
  Science: "Science",
  Space: "Space",
  Technology: "Technology",
};

const DATE_LABEL: Record<string, string> = {
  any: "Any time",
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  ytd: "This year",
};

const SORT_LABEL: Record<string, string> = {
  created_desc: "Most recent",
  created_asc: "Oldest",
  title_asc: "Title A–Z",
  title_desc: "Title Z–A",
};

export default function ArticleSearchPage() {
  const mostRecentIssueNum = 60;

  const [title, setTitle] = useState("");
  const [contributor, setContributor] = useState("");
  const [date, setDate] = useState("any");
  const [sort, setSort] = useState("created_desc");
  const [issueNumber, setIssueNumber] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");

  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [resultsCount, setResultsCount] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  // to handle value for uncontrolled dropdown input
  const [keys, setKeys] = useState({
    category: 0,
    issueNum: 0,
    date: 0,
    sort: 0,
  });

  // Build filter tags from current state
  const buildFilterTags = useCallback((): FilterTag[] => {
    const tags: FilterTag[] = [];
    if (contributor.trim()) {
      tags.push({ id: "contributor", label: `Contributor: "${contributor.trim()}"`, type: "contributor" });
    }
    if (issueNumber && issueNumber !== "all") {
      tags.push({ id: "issue", label: `Issue #${issueNumber}`, type: "issue" });
    }
    if (category && category !== "all") {
      tags.push({ id: "category", label: CATEGORY_LABEL[category] || category, type: "category" });
    }
    if (date !== "any") {
      tags.push({ id: "date", label: DATE_LABEL[date] || date, type: "date" });
    }
    if (sort !== "created_desc") {
      tags.push({ id: "sort", label: SORT_LABEL[sort] || sort, type: "sort" });
    }
    return tags;
  }, [ contributor, issueNumber, category, date, sort]);

  const [filterTags, setFilterTags] = useState<FilterTag[]>([]);

  // Remove a specific filter
  const removeFilter = (tagId: string) => {
    switch (tagId) {
      case "contributor":
        setContributor("");
        break;
      case "issue":
        setIssueNumber("all");
        setKeys((k) => ({ ...k, issueNum: k.issueNum + 1 }));
        break;
      case "category":
        setCategory("all");
        setKeys((k) => ({ ...k, category: k.category + 1 }));
        break;
      case "date":
        setDate("any");
        setKeys((k) => ({ ...k, date: k.date + 1 }));
        break;
      case "sort":
        setSort("created_desc");
        setKeys((k) => ({ ...k, sort: k.sort + 1 }));
        break;
    }
  };

  // Update filter tags when state changes
  useEffect(() => {
    setFilterTags(buildFilterTags());
  }, [buildFilterTags]);

  const onSearch = async () => {
    const articleTitle = title.trim();
    setTitle(articleTitle);

    setLoading(true);
    setSearchPerformed(true);
    setCurrentPage(1);

    // Simulate API call - replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock results count - replace with actual API response
    const mockCount = Math.floor(Math.random() * 50) + 1;
    setResultsCount(mockCount);

    setLoading(false);
  };

  const onReset = () => {
    setTitle("");
    setContributor("");
    setDate("any");
    setSort("created_desc");
    setIssueNumber("all");
    setCategory("all");
    setSearchPerformed(false);
    setResultsCount(null);
    setCurrentPage(1);
    setKeys((k) => ({
      category: k.category + 1,
      issueNum: k.issueNum + 1,
      date: k.date + 1,
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

  // Mock articles data - replace with actual API data
  const mockArticles = useMemo(() => {
    if (searchPerformed && !loading && resultsCount && resultsCount > 0) {
      // Search results
      return Array.from({ length: Math.min(resultsCount, 12) }, (_, i) => ({
        id: i,
        title: `Article Title ${i + 1}`,
        subtitle: category !== "all" ? CATEGORY_LABEL[category] || category : "Science",
        description: "A compelling description of this article that gives readers a sense of what to expect.",
        imageUrl: `/succulent.png`,
      }));
    } else if (!searchPerformed) {
      // Most recent articles (default view) - generate 24 articles for pagination demo
      return Array.from({ length: 24 }, (_, i) => ({
        id: i + 100,
        title: `Most Recent Article ${i + 1}`,
        subtitle: ["Science", "Technology", "Medicine", "Biology", "Physics", "Chemistry"][i % 6],
        description: "A compelling description of this article that gives readers a sense of what to expect.",
        imageUrl: `/succulent.png`,
      }));
    }
    return [];
  }, [searchPerformed, loading, resultsCount, category]);

  const hasActiveFilters = filterTags.length > 0;
  const showResults = searchPerformed && !loading;

  return (
    <div className="min-h-screen bg-white">
      {/* Parallax Hero Section with Header and Search Form */}
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
              <Box className="flex justify-end">
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
                    <Flex direction="row" wrap="wrap" gap={4}>
                      <FlexChild className="flex-col gap-1 min-w-[200px] flex-1 max-w-[280px]">
                        <Text size={12} color="black" className="opacity-70">
                          Contributor
                        </Text>
                        <TextInput
                          variant="filled"
                          size="md"
                          color="white"
                          label=""
                          value={contributor}
                          onChange={(value) => setContributor(value)}
                          placeholder="Author, photographer, editor..."
                          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, onSearch)}
                        />
                      </FlexChild>

                      <FlexChild className="flex-col gap-1 min-w-[200px] flex-1 max-w-[280px]">
                        <Text size={12} color="black" className="opacity-70">
                          Category
                        </Text>
                        <DropdownInput placeholder="All categories" key={keys.category} onChange={setCategory}>
                          <DropdownItem value="all">All categories</DropdownItem>
                          <DropdownItem value="ArtificialIntelligence">Artificial Intelligence</DropdownItem>
                          <DropdownItem value="Biology">Biology</DropdownItem>
                          <DropdownItem value="Chemistry">Chemistry</DropdownItem>
                          <DropdownItem value="ComputerScience">Computer Science</DropdownItem>
                          <DropdownItem value="Culture">Culture</DropdownItem>
                          <DropdownItem value="Health">Health</DropdownItem>
                          <DropdownItem value="Environment">Environment</DropdownItem>
                          <DropdownItem value="Medicine">Medicine</DropdownItem>
                          <DropdownItem value="Newsletter">Newsletter</DropdownItem>
                          <DropdownItem value="Opinion">Opinion</DropdownItem>
                          <DropdownItem value="Physics">Physics</DropdownItem>
                          <DropdownItem value="Psychology">Psychology</DropdownItem>
                          <DropdownItem value="Science">Science</DropdownItem>
                          <DropdownItem value="Space">Space</DropdownItem>
                          <DropdownItem value="Technology">Technology</DropdownItem>
                        </DropdownInput>
                      </FlexChild>

                      <FlexChild className="flex-col gap-1 min-w-[160px] max-w-[200px]">
                        <Text size={12} color="black" className="opacity-70">
                          Issue Number
                        </Text>
                        <DropdownInput placeholder="All issues" key={keys.issueNum} onChange={setIssueNumber}>
                          <>
                            <DropdownItem value="all">All issues</DropdownItem>
                            {Array.from({ length: mostRecentIssueNum }, (_, i) => i + 1)
                              .reverse()
                              .map((n) => (
                                <DropdownItem key={n} value={String(n)}>
                                  Issue #{n}
                                </DropdownItem>
                              ))}
                          </>
                        </DropdownInput>
                      </FlexChild>

                      <FlexChild className="flex-col gap-1 min-w-[160px] max-w-[200px]">
                        <Text size={12} color="black" className="opacity-70">
                          Date Range
                        </Text>
                        <DropdownInput key={keys.date} placeholder="Any time" onChange={setDate}>
                          <DropdownItem value="any">Any time</DropdownItem>
                          <DropdownItem value="7d">Last 7 days</DropdownItem>
                          <DropdownItem value="30d">Last 30 days</DropdownItem>
                          <DropdownItem value="ytd">This year</DropdownItem>
                        </DropdownInput>
                      </FlexChild>

                      <FlexChild className="flex-col gap-1 min-w-[160px] max-w-[200px]">
                        <Text size={12} color="black" className="opacity-70">
                          Sort By
                        </Text>
                        <DropdownInput key={keys.sort} placeholder="Most recent" onChange={setSort as any}>
                          <DropdownItem value="created_desc">Most recent</DropdownItem>
                          <DropdownItem value="created_asc">Oldest</DropdownItem>
                          <DropdownItem value="title_asc">Title A–Z</DropdownItem>
                          <DropdownItem value="title_desc">Title Z–A</DropdownItem>
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
            <div className="mb-6 flex items-start justify-between gap-3">
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
                </div>
              </Box>
              <div className="flex-shrink-0">
              {hasActiveFilters && (
                  <Box className="flex justify-end">
                    <Button variant="outline" size="sm" color="forest-green" onClick={onReset} disabled={loading}>
                      Reset filters
                    </Button>
                  </Box>
                )} 
              </div>
            </div>
          )}

          <Divider />

          {/* Results Section */}
          {(showResults || !searchPerformed) && (
            <Box className="mt-8">
              {/* Results Header */}
              <Flex direction="row" className="justify-between items-center mb-6 flex-wrap gap-4">
                <Box>
                  <Text size={20} style="bold" color="black" className="mb-1">
                    {searchPerformed ? "Search Results" : "Most Recent Articles"}
                  </Text>
                  {searchPerformed && resultsCount !== null && (
                    <Text size={14} color="black" className="opacity-60">
                      {resultsCount} {resultsCount === 1 ? "article found" : "articles found"}
                    </Text>
                  )}
                  {!searchPerformed && (
                    <Text size={14} color="black" className="opacity-60">
                      Showing the most recently published articles
                    </Text>
                  )}
                </Box>
              </Flex>

              {/* Results List */}
              {mockArticles.length > 0 ? (
                <>
                  <Box className="flex flex-col gap-6 mb-8">
                    {mockArticles.slice((currentPage - 1) * 12, currentPage * 12).map((article) => (
                      <Link
                        key={article.id}
                        href={`/issue/${article.id}/article/${article.title.toLowerCase().replace(/\s+/g, "-")}`}
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
                          subtitle={article.subtitle}
                          description={article.description}
                          imageProps={{
                            src: article.imageUrl,
                            alt: article.title,
                          }}
                        />
                      </Link>
                    ))}
                  </Box>

                  {/* Pagination */}
                  {searchPerformed && resultsCount && resultsCount > 12 && (
                    <Flex direction="row" gap={2} className="justify-center items-center pt-6 border-t border-neutral-200">
                      <FlexChild className="gap-2">
                        <PaginationBar
                          maxItems={Math.ceil(resultsCount / 12)}
                          activeItem={currentPage}
                          onClickFunctionGenerator={(index) => () => setCurrentPage(index)}
                          onClickLeft={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          onClickRight={() => setCurrentPage((p) => Math.min(Math.ceil(resultsCount / 12), p + 1))}
                        />
                      </FlexChild>
                    </Flex>
                  )}
                  {!searchPerformed && mockArticles.length > 12 && (
                    <Flex direction="row" gap={2} className="justify-center items-center pt-6 border-t border-neutral-200">
                      <FlexChild className="gap-2">
                        <PaginationBar
                          maxItems={Math.ceil(mockArticles.length / 12)}
                          activeItem={currentPage}
                          onClickFunctionGenerator={(index) => () => setCurrentPage(index)}
                          onClickLeft={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          onClickRight={() => setCurrentPage((p) => Math.min(Math.ceil(mockArticles.length / 12), p + 1))}
                        />
                      </FlexChild>
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
  );
}
