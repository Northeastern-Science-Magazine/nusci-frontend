'use client';

import React, { useState } from 'react';
import { Box } from '@/design-system/primitives/Box/Box';
import Text from '@/design-system/primitives/Text/Text';
import { TeamMember } from '@/design-system/components/TeamMember/TeamMember';
import { TeamMemberProps } from '@/design-system/components/TeamMember';
import { AboutUsHero } from '@/app/teams/components/AboutUsHero';
import Button from '@/design-system/primitives/Button';

type EboardTabsProps = {
  eboard: TeamMemberProps[];
  editors: TeamMemberProps[];
  /** Emails of members whose public profile exists, so their card can link */
  linkedEmails: string[];
};

export default function EboardTabs({
  eboard,
  editors,
  linkedEmails,
}: EboardTabsProps) {
  const [activeTab, setActiveTab] = useState<'eboard' | 'editors'>('eboard');

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
              linkToProfile={linkedEmails.includes(member.email)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
