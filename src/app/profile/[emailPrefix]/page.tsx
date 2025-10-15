import { GridCol, Grid } from "@/design-system/primitives/Grid/Grid";
import { Avatar } from "@/design-system/primitives/Avatar/Avatar";
import Text from "@/design-system/primitives/Text/Text";
import { Image } from "@/design-system/primitives/Image/Image";
import Card from "@/design-system/primitives/Card";
import { Badge } from "@/design-system/primitives/Badge/Badge";
import { Box } from "@/design-system/primitives/Box/Box";
import { notFound } from "next/navigation";

enum Roles {
  Author = "author",
  Editor = "editor",
  Photographer = "photographer",
  Developer = "developer",
  Designer = "designer",
  Admin = "admin"
}

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

export default function PublicProfilePage({params} : PublicProfilePageProps) {
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
    avatarUrl:
      "",
    bannerUrl:
      "",
    bio: ""
  };;

  if (emailPrefix == "jdoe" ) {
  mockData = {
    name: "John Doe",
    pronouns: "He/Him",
    graduationYear: 2027,
    major: "Computer Science",
    location: "Boston",
    email: "jdoe@northeastern.edu",
    roles: [Roles.Author],
    avatarUrl:
      "https://cdn.britannica.com/73/9173-050-9D9EA4BA/Surgeonfish.jpg",
    bannerUrl:
      "https://cdn2.picryl.com/photo/2018/03/17/boston-skyline-46674726272-fcd26e-1024.jpg",
    bio: `Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.`,
  };
} else {
  notFound();
} 

  const {
    name,
    pronouns,
    graduationYear,
    major,
    location,
    email,
    roles,
    avatarUrl,
    bannerUrl,
    bio,
  } = mockData;

  const hasArticles = roles.includes(Roles.Author) || roles.includes(Roles.Editor)

  return (
    <Card color="white" className="shadow-xl ml-36 mr-36 -mt-20">
      <Box className="relative w-full">
        <Image
          src={bannerUrl}
          alt="Banner"
          width="w-full"
          ratio={18 / 4}
          rounded={"rounded"}

        />
        <Box className="absolute bottom-20 left-20">
          <Avatar
            src={avatarUrl}
            alt="A blue suregeon fish avatar"
            fallback="SX"
            size={"lg"}
          />
        </Box>
      </Box>
      <Grid col span={3} gap={2} className="-mt-40">
        <GridCol span={1} className="mb-10">
          <Card color="white" className="mt-24 shadow-xl">
            <Text style="regular" size={20} color="aqua">
              Pronouns: {pronouns}
            </Text>
            <Text style="regular" size={20} color="aqua">
              Graduation Year: {graduationYear}
            </Text>
            <Text style="regular" size={20} color="aqua">
              Major: {major}
            </Text>
            <Text style="regular" size={20} color="aqua">
              Location: {location}
            </Text>
            <Text style="regular" size={20} color="aqua">
              Email: {email}
            </Text>
          </Card>
        </GridCol>
        <GridCol span={2}>
          <Box className="flex items-center gap-6 ml-10">
            <Text style="bold" size={72} color="black">
              {name}
            </Text>
            {roles.map((role) => 
            <Badge color="aqua" variant="default" className="mt-4 capitalize" key={roles.indexOf(role)}>
              {role}
            </Badge>
            )}
          </Box>
          <Text style="regular" size={16} color="black" className="mr-10 ml-10">
            {bio}
          </Text>
        </GridCol>
      </Grid>
      {hasArticles && 
      <Card color="white" className="shadow-xl flex justify-center">
        <Text style="underline" color="black" size={48}>
          Articles
        </Text>
      </Card> 
      }
    </Card>
  );
}
