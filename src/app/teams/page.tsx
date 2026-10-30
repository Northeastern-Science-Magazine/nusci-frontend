import { Box } from '@/design-system/primitives/Box/Box';
import Text from '@/design-system/primitives/Text/Text';
import { AboutUsHero } from '@/app/teams/components/AboutUsHero';
import MediaCard from '@/components/MediaCard';
import React from 'react';

export interface TeamProps {
  name: string;
  description: string;
  imageUrl: string;
}

export default function TeamsPage() {
  const teams: TeamProps[] = [
    {
      name: 'Writing',
      description:
        'NU Sci writers complete thorough research to produce accurate and engaging science writing. They develop topic ideas, read academic literature, and work with editors to produce polished final drafts for publication.',
      imageUrl: '/succulent.png',
    },
    {
      name: 'Design',
      description:
        'The design team brings every article to life in print. Designers use Adobe InDesign to visually communicate the stories, following an established style guide to create a cohesive themed identity throughout each issue. No prior design experience is needed: anyone interested is welcome to join the team.',
      imageUrl: '/eclipse-image.png',
    },
    {
      name: 'Editing',
      description:
        'The editing team works with writers to polish their drafts for publication. Editors provide guidance on structure, content, grammar, and style through a thorough revision process, contribute pitch ideas for each issue, and work with the editor-in-chief to coordinate magazine production.',
      imageUrl:
        'https://media.istockphoto.com/id/488961976/photo/exploding-nebula.jpg?s=612x612&w=0&k=20&c=QEfXvnU0ckq0SWNEXTzZnzUpjBDwmweU3a8VoIcBveA=',
    },
    {
      name: 'Photography',
      description:
        'The photography team captures the visual stories behind the science. Photographers shoot original images for articles and issues, covering events, lab work, and the world around us through a scientific lens. No prior photography experience is needed: just bring your curiosity and a willingness to explore.',
      imageUrl: '/icy.png',
    },
    {
      name: 'Web & Software',
      description:
        "The web and software team builds and maintains the NU Sci website, creating a digital home for the magazine's content. Developers design new features, improve site performance, and ensure articles reach a wider audience online. No prior web development experience is required: the team welcomes anyone eager to learn and contribute.",
      imageUrl: '/london.png',
    },
  ];

  return (
    <Box className="min-h-screen bg-neutral/10">
      <AboutUsHero />

      <Box className="mx-auto max-w-6xl px-6 py-8">
        <Text size={36} style="bold" color="black" className="mb-8">
          Our Teams
        </Text>

        <Box className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {teams.map((team) => (
            <MediaCard
              key={team.name}
              mediaType="image"
              imageProps={{
                src: team.imageUrl,
                alt: `${team.name} team`,
              }}
              title={team.name}
              description={team.description}
              mediaDirection="right"
              size="sm"
              rounded="rounded"
              // Cards are not links, so drop the hover lift and give every
              // title the same gap above its description.
              className="h-full w-full max-w-none hover:translate-y-0 [&>div:first-child>p:first-child]:mb-2 [&_.media-container]:flex-1"
              color="white"
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
