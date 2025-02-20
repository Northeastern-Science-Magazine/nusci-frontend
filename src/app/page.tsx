import Card from "@/components/Card";

export default function Home() {
  return (
    <main>
      <p>Welcome to the home page!</p>
      {/* Here is a test card that will showcase the look for my card */}
      <Card imageURL="/logo.png" teamTitle="Web and Software" teamDescription=" The web & software team creates and maintains the current website. The team teaches its members important web development concepts and industry standards while producing software that benefits all other teams."></Card>
    </main>
  );
}
