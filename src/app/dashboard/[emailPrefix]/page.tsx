import Font from "@/design-system/primitives/Font";
import Card from "@/primitives/Card";
import { Flex } from "@/primitives/Flex";
import Text from "@/primitives/Text";
import { Roles } from "@/lib/types/types";
import { notFound } from "next/navigation";
import DashboardCard from "./components/dashboardCard";

interface PublicProfilePageProps {
  params: Promise<{ emailPrefix: string }>;
}

export default async function DashboardPage({
  params,
}: PublicProfilePageProps) {
  const { emailPrefix } = await params;
  let roles: Roles[] = [];

  //Note: the below is in place of an api call using emailPrefix to get data

  if (emailPrefix == "admin") {
    roles = [Roles.Admin];
  } else if (emailPrefix == "editor") {
    roles = [Roles.Editor];
  } else if (emailPrefix == "photo") {
    roles = [Roles.Photographer];
  } else {
    notFound();
  }

  return (
    <Flex className="h-screen w-full items-stretch justify-center bg-sage-green p-12 box-border" >
      <Card color="white" className="h-[80vh] w-full max-w-[95vw] shadow-2xl">
        <Card color="gray-light" className="max-w-7xl w-full shadow-2xl">
          <Font playfair-display>
            <Text size={30} mx={6} style="bold">
              Dashboard
            </Text>
          </Font>
        </Card>
        {roles.map((role) => {
          if (role == Roles.Admin) {
            return (
              <div className="grid grid-cols-4 gap-6">
            <DashboardCard text="Invite User" />
            <DashboardCard text="Approve Submission" />
            <DashboardCard text="Make An Article" />
            </div>
          );
          } else if (role == Roles.Editor) {
            return (
              <div className="grid grid-cols-4 gap-6">
            <DashboardCard text="Approve Submission" />
            <DashboardCard text="Create an Article" />
            </div>
          );
          } else if (role == Roles.Photographer) {
            return <DashboardCard text="Upload Photos" />;
          }
        })}
      </Card>
    </Flex>
  );
}
