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

/** Display equation on its own line */
export const Display: Story = {
  args: {
    text: 'The time-dependent Schrödinger equation is $$i\\hbar \\frac{\\partial}{\\partial t} \\Psi(\\mathbf{r}, t) = \\left[ -\\frac{\\hbar^2}{2m} \\nabla^2 + V(\\mathbf{r}, t) \\right] \\Psi(\\mathbf{r}, t)$$ which describes how a quantum state evolves.',
  },
};

/** Multi-line display equation */
export const Aligned: Story = {
  args: {
    text: '$$\\begin{aligned} \\nabla \\cdot \\mathbf{E} &= \\frac{\\rho}{\\varepsilon_0} \\\\ \\nabla \\cdot \\mathbf{B} &= 0 \\\\ \\nabla \\times \\mathbf{E} &= -\\frac{\\partial \\mathbf{B}}{\\partial t} \\\\ \\nabla \\times \\mathbf{B} &= \\mu_0 \\mathbf{J} + \\mu_0 \\varepsilon_0 \\frac{\\partial \\mathbf{E}}{\\partial t} \\end{aligned}$$',
  },
};

/** Invalid LaTeX is shown in red rather than breaking the page */
export const InvalidLatex: Story = {
  args: {
    text: 'This equation has a typo: \\(\\frac{1}{2\\)',
  },
};

/** A single dollar sign is not treated as math */
export const Prices: Story = {
  args: {
    text: 'The telescope cost $5 million, and its upgrade cost $2 million more.',
  },
};
