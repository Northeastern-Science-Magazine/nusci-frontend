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
      email: 'swamy.a@northeastern.edu',
      avatarUrl: '/headshots/aditi_headshot.jpg',
    },
    {
      name: 'Ella Hannes',
      pronouns: 'she/her',
      role: 'Treasurer',
      bio: 'Ella is a third year student from Wisconsin. She has been writing for NU Sci for a year and authors the Science in Conversation interview column. She enjoys writing about developments in immunology, genetics, and other biology topics. Ella is also the Treasurer of NU Sci as well as being involved with the Biotech Club and an HIV prevention group on campus.',
      graduationYear: 2028,
      major: 'Cell & Molecular Biology',
      email: '@northeastern.edu',
      avatarUrl: '/headshots/ella_headshot.jpeg',
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
      avatarUrl: '/headshots/ranya_headshot.jpeg',
    },

    {
      name: 'Laila Copeland',
      pronouns: 'she/her',
      role: 'Head of Photography',
      bio: 'Laila is a second-year cell & molecular biology major from NYC. Excited by the intersection of scientific literacy with arts and culture, she joined NU Sci as a freshman. Along with being Head of Photography, she also writes and edits for the magazine. In her free time, Laila enjoys triathlon training, cooking, art museums, and a good book. ',
      graduationYear: 2029,
      major: 'Cell & Molecular Biology',
      email: 'copeland.la@northeastern.edu',
      avatarUrl: '/headshots/laila_headshot.jpeg',
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
      bio: 'Aoife is a fourth-year in the PharmD program with minors in neuroscience and journalism. Passionate about science communication, she has been writing and editing for NU Sci since her first year at Northeastern. In her free time, Aoife enjoys playing guitar, running, traveling, playing soccer, and spending time with friends.',
      graduationYear: 2029,
      major: 'Pharmacy',
      email: 'jeffries.a@northeastern.edu',
      avatarUrl: '/headshots/aoife_headshot.jpg',
    },
    {
      name: 'Raina Langlais',
      pronouns: 'she/her',
      role: 'Head of Communications',
      bio: 'Raina is a 2nd year Cell and Molecular Biology major with a minor in Chemistry. She joined NU Sci her first semester as a writer, and loves be able to express her love of science creatively. Outside of NU Sci she enjoys spending time in the lab, crocheting, and watching movies with her friends!',
      graduationYear: 2029,
      major: 'Cell and Molecular Biology',
      email: 'langlais.r@northeastern.edu',
      avatarUrl: '/headshots/raina_headshot.jpg',
    },
    {
      name: 'Anjana Balakrishnan',
      pronouns: 'she/her',
      role: 'Co-Head of Design',
      bio: 'Anjana is a fifth year studio art major with a passion for painting and graphic design. Her paintings focus on themes of family and tradition, and she frequently brings illustration into her graphic designs. Anjana has is In her free time, she loves reading, playing word games, and exploring the city.',
      graduationYear: 2027,
      major: 'Studio Art',
      email: 'balakrishnan.an@northeastern.edu',
      avatarUrl: '/headshots/anjana_headshot.jpg',
    },
    {
      name: 'Candice Medina',
      pronouns: 'she/her',
      role: 'Co-Head of Design',
      bio: "Candice is a fifth-year student studying mechanical engineering with a minor in physics. After redesigning her high school newspaper's layout, she wanted to try magazine design in college. NU Sci combines her interest in science and research with a creative outlet and a chance to explore other STEM areas of interest.",
      graduationYear: 2026,
      major: 'Mechanical Engineering',
      email: 'medina.ca@northeastern.edu',
      avatarUrl: '/headshots/candice_headshot.jpg',
    },
  ];

  const editors: TeamMemberProps[] = [
    {
      name: 'Ananya Arvind',
      pronouns: 'she/her',
      bio: 'Ananya has been a member of NU Sci since her first year at Northeastern. She enjoys researching interdisciplinary topics while also helping other writers cultivate their skills! In her free time, Ananya loves to sing, read books, and travel.',
      graduationYear: 2027,
      major: 'Linguistics and Speech-Language Pathology and Audiology',
      email: '',
      avatarUrl: '/headshots/ananya_headshot.jpg',
    },
    {
      name: 'Cecelia Kincaid',
      pronouns: 'she/her',
      bio: "Cecelia is a 4th year SLP student and has been with NU Sci since her first semester at Northeastern. She loves getting the chance to combine her passions for science and writing, and is interested in all things neuroscience, biology, and healthcare. In her free time, she's usually reading, watching a TV show, or playing piano.",
      graduationYear: 2027,
      major: 'Speech-Language Pathology & Audiology',
      email: '',
      avatarUrl: '/headshots/cecelia_headshot.jpg',
    },
    {
      name: 'Heidi Ho',
      pronouns: 'she/her',
      bio: 'Heidi Ho is a 4th year public health and journalism major passionate about science, storytelling and social justice. In her free time, she can be seen dancing, trying new foods and playing the piano.',
      graduationYear: 2027,
      major: 'Public health and journalism ',
      email: '',
      avatarUrl: '/headshots/heidi_headshot.jpeg',
    },
    {
      name: 'Nina Zheng',
      pronouns: 'she/her',
      bio: 'Nina is a 2nd year Behavioral Neuroscience Major on the Pre-Med Track. She wrote for NU Sci since the second semester of her freshmen year and is now an editor for the team. Outside of NU Sci, Nina is on the e-board for the Northeastern Chapter of American Medical Women Association (AMWA) and in 3 different research positions. In her free time, Nina loves to go to concerts, play her guitar, listen to music and hang out with friends.',
      graduationYear: 2029,
      major: 'Behavioral Neuroscience',
      email: '',
      avatarUrl: '/headshots/nina_headshot.jpg',
    },
    {
      name: 'Angalina Cox',
      pronouns: 'she/her',
      bio: 'Angie is a third year student at Northeastern studying Cell and Molecular Biology with a minor in behavioral neuroscience on the pre-medical track. She joined NUSci her freshman year and has been writing for the magazine since! This fall, she has become an editor, collaborating with her peers to publish meaningful and exciting work. Her interests include applied neurobiology, women’s health, and the connection between science and culture.',
      graduationYear: 2028,
      major: 'Cell and molecular biology',
      email: '',
      avatarUrl: '/headshots/angalina_headshot.jpeg',
    },
    {
      name: 'Kaashyap Balaji',
      pronouns: 'He/Him',
      bio: "Kaashyap is a Junior in the Behavioral Neuroscience program. He has been involved with NU Sci for writing since his freshman year, and began editing in his sophomore year. Within NU Sci's broad range of topics, he is primarily focused on neuroscience, linguistics, medicine/health, and music. Kaashyap loves to read, travel, and sing.",
      graduationYear: 2028,
      major: 'Behavioral Neuroscience',
      email: '',
      avatarUrl: '/headshots/kaashyap_headshot.jpg',
    },
    {
      name: 'Olivia Muller-Juez',
      pronouns: 'she/her',
      bio: 'Olivia is a third-year Biochemistry student with a minor in Philosophy. She joined NU Sci in her freshman year and loves writing about everything from monkey urination to organoid development. Outside of the magazine, she loves hiking, reading, and embroidering. ',
      graduationYear: 2028,
      major: 'Biochemistry',
      email: '',
      avatarUrl: '/headshots/olivia_headshot.jpeg',
    },
    {
      name: 'Nabia Crawford',
      pronouns: 'she/her',
      bio: 'Nabia is a third-year chemistry major with a minor in Italian and has been a member of NU Sci since her sophomore year at Northeastern. She enjoys both writing and reading about all things science, with a focus on environmental science, biochemistry, and psychology. In her free time, she enjoys reading, hiking, beekeeping, and playing the viola!',
      graduationYear: 2028,
      major: 'Chemistry',
      email: '',
      avatarUrl: '/headshots/nabia_headshot.jpg',
    },
    {
      name: 'Marina Iannacito',
      pronouns: 'she/her',
      bio: "Marina is third-year biology student and has been a member of NU Sci since her sophomore year. She loves reading everyone's articles and enjoys the combination of science and writing. Marina is especially drawn to writing about health, medicine, and psychology. In her free time, she likes trying new foods, traveling, and crafting.",
      graduationYear: 2028,
      major: 'Biology',
      email: '',
      avatarUrl: '/headshots/marina_headshot.JPG',
    },
    {
      name: 'Saumya Sawant',
      pronouns: 'she/her',
      bio: "Saumya is a third-year student majoring in Biochemistry and minoring in History & International Affairs who joined NU Sci during her first semester at Northeastern in hopes of continuing to make science accessible to a wider audience. In particular, she's drawn to work that treats science as inseparable from its social and historical context. In her free time, she enjoys creative writing, junk journaling, and reading thrillers. ",
      graduationYear: 2028,
      major: 'Biochemistry',
      email: '',
      avatarUrl: '/headshots/saumya_headshot.jpg',
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
