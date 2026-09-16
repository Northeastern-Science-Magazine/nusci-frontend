import type { Meta, StoryObj } from "@storybook/react";
import ArticleTemplate from "./ArticleTemplate";

const meta: Meta<typeof ArticleTemplate> = {
  component: ArticleTemplate,
  title: "Components/ArticleTemplate",
  argTypes: {
    width: {
      control: "select",
      options: ["narrow", "default", "wide", "full"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ArticleTemplate>;

export const WithImage: Story = {
  args: {
    title: "Demystifying AI's Energy Gluttony: How Simple Optimizations Can Keep LLMs Thirsty for Knowledge, Not Energy",
    author: "Robert Beliveau",
    editor: "Editor",
    categories: ["Technology", "AI", "Sustainability"],
    publishDate: "August 7, 2025",
    featuredImage: {
      ratio: 16 / 9,
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg",
      alt: "AI and energy efficiency",
      width: "w-full",
      emphasis: "default",
      rounded: "default",
    },
    imageCaption: "Example of a caption for an image.",
    articleContent: [
      {
        contentType: "body_paragraph",
        content:
          'Every ChatGPT request draws some power from the grid; as usage scales into the billions, so does the energy demand. Major headlines labeling large language models (LLMs) as "energy sinks" make for eye-catching and attention-grabbing articles, but the whole story is much more optimistic. Behind the scenes, researchers and developers have already established tools and techniques that can reduce energy usage by up to 33% without sacrificing performance. The only real problem? Companies and teams often overlook these flexible fixes, as they seem too costly or complex to implement.',
      },
      {
        contentType: "body_paragraph",
        content:
          'LLMs like GPT-4 perform trillions of calculations every second. Running these models at worldwide accessibility indeed requires massive amounts of energy on the order of megawatt-hours (MWh), but what does "one MWh" actually mean? According to the U.S Energy Information Administration, the average household uses about 29 kilowatt-hours (kWh) per day. One MWh is equivalent to 1,000 kWh, which is enough energy to power over 30 homes for a day. A single modern wind turbine produces around 26.1 MWh per day, more than enough to power 783 homes for an entire day.',
      },
      {
        contentType: "body_paragraph",
        content:
          "Meanwhile, performing a 1-2 month-long training of an LLM such as GPT-3 costs 1,287 MWh, and the daily usage averages around 850 MWh (assuming 0.34 Wh per query and 2.5 billion prompts per day). With these numbers, training and serving a massive LLM can easily rival the output of an entire wind farm within a single day. From this perspective, every small optimization taken directly translates into real dollars saved, emissions avoided, and energy utilized elsewhere.",
      },
      {
        contentType: "body_paragraph",
        content:
          "Tech giants have already released the next generation of chips designed specifically for LLM inference! Google's new Ironwood TPU, now in early access, supports 29.3 teraflops per watt – nearly double the efficiency of last year's Trillium chip. (A teraflop is one trillion floating-point operations per second; measuring flops per watt shows how much \"bang for your buck\" you get per joule of energy.) NVIDIA's Grace-Hopper architecture, combining Grace CPUs and Hopper GPUs, similarly strengthens these enhancements for large-scale corporate deployments.",
      },
      {
        contentType: "pull_quote",
        content: "Training and serving a massive LLM can easily rival the output of an entire wind farm within a single day",
      },
      {
        contentType: "body_paragraph",
        content: "Software-First Strategies Every Developer Can Use",
      },
      {
        contentType: "body_paragraph",
        content:
          "Energy-Aware Pruning: New tools like GreenLLM analyze which model branches fire less than others and safely delete them, cutting energy use by around 34% and speeding up inference by around 33% on a Llama-7B baseline.",
      },
      {
        contentType: "body_paragraph",
        content:
          "Quantization: Reducing (quantizing) the model's precision from 16-bit to 4-bit significantly reduces computation complexity. Although naïve quantization can introduce latency overhead, hybrid approaches such as OFQ-LLM mesh rescaling and outlier clustering can deliver 2x faster encoding and decoding than other state-of-the-art 4-bit methods.",
      },
      {
        contentType: "body_paragraph",
        content:
          'Dynamic Batching and Caching: Even simple adjustments, such as grouping requests into a single "batch" or caching repeated queries, can provide an 8-28% throughput increase, correlating to direct energy efficiency (as more work is done per joule used).',
      },
      {
        contentType: "body_paragraph",
        content:
          "All of these optimizations can be easily integrated into existing AI and LLM frameworks, such as TensorFlow, PyTorch, and JAX, without the need to invest thousands of dollars in new hardware.",
      },
      {
        contentType: "body_paragraph",
        content:
          "So, if these fixes are all proven and low effort to implement, why aren't they universal? A Lightspeed Ventures survey of enterprise AI leaders reports that for most companies, \"quality and performance [are] still by far the most tracked metrics, everything else are factors, but secondary,\" meaning that the main hesitation is created from perceived risk and utility: Will quantization or pruning lower the user's experience?",
      },
      {
        contentType: "body_paragraph",
        content:
          'Large language models are here to stay. Their potential to transform education, healthcare, and customer service is immense. But suppose we write off the energy concerns as "unsolvable" or "doomed from the start". In that case, we\'ll not only destroy our carbon budgets – we\'ll also miss out on simpler, cost-effective optimizations already at our disposal.',
      },
    ],
    sources: [
      {
        text: "IEEE Transactions on Circuits and Systems I: Regular Papers (2025). DOI: 10.1109/TCSI.2025.3547732",
        href: "https://doi.org/10.1109/TCSI.2025.3547732",
      },
      {
        text: "ArXiv Preprint (2025). DOI: 10.48550/arXiv.2503.05248",
        href: "https://doi.org/10.48550/arXiv.2503.05248",
      },
      {
        text: "IEEE/ACM 32nd International Symposium on Quality of Service (2024). DOI: 10.1109/IWQoS61813.2024.10682928",
        href: "https://doi.org/10.1109/IWQoS61813.2024.10682928",
      },
      {
        text: "ArXiv Preprint (2021). DOI: 10.48550/arXiv.2104.10350",
        href: "https://doi.org/10.48550/arXiv.2104.10350",
      },
    ],
  },
};

export const WithoutImage: Story = {
  args: {
    title: "Demystifying AI's Energy Gluttony: How Simple Optimizations Can Keep LLMs Thirsty for Knowledge, Not Energy",
    author: "Robert Beliveau",
    editor: "Editor",
    categories: ["Technology", "AI", "Sustainability"],
    publishDate: "August 7, 2025",
    articleContent: [
      {
        contentType: "body_paragraph",
        content:
          'Every ChatGPT request draws some power from the grid; as usage scales into the billions, so does the energy demand. Major headlines labeling large language models (LLMs) as "energy sinks" make for eye-catching and attention-grabbing articles, but the whole story is much more optimistic. Behind the scenes, researchers and developers have already established tools and techniques that can reduce energy usage by up to 33% without sacrificing performance. The only real problem? Companies and teams often overlook these flexible fixes, as they seem too costly or complex to implement.',
      },
      {
        contentType: "body_paragraph",
        content:
          'LLMs like GPT-4 perform trillions of calculations every second. Running these models at worldwide accessibility indeed requires massive amounts of energy on the order of megawatt-hours (MWh), but what does "one MWh" actually mean? According to the U.S Energy Information Administration, the average household uses about 29 kilowatt-hours (kWh) per day. One MWh is equivalent to 1,000 kWh, which is enough energy to power over 30 homes for a day. A single modern wind turbine produces around 26.1 MWh per day, more than enough to power 783 homes for an entire day.',
      },
      {
        contentType: "pull_quote",
        content: "Training and serving a massive LLM can easily rival the output of an entire wind farm within a single day",
      },
      {
        contentType: "body_paragraph",
        content:
          "Tech giants have already released the next generation of chips designed specifically for LLM inference! Google's new Ironwood TPU, now in early access, supports 29.3 teraflops per watt – nearly double the efficiency of last year's Trillium chip.",
      },
      {
        contentType: "body_paragraph",
        content:
          "All of these optimizations can be easily integrated into existing AI and LLM frameworks, such as TensorFlow, PyTorch, and JAX, without the need to invest thousands of dollars in new hardware.",
      },
    ],
    sources: [
      {
        text: "IEEE Transactions on Circuits and Systems I: Regular Papers (2025). DOI: 10.1109/TCSI.2025.3547732",
        href: "https://doi.org/10.1109/TCSI.2025.3547732",
      },
      {
        text: "ArXiv Preprint (2025). DOI: 10.48550/arXiv.2503.05248",
        href: "https://doi.org/10.48550/arXiv.2503.05248",
      },
    ],
  },
};
