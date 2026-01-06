import { Avatar } from "@/design-system/primitives/Avatar/Avatar";
import Text from "@/design-system/primitives/Text/Text";
import Card from "@/design-system/primitives/Card";
import { Badge } from "@/design-system/primitives/Badge/Badge";
import { Box } from "@/design-system/primitives/Box/Box";
import MediaCard from "@/design-system/components/MediaCard";
import { notFound } from "next/navigation";
import { Roles } from "@/lib/types/types";

interface ProfileData {
  name: string;
  pronouns: string;
  graduationYear: number;
  major: string;
  location: string;
  email: string;
  roles: Roles[];
  avatarUrl: string;
  bannerUrl: string;
  bio: string;
}

interface PublicProfilePageProps {
  params: Promise<{ emailPrefix: string }>;
}

export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
  const { emailPrefix } = await params;

  //Note: the below is in place of api call using emailPrefix to get data
  let mockData: ProfileData = {
    name: " ",
    pronouns: " ",
    graduationYear: 0,
    major: "",
    location: "",
    email: "",
    roles: [],
    avatarUrl: "",
    bannerUrl: "",
    bio: "",
  };

  if (emailPrefix == "jdoe") {
    mockData = {
      name: "Jonathan Doemeterez",
      pronouns: "He/Him",
      graduationYear: 2027,
      major: "Computer Science",
      location: "Boston",
      email: "jdoe@northeastern.edu",
      roles: [Roles.Author, Roles.Designer, Roles.Editor],
      avatarUrl: "/profil.png",
      bannerUrl: "/icy.png",
      bio: `Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.`,
    };
  } else {
    notFound();
  }

  const { name, pronouns, graduationYear, major, location, email, roles, avatarUrl, bannerUrl, bio } = mockData;

  const hasArticles = roles.includes(Roles.Author) || roles.includes(Roles.Editor);

  return (
    <>
      {/* Banner */}
      <Box className="relative w-full h-[300px] overflow-hidden">
        <img src={bannerUrl} alt="Banner" className="w-full h-full object-cover" />
      </Box>

      {/* Header: Avatar, Name and Role */}
      <Box className="bg-white relative shadow-md">
        <Box className="max-w-6xl mx-auto px-4 laptop:px-8 pt-8 pb-10">
          <Box className="grid grid-cols-1 laptop:grid-cols-12 gap-8 items-end">
            {/* Left column: Avatar centered over auxiliary info card */}
            <Box className="col-span-1 laptop:col-span-4 flex justify-center">
              <Box className="-mt-40 laptop:-mt-40 flex-shrink-0 z-10">
                <Avatar src={avatarUrl} alt="A blue surgeonfish avatar" fallback="SX" size={"xl"} />
              </Box>
            </Box>
            {/* Right column: Name aligned with About section */}
            <Box className="col-span-1 laptop:col-span-8 pb-2 pl-4">
              <Box className="flex items-center gap-4 flex-wrap mb-3">
                <Text style="bold" size={48} color="black" className="tracking-tight laptop:text-[56px]">
                  {name}
                </Text>
              </Box>
              <Box className="flex items-center gap-2 flex-wrap">
                {roles.map((role) => (
                  <Badge color="aqua" variant="default" className="capitalize" key={roles.indexOf(role)}>
                    {role}
                  </Badge>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Main content grid */}
      <Box className="bg-gray">
        <Box className="max-w-6xl mx-auto px-4 laptop:px-8 py-8">
          <Box className="grid grid-cols-1 laptop:grid-cols-12 gap-8 items-stretch">
            {/* Left column: Auxiliary info */}
            <Box className="col-span-1 laptop:col-span-4 flex">
              <Card color="white" className="shadow-xl p-8 sticky top-8 w-full flex flex-col">
                <Box className="space-y-6 flex-1">
                  <Box>
                    <Text style="regular" size={14} color="sage-green" className="uppercase tracking-wide mb-1">
                      Pronouns
                    </Text>
                    <Text style="regular" size={18} color="black">
                      {pronouns}
                    </Text>
                  </Box>
                  <Box>
                    <Text style="regular" size={14} color="sage-green" className="uppercase tracking-wide mb-1">
                      Graduation Year
                    </Text>
                    <Text style="regular" size={18} color="black">
                      {graduationYear}
                    </Text>
                  </Box>
                  <Box>
                    <Text style="regular" size={14} color="sage-green" className="uppercase tracking-wide mb-1">
                      Major
                    </Text>
                    <Text style="regular" size={18} color="black">
                      {major}
                    </Text>
                  </Box>
                  <Box>
                    <Text style="regular" size={14} color="sage-green" className="uppercase tracking-wide mb-1">
                      Location
                    </Text>
                    <Text style="regular" size={18} color="black">
                      {location}
                    </Text>
                  </Box>
                  <Box>
                    <Text style="regular" size={14} color="sage-green" className="uppercase tracking-wide mb-1">
                      Email
                    </Text>
                    <Text style="regular" size={18} color="black" className="break-all">
                      {email}
                    </Text>
                  </Box>
                </Box>
              </Card>
            </Box>

            {/* Right column: Bio */}
            <Box className="col-span-1 laptop:col-span-8 flex">
              <Card color="white" className="shadow-xl p-8 w-full flex flex-col">
                <Text style="regular" size={14} color="sage-green" className="uppercase tracking-wide mb-1">
                  Biography
                </Text>
                <Text style="regular" size={16} color="black" className="leading-relaxed flex-1">
                  {bio}
                </Text>
              </Card>
            </Box>
          </Box>
        </Box>
      </Box>

      {hasArticles && (
        <Box className="bg-white shadow-md-top">
          <Box className="max-w-6xl mx-auto px-4 laptop:px-8 py-16">
            <Text style="bold" color="black" size={36} className="tracking-tight mb-8">
              Articles
            </Text>
            <Box className="flex flex-col gap-6">
              {/* Top row: 3 articles */}
              <Box className="flex flex-col laptop:flex-row gap-6">
                <Box className="flex-1">
                  <MediaCard
                    mediaType="image"
                    imageProps={{ src: "/icy.png", alt: "Icy texture" }}
                    subtitle="Research Spotlight"
                    title="Siberian Permafrost"
                    description="A photo-led story about the science (and spectacle) behind ice—built to read like a print spread."
                    mediaDirection="top"
                    size="sm"
                    rounded="none"
                    shadow="none"
                    color="white"
                    className="w-full max-w-none border border-black/10"
                  />
                </Box>
                <Box className="flex-1">
                  <MediaCard
                    mediaType="image"
                    imageProps={{ src: "/succulent.png", alt: "Succulent plant" }}
                    subtitle="Science + Society"
                    title="Urban Heat Islands, Explained"
                    description="How cities trap heat and what we can do about it—a deep dive into urban climate science."
                    mediaDirection="top"
                    size="sm"
                    rounded="none"
                    shadow="none"
                    color="white"
                    className="w-full max-w-none border border-black/10"
                  />
                </Box>
                <Box className="flex-1">
                  <MediaCard
                    mediaType="image"
                    imageProps={{ src: "/moss.png", alt: "Green moss texture" }}
                    subtitle="Quick Read"
                    title="5 Questions About CRISPR"
                    description="A concise guide to understanding gene editing technology."
                    mediaDirection="top"
                    size="sm"
                    rounded="none"
                    shadow="none"
                    color="white"
                    className="w-full max-w-none border border-black/10"
                  />
                </Box>
              </Box>
              {/* Bottom row: 1 article */}
              <Box className="flex flex-col laptop:flex-row gap-6">
                <Box className="flex-1 laptop:max-w-[calc(33.333%-1rem)]">
                  <MediaCard
                    mediaType="image"
                    imageProps={{ src: "/eclipse-image.png", alt: "Solar eclipse" }}
                    subtitle="Opinion"
                    title="Why Science Needs Better Stories"
                    description="How narrative can bridge the gap between research and public understanding."
                    mediaDirection="top"
                    size="sm"
                    rounded="none"
                    shadow="none"
                    color="white"
                    className="w-full max-w-none border border-black/10"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
