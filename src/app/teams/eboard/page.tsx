'use client';

import React, { useState } from 'react';
import { Box } from '@/design-system/primitives/Box/Box';
import Text from '@/design-system/primitives/Text/Text';
import { TeamMember } from '@/design-system/components/TeamMember/TeamMember';
import { TeamMemberProps } from '@/design-system/components/TeamMember';
import { AboutUsHero } from '@/app/teams/components/AboutUsHero';
import Button from '@/design-system/primitives/Button';

export default function EboardPage() {
  const [activeTab, setActiveTab] = useState<'eboard' | 'editors'>('eboard');

  const eboard: TeamMemberProps[] = [
    {
      name: 'Aditi Swamy',
      pronouns: 'she/her',
      role: 'President',
      bio: "Aditi is a fourth year Behavioral Neuroscience major and Spanish minor on the pre-med track. She's been a member of NU Sci since her first semester at Northeastern, where she started as a writer. Aditi's passionate about making science accessible, and has loved the opportunity to translate new discoveries in STEM to reach the Northeastern community. Outside of conducting motor neuroscience research, Aditi loves to run, read, and crochet! ",
      graduationYear: 2027,
      major: 'Behavioral Neuroscience/Spanish',
      email: '@northeastern.edu',
      avatarUrl: '/headshots/aditi_headshot.jpg',
    },
    {
      name: 'Ella Hannes',
      pronouns: 'she/her',
      role: 'Treasurer',
      bio: '',
      graduationYear: 2026,
      major: 'Behavioral Neuroscience',
      email: '@northeastern.edu',
      avatarUrl: '/headshots/ella_headshot.jpg',
    },
    {
      name: 'Arushi Aggarwal',
      pronouns: 'she/her',
      role: 'Co-Head of Web & Software',
      bio: '',
      graduationYear: 2027,
      major: 'Computer Science',
      email: 'aggarwal.arus@northeastern.edu',
      avatarUrl: '/headshots/arushi_headshot.jpg',
    },
    {
      name: 'Ranya Jain',
      pronouns: 'she/her',
      role: 'Co-Head of Web & Software',
      bio: 'Ranya is a third-year Data Science and Ecology and Evolutionary Biology major at Northeastern. She joined NU Sci in Fall 2025 hoping to learn more about web development and found herself on the E-Board this semester as Co-Head of Software/Web Development. Ranya enjoys finding ways to bring data science and ecology together, especially to better understand marine environments. Outside of her work, she loves volunteering, diving, and spending time near the ocean.',
      graduationYear: 2028,
      major: 'Data Science & Ecology and Evolutionary Biology',
      email: '@northeastern.edu',
      avatarUrl: '/headshots/ranya_headshot.jpg',
    },

    {
      name: 'Laila',
      pronouns: 'she/her',
      role: 'Head of Photography',
      bio: '',
      graduationYear: 2026,
      major: '',
      email: '@northeastern.edu',
      avatarUrl: '/headshots/laila_headshot.jpg',
    },
    {
      name: 'Medha Gollamudi',
      pronouns: 'she/her',
      role: 'Head of Marketing & Outreach',
      bio: 'Being a part of NU Sci since my freshman year has been such a rewarding experience, especially being a part of such an amazing team of students. Through my role within the magazine, I have loved working on collaborative student STEM events, creative campus-wide marketing, and multimedia storytelling, specifically within the science field. Outside of school, I love hanging out with friends, and learning to cook new recipes!',
      graduationYear: 2027,
      major: 'Economics + Journalism (Data Science minor)',
      email: 'gollamudi.m@northeastern.edu',
      avatarUrl: '/headshots/medha_headshot.jpg',
    },
    {
      name: 'Aoife Jeffries',
      pronouns: 'she/her',
      role: 'Editor-in-Chief',
      bio: 'Aoife is a third-year in the PharmD program with minors in neuroscience and journalism. Passionate about science communication, she has been writing and editing for NU Sci since her first year at Northeastern. In her free time, Aoife enjoys playing guitar, running, traveling, playing soccer, and spending time with friends.',
      graduationYear: 2029,
      major: 'Pharmacy',
      email: 'jeffries.a@northeastern.edu',
      avatarUrl: '/headshots/aoife_headshot.jpg',
    },
    {
      name: 'Aditi Swamy',
      pronouns: 'she/her',
      role: 'Head of Communications',
      bio: "Aditi is a 3rd Behavioral Neuroscience Major and Spanish minor. She has been a member of NU Sci since her first semester at Northeastern, and has been a writer, editor, and is now on the E-Board. Aditi's passionate about research and has loved getting to share her interests with the Northeastern community as a part of this club. In her free time, she enjoys running, reading, and crocheting.",
      graduationYear: 2027,
      major: 'Behavioral Neuroscience',
      email: 'swamy.a@northeastern.edu',
      avatarUrl: '/headshots/aditi_headshot.jpg',
    },
    {
      name: 'Giulia Walker',
      pronouns: 'she/her',
      role: 'Co-Head of Design',
      bio: 'Giulia Walker is a fourth year studying design. She joined NU Sci during her second year to gain better understanding of editorial design. She completed her first coop working at The Boston Globe last spring designing for the Globe Magazine and for the daily paper. NU Sci combines a range of her interests including sustainability and the environment with creative fabrication. In her free time she loves to run and do yoga.',
      graduationYear: 2026,
      major: 'Design',
      email: 'walker.gi@northeastern.edu',
      avatarUrl: '/headshots/giulia_headshot.jpg',
    },
    {
      name: 'Anjana Balakrishnan',
      pronouns: 'she/her',
      role: 'Co-Head of Design',
      bio: 'Anjana is a fourth year studio art major with a passion for painting and graphic design. Her paintings focus on themes of family and tradition, and she frequently brings illustration into her graphic designs. In her free time, she loves reading, playing word games, and exploring the city.',
      graduationYear: 2027,
      major: 'Studio Art',
      email: 'balakrishnan.an@northeastern.edu',
      avatarUrl: '/headshots/anjana_headshot.jpg',
    },
  ];

  const editors: TeamMemberProps[] = [
    {
      name: 'Caroline Gable',
      pronouns: 'she/her',
      bio: 'Caroline is a fourth-year Health Science and Psychology combined major with a minor in Spanish. She has been a part of NU Sci since her first semester at Northeastern, as she has always thoroughly enjoyed writing since second grade. Caroline is passionate about the brain, health equity and education, and protecting and exploring nature. In her free time, she loves to read in the Common, hike throughout New England, and play basketball with friends!',
      graduationYear: 2026,
      major: 'Health Science & Psychology',
      email: '',
      avatarUrl: '/headshots/caroline_headshot.jpg',
    },
    {
      name: 'Mackenzie Heidkamp',
      pronouns: 'she/her',
      bio: "Mackenzie's involvement with NU Sci began the fall semester of her freshman year as a writer, and she is now in her third year as an editor. She loves combining her interests in writing and science! While as a pre-med student, health topics specifically interest her, she loves being able to read articles outside of her usual focus.",
      graduationYear: 2026,
      major: 'Biochemistry',
      email: '',
      avatarUrl: '/headshots/mackenzie_headshot.jpg',
    },
    {
      name: 'Ananya Arvind',
      pronouns: 'she/her',
      bio: "Ananya has been a member of NU SCI since her first year at Northeastern. NU SCI allows her to research interdisciplinary topics she's passionate about, while also helping other writers cultivate their skills. In her free time, Ananya loves to sing, read books, and travel.",
      graduationYear: 2027,
      major: 'Linguistics and Speech-Language Pathology and Audiology',
      email: '',
      avatarUrl: '/headshots/ananya_headshot.jpg',
    },
    {
      name: 'Cecelia Kincaid',
      pronouns: 'she/her',
      bio: "Cecelia is a third-year SLP student and has been with NU Sci since her first semester at Northeastern. She loves getting the chance to combine her passions for science and writing, and is interested in all things biology, neuroscience, and healthcare. In her free time, she's usually reading, watching a TV show, or playing piano.",
      graduationYear: 2027,
      major: 'Speech-Language Pathology & Audiology',
      email: '',
      avatarUrl: '/headshots/cecelia_headshot.jpg',
    },
    {
      name: 'Emily Xu',
      pronouns: 'she/her',
      bio: 'Emily has been a member of NU Sci since the start of her sophomore year. She is passionate about everything biology, psychology, and health medicine. NU Sci is a space for Emily to explore the topics she is passionate about and collaborate with her like-minded science writing enthusiasts. Post-college, she plans on continuing her education by studying dentistry. In her free time, Emily loves reading, eating, and creating art.',
      graduationYear: 2026,
      major: 'Behavioral Neuroscience',
      email: '',
      avatarUrl: '/headshots/emily_headshot.jpg',
    },
    {
      name: 'Sashi Nallapati',
      pronouns: 'she/her',
      bio: "Sashi is a fourth-year Chemistry student and began writing for NU Sci at the start of her second year at Northeastern. She loves reading everyone's articles and hopes to encourage scientific curiosity and communication. Outside of school, you can find her at a cafe, reading, watching a movie, or crafting.",
      graduationYear: 2026,
      major: 'Chemistry',
      email: '',
      avatarUrl: '/headshots/sashi_headshot.jpg',
    },
    {
      name: 'Danielle Jeong',
      pronouns: 'she/her',
      bio: 'Danielle is a second year chemical engineering major. She loves writing about the intersection of science and culture. Her hobbies include listening to music, playing volleyball, and traveling.',
      graduationYear: 2028,
      major: 'Chemical Engineering',
      email: '',
      avatarUrl: '/headshots/danielle_headshot.jpg',
    },
    {
      name: 'Saumya Sawant',
      pronouns: 'she/her',
      bio: 'Saumya is a second-year student majoring in Biochemistry and minoring in International Affairs. As a passionate writer with an interest in science communication and journalism, she joined NU Sci during her first semester at Northeastern in hopes of continuing to make science accessible to a wider audience. In her free time, she enjoys reading, creative writing, journaling, going on long walks, and listening to music.',
      graduationYear: 2028,
      major: 'Biochemistry',
      email: '',
      avatarUrl: '/headshots/saumya_headshot.jpg',
    },
    {
      name: 'Mikayla Tsai',
      pronouns: 'she/her',
      bio: 'Mikayla is a fourth-year Behavioral Neuroscience student, and began writing for the NU Sci since her sophomore year. She loves reading and writing articles pertaining to neural mechanisms, natural phenomena, and historical events. Outside of school, you can find her long-distance running, drinking matcha, and watching a good movie.',
      graduationYear: 2026,
      major: 'Behavioral Neuroscience',
      email: '',
      avatarUrl: '/headshots/mikayla_headshot.jpg',
    },
  ];

  const currentMembers = activeTab === 'eboard' ? eboard : editors;

  return (
    <Box className="min-h-screen bg-neutral/10">
      <AboutUsHero />

      <Box className="mx-auto max-w-6xl px-6 py-8">
        <Text size={36} style="bold" color="black" className="mb-4">
          Meet our team
        </Text>

        <Box className="flex gap-2 mb-8">
          <Button
            onClick={() => setActiveTab('eboard')}
            className={`px-6 py-3 rounded-full text-base font-medium transition-colors`}
            color={`${activeTab === 'eboard' ? 'black' : 'white'}`}
          >
            Executive Board
          </Button>
          <Button
            onClick={() => setActiveTab('editors')}
            className={`px-6 py-3 rounded-full text-base font-medium transition-colors`}
            color={`${activeTab === 'editors' ? 'black' : 'white'}`}
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
