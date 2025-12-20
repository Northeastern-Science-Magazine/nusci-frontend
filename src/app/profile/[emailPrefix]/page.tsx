import { Avatar } from "@/design-system/primitives/Avatar/Avatar";
import Text from "@/design-system/primitives/Text/Text";
import Card from "@/design-system/primitives/Card";
import { Badge } from "@/design-system/primitives/Badge/Badge";
import { Box } from "@/design-system/primitives/Box/Box";
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
  params: { emailPrefix: string };
}

export default function PublicProfilePage({ params }: PublicProfilePageProps) {
  const { emailPrefix } = params;

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
      name: "John Doe",
      pronouns: "He/Him",
      graduationYear: 2027,
      major: "Computer Science",
      location: "Boston",
      email: "jdoe@northeastern.edu",
      roles: [Roles.Author, Roles.Designer, Roles.Editor],
      avatarUrl: "https://cdn.britannica.com/73/9173-050-9D9EA4BA/Surgeonfish.jpg",
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
      <Box className="relative w-full h-[400px] overflow-hidden">
        <img src={bannerUrl} alt="Banner" className="w-full h-full object-cover" />
      </Box>

      {/* Header: Avatar, Name and Role */}
      <Box className="bg-white relative">
        <Box className="max-w-6xl mx-auto px-4 laptop:px-8 py-6">
          <Box className="flex items-center gap-12 flex-wrap">
            {/* Avatar with negative margin to overlap banner */}
            <Box className="-mt-40 laptop:-mt-40 flex-shrink-0 z-10">
              <Avatar src={avatarUrl} alt="A blue surgeonfish avatar" fallback="SX" size={"xl"} />
            </Box>
            <Box className="flex items-center gap-4 flex-wrap">
              <Text style="bold" size={48} color="black" className="tracking-tight laptop:text-[56px]">
                {name}
              </Text>
              {roles.map((role) => (
                <Badge color="aqua" variant="default" className="capitalize" key={roles.indexOf(role)}>
                  {role}
                </Badge>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Main content grid */}
      <Box className="px-4 laptop:px-8 py-8 bg-gray">
        <Box className="max-w-6xl mx-auto grid grid-cols-1 laptop:grid-cols-12 gap-6">
          {/* Left column: Auxiliary info */}
          <Box className="col-span-1 laptop:col-span-4">
            <Card color="white" className="shadow-xl p-6">
              <Box className="space-y-4">
                <Box className="flex items-center gap-3">
                  <Text style="regular" size={16} color="sage-green">
                    Pronouns:
                  </Text>
                  <Text style="regular" size={16} color="black">
                    {pronouns}
                  </Text>
                </Box>
                <Box className="flex items-center gap-3">
                  <Text style="regular" size={16} color="sage-green">
                    Graduation Year:
                  </Text>
                  <Text style="regular" size={16} color="black">
                    {graduationYear}
                  </Text>
                </Box>
                <Box className="flex items-center gap-3">
                  <Text style="regular" size={16} color="sage-green">
                    Major:
                  </Text>
                  <Text style="regular" size={16} color="black">
                    {major}
                  </Text>
                </Box>
                <Box className="flex items-center gap-3">
                  <Text style="regular" size={16} color="sage-green">
                    Location:
                  </Text>
                  <Text style="regular" size={16} color="black">
                    {location}
                  </Text>
                </Box>
                <Box className="flex items-center gap-3">
                  <Text style="regular" size={16} color="sage-green">
                    Email:
                  </Text>
                  <Text style="regular" size={16} color="black">
                    {email}
                  </Text>
                </Box>
              </Box>
            </Card>
          </Box>

          {/* Right column: Bio */}
          <Box className="col-span-1 laptop:col-span-8">
            <Text style="regular" size={16} color="black" className="leading-relaxed">
              {bio}
            </Text>
          </Box>
        </Box>
      </Box>

      {hasArticles && (
        <Box className="px-4 laptop:px-8 pb-8">
          <Card color="white" className="shadow-xl flex justify-center p-8 max-w-7xl mx-auto">
            <Text style="bold" color="black" size={36} className="tracking-tight">
              Articles
            </Text>
          </Card>
        </Box>
      )}
    </>
  );
}
