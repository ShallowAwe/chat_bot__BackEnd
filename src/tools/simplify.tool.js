export const simplifyPrompt = (userText, targetAudience = "general public") => {
  const audienceMap = {
    "general public": "average adult reader (8th-10th grade level)",
    children: "children aged 8–12",
    teenagers: "teenagers aged 13–17",
    beginners: "beginners with no prior knowledge",
    "non-technical": "non-technical readers",
  };

  return `
Please simplify the following text:

## Simplification Requirements:
- Target audience: ${audienceMap[targetAudience] || targetAudience}
- Use simple, everyday language.
- Replace jargon with clear explanations.
- Short sentences, clear structure.
- Maintain factual accuracy.

## Original Text:
${userText}

## Simplified Version:
`;
};
