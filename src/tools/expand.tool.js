export const expandPrompt = (userText, options = {}) => {
  const {
    addExamples = true,
    addContext = true,
    targetLength = "double",
  } = options;

  return `
Please expand and elaborate on the following text:

## Expansion Guidelines:
- Target length: ${targetLength} the original
${addExamples ? "- Add examples or illustrations." : ""}
${addContext ? "- Provide additional background or explanations." : ""}
- Maintain tone and relevance.
- Keep the structure cohesive.

## Original Text:
${userText}

## Expanded Version:
`;
};
