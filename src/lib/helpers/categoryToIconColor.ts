export default function categoryToIconColor(
  category: string,
): "forest-green" | "sage-green" | "red" | "aqua" | "purple" | "pink" | "maroon" | "coral" | "marigold" | "neutral" | "black" {
  const map = new Map<
    string,
    "forest-green" | "sage-green" | "red" | "aqua" | "purple" | "pink" | "maroon" | "coral" | "marigold" | "neutral" | "black"
  >(
    Object.entries({
      biology: "purple",
      chemistry: "aqua",
      culture: "pink",
      environment: "sage-green",
      health: "red",
      local: "sage-green",
      mathematics: "maroon",
      neuroscience: "purple",
      newsletter: "coral",
      opinion: "marigold",
      philosophy: "neutral",
      physics: "aqua",
      politics: "maroon",
      psychology: "purple",
      space: "aqua",
      technology: "black",
      world: "sage-green",
      uncategorized: "black",
    }),
  );

  return map.get(category.toLowerCase()) ?? "neutral";
}
