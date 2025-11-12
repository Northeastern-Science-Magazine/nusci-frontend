import type { Meta, StoryObj } from "@storybook/react";
import ArticleTemplate from "./ArticleWithoutImage";
import React from "react";

const meta: Meta<typeof ArticleTemplate> = {
  component: ArticleTemplate,
  title: "Components/ArticleWithoutImage",
  argTypes: {
    width: {
      control: "select",
      options: ["narrow", "default", "wide", "full"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ArticleTemplate>;

export const Default: Story = {
  args: {
    title: "Demystifying AI's Energy Gluttony: How Simple Optimizations Can Keep LLMs Thirsty for Knowledge, Not Energy",
    author: "Robert Beliveau",
    editor: "Editor",
    categories: ["Technology", "AI", "Sustainability"],
    publishDate: "August 7, 2025",
    articleIcon: {
      icon: "star",
      color: "aqua",
    },
    content: [
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            content:
              "Every ChatGPT request draws some power from the grid; as usage scales into the billions, so does the energy demand. Major headlines labeling large language models (LLMs) as \"energy sinks\" make for eye-catching and attention-grabbing articles, but the whole story is much more optimistic. Behind the scenes, researchers and developers have already established tools and techniques that can reduce energy usage by up to 33% without sacrificing performance. The only real problem? Companies and teams often overlook these flexible fixes, as they seem too costly or complex to implement.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            content:
              "LLMs like GPT-4 perform trillions of calculations every second. Running these models at worldwide accessibility indeed requires massive amounts of energy on the order of megawatt-hours (MWh), but what does \"one MWh\" actually mean? According to the U.S Energy Information Administration, the ",
          },
          {
            type: "link",
            text: "average household",
            href: "https://www.eia.gov/energyexplained/use-of-energy/electricity-use-in-homes.php",
          },
          {
            type: "text",
            content:
              " uses about 29 kilowatt-hours (kWh) per day. One MWh is equivalent to 1,000 kWh, which is enough energy to power over 30 homes for a day. A single ",
          },
          {
            type: "link",
            text: "modern wind turbine",
            href: "https://www.uti.edu/blog/wind-turbine/how-much-energy-does-a-wind-turbine-produce",
          },
          {
            type: "text",
            content: " produces around 26.1 MWh per day, more than enough to power 783 homes for an entire day.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          { type: "text", content: "Meanwhile, performing a 1-2 month-long " },
          { type: "link", text: "training of an LLM", href: "https://doi.org/10.48550/arXiv.2104.10350" },
          { type: "text", content: " such as GPT-3 costs 1,287 MWh, and the daily usage averages around 850 MWh (assuming " },
          {
            type: "link",
            text: "0.34 Wh per query",
            href: "https://www.techradar.com/computing/artificial-intelligence/sam-altman-doesnt-think-you-should-be-worried-about-chatgpts-energy-usage-reveals-exactly-how-much-power-each-prompt-uses",
          },
          { type: "text", content: " and " },
          {
            type: "link",
            text: "2.5 billion prompts per day",
            href: "https://www.techspot.com/news/108770-chatgpt-now-handles-25-billion-prompts-daily-openai.html",
          },
          {
            type: "text",
            content:
              "). With these numbers, training and serving a massive LLM can easily rival the output of an entire wind farm within a single day. From this perspective, every small optimization taken directly translates into real dollars saved, emissions avoided, and energy utilized elsewhere.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          { type: "text", content: "Tech giants have already released the next generation of chips designed specifically for LLM inference! Google's new " },
          {
            type: "link",
            text: "Ironwood TPU",
            href: "https://blog.google/products/google-cloud/ironwood-tpu-age-of-inference/",
          },
          {
            type: "text",
            content:
              ", now in early access, supports 29.3 teraflops per watt – nearly double the efficiency of last year's Trillium chip. (A teraflop is one trillion floating-point operations per second; measuring flops per watt shows how much \"bang for your buck\" you get per joule of energy.) NVIDIA's ",
          },
          {
            type: "link",
            text: "Grace-Hopper architecture",
            href: "https://resources.nvidia.com/en-us-grace-cpu/nvidia-grace-hopper",
          },
          {
            type: "text",
            content:
              ", combining Grace CPUs and Hopper GPUs, similarly strengthens these enhancements for large-scale corporate deployments.",
          },
        ],
      },
      {
        type: "quote",
        content: "Training and serving a massive LLM can easily rival the output of an entire wind farm within a single day",
      },
      {
        type: "paragraph",
        segments: [
          {type: "text", content: "Software-First Strategies Every Developer Can Use",},
          ],
      },
      {
        type: "paragraph",
        segments: [
          { type: "text", content: "Energy-Aware Pruning: New tools like " },
          { type: "link", text: "GreenLLM", href: "https://doi.org/10.1109/IWQoS61813.2024.10682928" },
          {
            type: "text",
            content:
              " analyze which model branches fire less than others and safely delete them, cutting energy use by around 34% and speeding up inference by around 33% on a Llama-7B baseline.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            content:
              "Quantization: Reducing (quantizing) the model's precision from 16-bit to 4-bit significantly reduces computation complexity. Although naïve quantization can introduce latency overhead, hybrid approaches such as ",
          },
          { type: "link", text: "OFQ-LLM", href: "https://doi.org/10.1109/TCSI.2025.3547732" },
          {
            type: "text",
            content:
              " mesh rescaling and outlier clustering can deliver 2x faster encoding and decoding than other state-of-the-art 4-bit methods.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          { type: "text", content: "Dynamic Batching and Caching: Even simple adjustments, such as grouping requests into a single \"batch\" or caching repeated queries, can provide an 8-28% " },
          { type: "link", text: "throughput increase", href: "https://doi.org/10.48550/arXiv.2503.05248" },
          {
            type: "text",
            content:
              ", correlating to direct energy efficiency (as more work is done per joule used).",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            content:
              "All of these optimizations can be easily integrated into existing AI and LLM frameworks, such as TensorFlow, PyTorch, and JAX, without the need to invest thousands of dollars in new hardware.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          { type: "text", content: "So, if these fixes are all proven and low effort to implement, why aren't they universal? A " },
          {
            type: "link",
            text: "Lightspeed Ventures survey",
            href: "https://lsvp.com/stories/remarkably-rapid-rollout-of-foundational-ai-models-at-the-enterprise-level-a-survey/",
          },
          {
            type: "text",
            content:
              " of enterprise AI leaders reports that for most companies, \"quality and performance [are] still by far the most tracked metrics, everything else are factors, but secondary,\" meaning that the main hesitation is created from perceived risk and utility: Will quantization or pruning lower the user's experience?",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            content:
              "Large language models are here to stay. Their potential to transform education, healthcare, and customer service is immense. But suppose we write off the energy concerns as \"unsolvable\" or \"doomed from the start\". In that case, we'll not only destroy our carbon budgets – we'll also miss out on simpler, cost-effective optimizations already at our disposal.",
          },
        ],
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