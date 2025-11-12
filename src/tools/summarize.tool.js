export const summarizePrompt = (userText, options = {}) => {
  const { length = "medium", style = "concise", focus = null } = options;

  const lengthGuides = {
    short: "2-3 sentences",
    medium: "4-6 sentences or 100-150 words",
    long: "2-3 paragraphs or 200-300 words",
  };

  const styleGuides = {
    concise:
      "Keep the summary concise and to-the-point, focusing only on essential information.",
    detailed:
      "Provide a comprehensive summary that captures nuances and important details.",
    "bullet-points":
      "Format the summary as clear bullet points, each highlighting a key idea.",
  };

  return `
Please summarize the following text:

## Instructions:
- Length: ${lengthGuides[length]}
- Style: ${styleGuides[style]}
- Preserve the main ideas, key facts, and important conclusions
- Maintain factual accuracy without adding interpretations
${focus ? `- Focus specifically on: ${focus}` : ""}
- Use clear, accessible language

## Text to Summarize:
${userText}

## Summary:
`;
};
