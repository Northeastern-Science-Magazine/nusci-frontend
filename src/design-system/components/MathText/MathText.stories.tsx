import type { Meta, StoryObj } from '@storybook/react';
import { MathText } from '@/components/MathText';

/** Define the control fields for Storybook */
const meta: Meta<typeof MathText> = {
  component: MathText,
  title: 'Components/MathText',
  argTypes: {
    text: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof MathText>;

/** Inline equation within a sentence */
export const Inline: Story = {
  args: {
    text: 'Energy and mass are related by \\(E = mc^2\\), where c is the speed of light.',
  },
};

/** Numbered equation on its own line */
export const Display: Story = {
  args: {
    text: 'The time-dependent Schrödinger equation is \\begin{equation}i\\hbar \\frac{\\partial}{\\partial t} \\Psi(\\mathbf{r}, t) = \\left[ -\\frac{\\hbar^2}{2m} \\nabla^2 + V(\\mathbf{r}, t) \\right] \\Psi(\\mathbf{r}, t)\\end{equation} which describes how a quantum state evolves.',
  },
};

/** Unnumbered equation on its own line */
export const Unnumbered: Story = {
  args: {
    text: 'Euler’s identity: \\begin{equation*}e^{i\\pi} + 1 = 0\\end{equation*}',
  },
};

/** Multi-line display equation */
export const Aligned: Story = {
  args: {
    text: '\\begin{equation}\\begin{aligned} \\nabla \\cdot \\mathbf{E} &= \\frac{\\rho}{\\varepsilon_0} \\\\ \\nabla \\cdot \\mathbf{B} &= 0 \\\\ \\nabla \\times \\mathbf{E} &= -\\frac{\\partial \\mathbf{B}}{\\partial t} \\\\ \\nabla \\times \\mathbf{B} &= \\mu_0 \\mathbf{J} + \\mu_0 \\varepsilon_0 \\frac{\\partial \\mathbf{E}}{\\partial t} \\end{aligned}\\end{equation}',
  },
};

/** Invalid LaTeX is shown in red rather than breaking the page */
export const InvalidLatex: Story = {
  args: {
    text: 'This equation has a typo: \\(\\frac{1}{2\\)',
  },
};

/** Dollar signs are never treated as math */
export const Prices: Story = {
  args: {
    text: 'The telescope cost $5 million, and its upgrade cost $$ more than planned, in US$$.',
  },
};

/** Card previews render every equation inline, numbered ones included */
export const InlineOnly: Story = {
  args: {
    inline: true,
    text: 'Einstein showed \\begin{equation}E = mc^2\\end{equation} and \\(p = mv\\) in one line.',
  },
};

/** An unclosed or empty equation stays as plain text (saving reports it) */
export const Unclosed: Story = {
  args: {
    text: 'Never closed: \\begin{equation} x = 1, and empty: \\(\\).',
  },
};
