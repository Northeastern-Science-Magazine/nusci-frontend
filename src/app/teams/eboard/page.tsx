"use client";

import React, { useState } from "react";
import { Box } from "@/design-system/primitives/Box/Box";
import Text from "@/design-system/primitives/Text/Text";
import { Divider } from "@/design-system/primitives/Divider/Divider";
import { TeamMember, TeamMemberProps } from "./components/TeamMember";
import Image from "@/primitives/Image";
import { OverlayMedia, Overlay } from "@/design-system/components/MediaOverlay";

export default function EboardPage() {
    const [activeTab, setActiveTab] = useState<"eboard" | "editors">("eboard");

    const eboardMembers: TeamMemberProps[] = [
        {
            name: "Reshika Sai Devarajan",
            pronouns: "She/Her",
            role: "President",
            bio: "Reshika Sai is a fourth-year health science major with a passion for science and a penchant for writing. NU Sci offered the perfect fusion of her interests, bridging the gap between her academic pursuits and creative expression. She has been an active member of the magazine since her first year and is now thrilled to serve as the magazine's president.",
            graduationYear: 2025,
            major: "Health Science",
            avatarUrl: "/headshots/reshika_headshot.jpg",
            profileSlug: "/someprofile",
        },
        {
            name: "Dessy Dusichka",
            pronouns: "She/Her",
            role: "Editor-in-Chief",
            bio: "Dessy is a fourth year studying computer science and biology. She joined NU Sci during her first year at Northeastern and loves having a creative outlet to learn about intriguing areas of science. She enjoys reading and writing about technology, medicine, and the environment (especially quirky animals).",
            graduationYear: 2025,
            major: "Computer Science & Biology",
            avatarUrl: "/headshots/dessy_headshot.jpg",
            profileSlug: "/someprofile",
        },
        {
            name: "Gabrielle Weiner",
            pronouns: "She/Her",
            role: "Treasurer",
            bio: "Gabrielle is a third year biology student who recently declared a pre-PA path, but loves anything related to the life sciences. She is joining E-board after a year of writing for NU Sci about molecular biology, evolution, and ecology.",
            graduationYear: 2026,
            major: "Biology",
            avatarUrl: "/headshots/gabrielle_headshot.jpg",
            profileSlug: "/someprofile",
        },
        {
            name: "Lily Garrett",
            pronouns: "She/Her",
            role: "Head of Communications",
            bio: "Lily is from the beautiful Pacific Northwest and spent most of her life on a lake right outside Portland, Oregon. She loves to wake surf, ski, run, cook, and paint. She is also passionate about science and medicine, and hopes to be a physician one day.",
            graduationYear: 2025,
            major: "Biochemistry",
            avatarUrl: "/headshots/lily_headshot.jpg",
            profileSlug: "/someprofile",
        },
        {
            name: "Raisa Bhuiyan",
            pronouns: "She/Her",
            role: "Co-Head of Web & Software",
            bio: "Raisa is a fourth-year Computer Science and Math major who has always been interested in technology and science. Raisa loves being a member of NU Sci because she can learn about various scientific disciplines while working on the website.",
            graduationYear: 2025,
            major: "Computer Science & Math",
            avatarUrl: "/headshots/raisa_headshot.jpg",
            profileSlug: "/someprofile",
        },
        {
            name: "Ethan Szeto",
            pronouns: "He/Him",
            role: "Co-Head of Web & Software",
            bio: "Ethan is a third year computer science and mathematics major from New Jersey. He first found his passion for computer science designing his own websites and games online. He now promotes education by teaching mathematics and computer science in hopes of inspiring others to change the world.",
            graduationYear: 2026,
            major: "Computer Science & Math",
            avatarUrl: "/headshots/ethan_headshot.jpg",
            profileSlug: "/someprofile",
        },
        {
            name: "Jasmin Patel",
            pronouns: "She/Her",
            role: "Co-Head of Design",
            bio: "Jasmin explores graphic design as a tool for vibrant, bold, and truthful visual communication. Coming from a background in behavioral neuroscience studies, Jasmin is highly interested in design from a human perception and experience perspective.",
            graduationYear: 2025,
            major: "Behavioral Neuroscience",
            avatarUrl: "/headshots/jasmin_headshot.jpg",
            profileSlug: "/someprofile",
        },
        {
            name: "Vianna Quach",
            pronouns: "She/Her",
            role: "Co-Head of Design",
            bio: "Vianna is a fourth year Pharmaceutical Sciences major from Portland, Oregon. She joined NU Sci in her first year as both a writer and designer. Vianna is an art enthusiast who wanted to explore the potential for the visual arts to intersect with science.",
            graduationYear: 2025,
            major: "Pharmaceutical Science",
            avatarUrl: "/headshots/vianna_headshot.jpg",
            profileSlug: "/someprofile",
        },
        {
            name: "Jiajia Fu",
            pronouns: "She/Her",
            role: "Head of Photography",
            bio: "Jiajia is a third year bioengineering major from NJ. She joined NU Sci in the fall of 2022 and has been an active writer and photographer since. Her passions lie in applying computational-bioengineering tools to ecological problems.",
            graduationYear: 2026,
            major: "Bioengineering",
            avatarUrl: "/headshots/jiajia_headshot.jpg",
            profileSlug: "/someprofile",
        },
        {
            name: "Tonia Curdas",
            pronouns: "She/Her",
            role: "Social Media Manager",
            bio: "Tonia is a fourth year biochemistry major. She developed an interest in science writing in high school and has been a member of NU Sci since her freshman year. In her free time, she enjoys reading fantasy and literary fiction, crocheting, and listening to her many many Spotify playlists.",
            graduationYear: 2025,
            major: "Biochemistry",
            avatarUrl: "/headshots/tonia_headshot.jpg",
            profileSlug: "/someprofile",
        },
        {
            name: "Medha Gollamudi",
            pronouns: "She/Her",
            role: "Head of Outreach",
            bio: "Medha Gollamudi is a sophomore at Northeastern. She's majoring in Journalism and Economics with a minor in Data Science. She loves cooking, spending time with her family and friends, and traveling!",
            graduationYear: 2027,
            major: "Journalism & Economics",
            avatarUrl: "/headshots/medha_headshot.jpg",
            profileSlug: "/someprofile",
        },
    ];

    const editorMembers: TeamMemberProps[] = [
        {
            name: "Aditi Swamy",
            pronouns: "She/Her",
            bio: "Aditi is a second-year behavioral neuroscience major with a minor in Spanish. She has been a member of NU Sci since her first semester at Northeastern, and has since fallen in love with science communication. She enjoys writing articles about medicine, health, neuroscience, and biology.",
            graduationYear: 2027,
            major: "Behavioral Neuroscience",
            avatarUrl: "/headshots/aditi_headshot.jpg",
            profileSlug: "/someprofile",
        },
        {
            name: "Aoife Jeffries",
            pronouns: "She/Her",
            bio: "Aoife is a second-year behavioral neuroscience and data science major. She is minoring in journalism, so she loves the combination of writing and science that NU Sci provides. In her free time, she enjoys playing soccer, listening to music, and spending time outdoors.",
            graduationYear: 2027,
            major: "Behavioral Neuroscience & Data Science",
            avatarUrl: "/headshots/aoife_headshot.jpg",
            profileSlug: "/someprofile",
        },
        {
            name: "Sashi Nallapati",
            pronouns: "She/Her",
            bio: "Sashi is a third-year Chemistry student and began writing for NU Sci at the start of her second year at Northeastern. Having never considered herself a writer, NU Sci helped to cultivate her writing skills and provided an outlet for amplifying scientific curiosity. She hopes to extend the same service to other writers as well. Sashi likes to read about all scientific fields but is partial to the fields of chemistry, physics, environmental science, and math.",
            graduationYear: 2026,
            major: "Chemistry",
            avatarUrl: "/headshots/sashi_headshot.jpg",
            profileSlug: "/someprofile",
        },
        {
            name: "Sai Tummala",
            pronouns: "She/Her",
            bio: "Sai has been a member on NU Sci since her first semester. She is a pre-medical student and is passionate about medicine, health equity, and the environment. She loves being able to express her scientific interests through writing. In her free time, she loves trying new food, wandering around Boston, and trying to keep her houseplants alive!",
            graduationYear: 2026,
            major: "Cell & Molecular Biology",
            avatarUrl: "/headshots/sai_headshot.jpg",
            profileSlug: "/someprofile",
        },
        {
            name: "Cecelia Kincaid",
            pronouns: "She/Her",
            bio: "Cecelia is a second-year student and has been with NU Sci since her first semester at Northeastern. NU Sci is a great way to combine her interests in writing and science, and she loves having the opportunity to publish what she's passionate about. In her free time, Cecelia enjoys playing piano, reading, and traveling.",
            graduationYear: 2027,
            major: "Speech-Language Pathology & Audiology",
            avatarUrl: "/headshots/cecelia_headshot.jpg",
            profileSlug: "/someprofile",
        },
        {
            name: "Emily Xu",
            pronouns: "She/Her",
            bio: "Emily has been a member of NU Sci since the beginning of her sophomore year. She is passionate about everything biology, neuroscience, and healthcare. NU Sci is a space for Emily to explore the topics she is passionate about and collaborate with her like-minded science writing enthusiasts. Post-college, she plans on continuing her education by studying dentistry. In her free time, Emily loves reading, eating, and creating art, especially working with textiles.",
            graduationYear: 2026,
            major: "Behavioral Neuroscience",
            avatarUrl: "/headshots/emily_headshot.jpg",
            profileSlug: "/someprofile",
        },
        {
            name: "Lilly Schar",
            pronouns: "She/Her",
            bio: "Lilly is a fourth year History, Culture, & Law major with a minor in Biology. She has been writing for NU Sci since her first semester at Northeastern and editing since her second. She enjoys the interdisciplinary topics she explores and keeping her curiosity piqued by reading other student articles.",
            graduationYear: 2025,
            major: "History, Culture, & Law",
            avatarUrl: "/headshots/lillian_headshot.jpg",
            profileSlug: "/someprofile",
        },
        {
            name: "Reshika Sai Devarajan",
            pronouns: "She/Her",
            bio: "Reshika Sai is a fourth-year health science major with a passion for science and a penchant for writing. NU Sci offered the perfect fusion of her interests, bridging the gap between her academic pursuits and creative expression. She has been an active member of the magazine since her first year and is now thrilled to serve as the magazine's president. When she's not delving into the mysteries of the human body within the pages of her textbooks, you can often find her engrossed in reading, writing, or experimenting in the kitchen. Reshika Sai is enthusiastic about her continued journey with NU Sci and is eager to foster a strong sense of community within the magazine this academic year. Her goal is for the NU Sci team to create interdisciplinary publications that inspire curiosity and ignite intellectual discussions.",
            graduationYear: 2025,
            major: "Health Science",
            avatarUrl: "/headshots/reshika_headshot.jpg",
            profileSlug: "/someprofile",
        },
        {
            name: "Aanchalika Chauhan",
            pronouns: "She/Her",
            bio: "Aanchalika is a fourth year behavioral neuroscience major with a minor in women's gender and sexuality studies. She has been a NU Sci member since her first year at Northeastern. She enjoys the flexibility of her major and is interested in the intersection between neurology and women's health. In her free time, you can find her crocheting, trying Pinterest recipes, or exploring Boston for new cafes.",
            graduationYear: 2025,
            major: "Behavioral Neuroscience",
            avatarUrl: "/headshots/aanchalika_headshot.jpg",
            profileSlug: "/someprofile",
        },
        {
            name: "Ananya Jain",
            pronouns: "She/Her",
            bio: "Ananya has been a member of NU Sci since her first year at Northeastern, and she cherishes the club for making a space for her to write, edit, and design. She's passionate about topics concerning neuroscience, medicine, health, astronomy, and discussions of ethics in science. She hopes to become a physician and continue to share her excitement for science and art with the world. In her free time she loves to watch Bollywood movies and crochet.",
            graduationYear: 2025,
            major: "Behavioral Neuroscience",
            avatarUrl: "/headshots/ananya_headshot.jpg",
            profileSlug: "/someprofile",
        },
        {
            name: "Caroline Gable",
            pronouns: "She/Her",
            bio: "Caroline is a third-year Health Science and Psychology combined major with a minor in Spanish. She has been a part of NU Sci since her first semester at Northeastern, as she has always thoroughly enjoyed writing since second grade. Caroline is passionate about the brain, health equity and education, cultural intelligence, and bumblebees! In her free time, she loves to learn languages, read, hike, and eat sushi.",
            graduationYear: 2026,
            major: "Health Science & Psychology",
            avatarUrl: "/headshots/caroline_headshot.jpg",
            profileSlug: "/someprofile",
        },
        {
            name: "Divya Ravikumar",
            pronouns: "She/Her",
            bio: "Divya has been a member of NU Sci since the beginning of her first year at Northeastern. She loves being able to explore different topics through NU Sci, especially related to astronomy and psychology. Her free time is filled with reading, watching TV shows, and cooking.",
            graduationYear: 2025,
            major: "Bioengineering and Biochemistry",
            avatarUrl: "/headshots/divya_headshot.jpg",
            profileSlug: "/someprofile",
        },
        {
            name: "Mackenzie Heidkamp",
            pronouns: "She/Her",
            bio: "Mackenzie has been involved in NU Sci since her first semester. She loves that she can combine her passions for both writing and science. She is a pre-medical student and is really interested in any topic relating to health, biology, chemistry, and psychology.",
            graduationYear: 2026,
            major: "Biochemistry",
            avatarUrl: "/headshots/mackenzie_headshot.jpg",
            profileSlug: "/someprofile",
        },
        {
            name: "Maggie Eid",
            pronouns: "She/Her",
            bio: "Maggie is a fourth year environmental and sustainability sciences student with a minor in biology. She enjoys the interdisciplinary nature of her major, especially the intersections of science and social justice. She is passionate about building a sustainable future for our planet through community-based initiatives. In her free time, she loves to spend time outdoors, particularly walking and hiking.",
            graduationYear: 2025,
            major: "Environmental & Sustainability Sciences",
            avatarUrl: "/headshots/maggie_headshot.jpg",
            profileSlug: "/someprofile",
        },
        {
            name: "Maya Brinster",
            pronouns: "She/Her",
            bio: "Maya Brinster is a third-year behavioral neuroscience major with a minor in music. She began writing for NU Sci at the start of her first year and became an editor at the beginning of 2023. NU Sci is the perfect way for Maya to combine her passions for writing and reading about current events in practically any scientific field, especially those related to medicine and biology. In her free time, she loves to play piano and explore new places and restaurants in Boston with her friends.",
            graduationYear: 2026,
            major: "Behavioral Neuroscience",
            avatarUrl: "/headshots/maya_headshot.jpg",
            profileSlug: "/someprofile",
        },
        {
            name: "Sophie Donner",
            pronouns: "She/Her",
            bio: "Sophie is a fourth-year environmental and sustainability sciences student. She is grateful that NU Sci provides the opportunity to communicate the environmental issues and research she is most passionate about. Outside of her studies she enjoys silversmithing, hiking, and walking on the beach.",
            graduationYear: 2025,
            major: "Environmental & Sustainability Sciences",
            avatarUrl: "/headshots/sophia_headshot.jpg",
            profileSlug: "/someprofile",
        },
    ];

    const currentMembers = activeTab === "eboard" ? eboardMembers : editorMembers;

    return (
        <Box className="min-h-screen bg-neutral/10">
            <OverlayMedia className="w-full relative overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        raw
                        src="/icy.png"
                        alt="Icy pine needles with icicles background"
                        width="w-full"
                    />
                </div>

                <Overlay background="solid-black" className="relative">
                    {/* TODO: how to properly make overlay relative? */}
                    <Box className="mx-auto max-w-6xl px-6 py-16">
                        <Text size={48} style="bold" color="white" className="mb-4">
                            About NU Sci
                        </Text>
                        <Text color="white" className="text-base tablet:text-base laptop:text-lg max-w-3xl leading-relaxed mb-8">
                            NU Sci is Northeastern's student-run, student-written science magazine. We publish
                            with the goal of informing our audience of the wonders of human discovery and
                            progress in the world around us. Our magazine seeks to disseminate the latest
                            information about science news, whether at the microscopic level or in the deepest
                            reaches of space, in a simple and universally accessible format, bringing to our
                            readers clear, high-quality, and well-researched journalism with an open mind and a
                            sense of humor. We believe that when removed from a bland textbook format, science
                            can be not only a field to discuss, but also something by which to be continually
                            astounded and inspired.
                        </Text>
                    </Box>
                </Overlay>
            </OverlayMedia>

            <Box className="mx-auto max-w-6xl px-6 py-8">
                <Text size={36} style="bold" color="black" className="mb-4">
                    Meet our team
                </Text>

                <Box className="flex gap-2 mb-8">
                    <button
                        onClick={() => setActiveTab("eboard")}
                        className={`px-6 py-3 rounded-full text-base font-medium transition-colors ${
                            activeTab === "eboard"
                                ? "bg-black text-white"
                                : "bg-white text-black border border-black/20 hover:border-black/40 hover:bg-neutral/10"
                        }`}
                    >
                        Executive Board
                    </button>
                    <button
                        onClick={() => setActiveTab("editors")}
                        className={`px-6 py-3 rounded-full text-base font-medium transition-colors ${
                            activeTab === "editors"
                                ? "bg-black text-white"
                                : "bg-white text-black border border-black/20 hover:border-black/40 hover:bg-neutral/10"
                        }`}
                    >
                        Editors
                    </button>
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
                            profileSlug={member.profileSlug}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
}