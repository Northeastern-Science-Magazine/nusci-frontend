export default function categoryToIcon(category: string) {
  const map = new Map<string, string>(
    Object.entries({
      biology: "dna",
      chemistry: "flask",
      culture: "palette",
      environment: "sprout",
      health: "heartPulse",
      local: "mapPin",
      mathematics: "calculator",
      neuroscience: "brain",
      newsletter: "mails",
      opinion: "handShake",
      philosophy: "scroll",
      physics: "move",
      politics: "vote",
      psychology: "brainCog",
      space: "rocket",
      technology: "cpu",
      world: "globe",
      uncategorized: "book",
    }),
  );

  return map.get(category.toLowerCase()) ?? "book";
}
