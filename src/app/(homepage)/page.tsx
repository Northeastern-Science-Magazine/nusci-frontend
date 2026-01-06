import Hero from "./components/Hero";
import PrintMagazines from "./components/PrintMagazines";
import FeaturedArticles from "./components/FeaturedArticles";
import { getUserRoles } from "@/lib/helpers/getUserRoles";
import CTA from "./components/CTA";

export default async function Homepage() {
  const roles = await getUserRoles();
  console.log(roles);
  return (
    <main>
      <Hero />
      <PrintMagazines />
      <FeaturedArticles />
      <CTA />
    </main>
  );
}
