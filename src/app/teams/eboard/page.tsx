"use client";

import React, { useState } from "react";
import { Box } from "@/design-system/primitives/Box/Box";
import Text from "@/design-system/primitives/Text/Text";
import { TeamMember } from "@/design-system/components/TeamMember/TeamMember";
import { TeamMemberProps } from "@/design-system/components/TeamMember";
import { AboutUsHero } from "@/app/teams/components/AboutUsHero";
import Button from "@/design-system/primitives/Button";

export default function EboardPage() {
    const [activeTab, setActiveTab] = useState<"eboard" | "editors">("eboard");

    const eboard: TeamMemberProps[] = [
        {
            name: "Gabrielle Weiner",
            pronouns: "she/her",
            role: "President",
            bio: "Gabrielle is a fourth-year biology student on the pre-PA track. She's been with NU Sci since her second semester at Northeastern, starting as a writer and working her way up to president! Gabrielle loves NU Sci for the way that it allows her to combine her background in science with her passion for literature and creativity. Aside from studying anatomy (her favorite subject!) and working as a nursing assistant, she enjoys watercolor painting, pilates, and snuggling with her pet cat, Heidi.",
            graduationYear: 2026,
            major: "Biology",
            email: "jdoe@example.com",
            avatarUrl: "/headshots/gabrielle_headshot.jpg",
        },
        {
            name: "Sasha Volkova",
            pronouns: "she/her",
            role: "Treasurer",
            bio: "Sasha is a fourth-year student studying Behavioral Neuroscience and Biochemistry, with a strong interest in the brain–body connection. She recently joined NU Sci's E-board as Treasurer after two years of writing, covering topics in health science, biology, and neuroscience. Outside of NUSci, Sasha is also a member of Noreste Ballet Co. and the Women's Research Engagement Network (WREN). In her free time, she enjoys creating (and supporting) art, practicing yoga, and spending time outdoors.",
            graduationYear: 2026,
            major: "Behavioral Neuroscience",
            email: "jdoe@example.com",
            avatarUrl: "/headshots/sasha_headshot.jpg",
        },
        {
            name: "Arushi Aggarwal",
            pronouns: "she/her",
            role: "Co-Head of Web & Software",
            bio: "",
            graduationYear: 2027,
            major: "Computer Science (Robotics minor)",
            email: "jdoe@example.com",
            avatarUrl: "/headshots/arushi_headshot.jpg",
        },
        {
            name: "Ethan Szeto",
            pronouns: "he/him",
            role: "Co-Head of Web & Software",
            bio: "Ethan is a third year computer science and mathematics major from New Jersey. He first found his passion for computer science designing his own websites and games online. He now promotes education by teaching mathematics and computer science in hopes of inspiring others to change the world.",
            graduationYear: 2026,
            major: "Computer Science & Math",
            email: "jdoe@example.com",
            avatarUrl: "/headshots/ethan_headshot.jpg",
        },

        {
            name: "JiaJia Fu",
            pronouns: "she/her",
            role: "Head of Photography",
            bio: "JiaJia is a 4th year bioengineering major from NJ. She joined NU Sci in the fall of 2022 and has been an active writer and Head of Photography since. Her passions lie in applying computational-bioengineering tools and protein design to ecological problems. In her free time, JiaJia goes on compulsive nature hikes, city wandering adventures, reading and watching Star Trek.",
            graduationYear: 2026,
            major: "Bioengineering",
            email: "jdoe@example.com",
            avatarUrl: "/headshots/jiajia_headshot.jpg",
        },
        {
            name: "Medha Gollamudi",
            pronouns: "she/her",
            role: "Head of Marketing & Outreach",
            bio: "Being a part of NU Sci since my freshman year has been such a rewarding experience, especially being a part of such an amazing team of students. Through my role within the magazine, I have loved working on collaborative student STEM events, creative campus-wide marketing, and multimedia storytelling, specifically within the science field. Outside of school, I love hanging out with friends, and learning to cook new recipes!",
            graduationYear: 2027,
            major: "Economics + Journalism (Data Science minor)",
            email: "jdoe@example.com",
            avatarUrl: "/headshots/medha_headshot.jpg",
        },
        {
            name: "Aoife Jeffries",
            pronouns: "she/her",
            role: "Editor-in-Chief",
            bio: "Aoife is a third-year in the PharmD program with minors in neuroscience and journalism. Passionate about science communication, she has been writing and editing for NU Sci since her first year at Northeastern. In her free time, Aoife enjoys playing guitar, running, traveling, playing soccer, and spending time with friends.",
            graduationYear: 2029,
            major: "Pharmacy",
            email: "jdoe@example.com",
            avatarUrl: "/headshots/aoife_headshot.jpg",
        },
        {
            name: "Aditi Swamy",
            pronouns: "she/her",
            role: "Head of Communications",
            bio: "Aditi is a 3rd Behavioral Neuroscience Major and Spanish minor. She has been a member of NU Sci since her first semester at Northeastern, and has been a writer, editor, and is now on the E-Board. Aditi's passionate about research and has loved getting to share her interests with the Northeastern community as a part of this club. In her free time, she enjoys running, reading, and crocheting.",
            graduationYear: 2027,
            major: "Behavioral Neuroscience",
            email: "jdoe@example.com",
            avatarUrl: "/headshots/aditi_headshot.jpg",
        },
        {
            name: "Giulia Walker",
            pronouns: "she/her",
            role: "Co-Head of Design",
            bio: "Giulia Walker is a fourth year studying design. She joined NU Sci during her second year to gain better understanding of editorial design. She completed her first coop working at The Boston Globe last spring designing for the Globe Magazine and for the daily paper. NU Sci combines a range of her interests including sustainability and the environment with creative fabrication. In her free time she loves to run and do yoga.",
            graduationYear: 2026,
            major: "Design",
            email: "jdoe@example.com",
            avatarUrl: "/headshots/giulia_headshot.jpg",
        },
        {
            name: "Anjana Balakrishnan",
            pronouns: "she/her",
            role: "Co-Head of Design",
            bio: "Anjana is a fourth year studio art major with a passion for painting and graphic design. Her paintings focus on themes of family and tradition, and she frequently brings illustration into her graphic designs. In her free time, she loves reading, playing word games, and exploring the city.",
            graduationYear: 2027,
            major: "Studio Art",
            email: "jdoe@example.com",
            avatarUrl: "/headshots/anjana_headshot.jpg",
        },
    ];

    const editors: TeamMemberProps[] = [
        {
            name: "Caroline Gable",
            pronouns: "she/her",
            bio: "Caroline is a fourth-year Health Science and Psychology combined major with a minor in Spanish. She has been a part of NU Sci since her first semester at Northeastern, as she has always thoroughly enjoyed writing since second grade. Caroline is passionate about the brain, health equity and education, and protecting and exploring nature. In her free time, she loves to read in the Common, hike throughout New England, and play basketball with friends!",
            graduationYear: 2026,
            major: "Health Science & Psychology",
            email: "jdoe@example.com",
            avatarUrl: "/headshots/caroline_headshot.jpg",
        },
        {
            name: "Mackenzie Heidkamp",
            pronouns: "she/her",
            bio: "Mackenzie's involvement with NU Sci began the fall semester of her freshman year as a writer, and she is now in her third year as an editor. She loves combining her interests in writing and science! While as a pre-med student, health topics specifically interest her, she loves being able to read articles outside of her usual focus.",
            graduationYear: 2026,
            major: "Biochemistry",
            email: "jdoe@example.com",
            avatarUrl: "/headshots/mackenzie_headshot.jpg",
        },
        {
            name: "Ananya Arvind",
            pronouns: "she/her",
            bio: "Ananya has been a member of NU SCI since her first year at Northeastern. NU SCI allows her to research interdisciplinary topics she's passionate about, while also helping other writers cultivate their skills. In her free time, Ananya loves to sing, read books, and travel.",
            graduationYear: 2027,
            major: "Linguistics and Speech-Language Pathology and Audiology",
            email: "jdoe@example.com",
            avatarUrl: "/headshots/ananya_headshot.jpg",
        },
        {
            name: "Cecelia Kincaid",
            pronouns: "she/her",
            bio: "Cecelia is a third-year SLP student and has been with NU Sci since her first semester at Northeastern. She loves getting the chance to combine her passions for science and writing, and is interested in all things biology, neuroscience, and healthcare. In her free time, she's usually reading, watching a TV show, or playing piano.",
            graduationYear: 2027,
            major: "Speech-Language Pathology & Audiology",
            email: "jdoe@example.com",
            avatarUrl: "/headshots/cecelia_headshot.jpg",
        },
        {
            name: "Emily Xu",
            pronouns: "she/her",
            bio: "Emily has been a member of NU Sci since the start of her sophomore year. She is passionate about everything biology, psychology, and health medicine. NU Sci is a space for Emily to explore the topics she is passionate about and collaborate with her like-minded science writing enthusiasts. Post-college, she plans on continuing her education by studying dentistry. In her free time, Emily loves reading, eating, and creating art.",
            graduationYear: 2026,
            major: "Behavioral Neuroscience",
            email: "jdoe@example.com",
            avatarUrl: "/headshots/emily_headshot.jpg",
        },
        {
            name: "Sashi Nallapati",
            pronouns: "she/her",
            bio: "Sashi is a fourth-year Chemistry student and began writing for NU Sci at the start of her second year at Northeastern. She loves reading everyone's articles and hopes to encourage scientific curiosity and communication. Outside of school, you can find her at a cafe, reading, watching a movie, or crafting.",
            graduationYear: 2026,
            major: "Chemistry",
            email: "jdoe@example.com",
            avatarUrl: "/headshots/sashi_headshot.jpg",
        },
        {
            name: "Danielle Jeong",
            pronouns: "she/her",
            bio: "Danielle is a second year chemical engineering major. She loves writing about the intersection of science and culture. Her hobbies include listening to music, playing volleyball, and traveling.",
            graduationYear: 2028,
            major: "Chemical Engineering",
            email: "jdoe@example.com",
            avatarUrl: "/headshots/danielle_headshot.jpg",
        },
        {
            name: "Saumya Sawant",
            pronouns: "she/her",
            bio: "Saumya is a second-year student majoring in Biochemistry and minoring in International Affairs. As a passionate writer with an interest in science communication and journalism, she joined NU Sci during her first semester at Northeastern in hopes of continuing to make science accessible to a wider audience. In her free time, she enjoys reading, creative writing, journaling, going on long walks, and listening to music.",
            graduationYear: 2028,
            major: "Biochemistry",
            email: "jdoe@example.com",
            avatarUrl: "/headshots/saumya_headshot.jpg",
        },
    ];

    const currentMembers = activeTab === "eboard" ? eboard : editors;

    return (
        <Box className="min-h-screen bg-neutral/10">
            <AboutUsHero/>

            <Box className="mx-auto max-w-6xl px-6 py-8">
                <Text size={36} style="bold" color="black" className="mb-4">
                    Meet our team
                </Text>

                <Box className="flex gap-2 mb-8">
                    <Button
                        onClick={() => setActiveTab("eboard")}
                        className={`px-6 py-3 rounded-full text-base font-medium transition-colors`}
                        color={`${activeTab === "eboard" ? "black" : "white"}`}
                    >
                        Executive Board
                    </Button>
                    <Button
                        onClick={() => setActiveTab("editors")}
                        className={`px-6 py-3 rounded-full text-base font-medium transition-colors`}
                        color={`${activeTab === "editors" ? "black" : "white"}`}
                    >
                        Editors
                    </Button>
                </Box>

                <Box className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {currentMembers.map((member, index) => (
                        <TeamMember
                            key={`${activeTab}-${index}`}
                            name={member.name}
                            pronouns={member.pronouns}
                            role={member.role}
                            bio={member.bio}
                            graduationYear={member.graduationYear}
                            major={member.major}
                            email={member.email}
                            avatarUrl={member.avatarUrl}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
}