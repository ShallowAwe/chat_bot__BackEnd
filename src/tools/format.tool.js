export const formatPrompt = (userText, formatType = "markdown") => {
  const formatGuides = {
    markdown:
      "Convert to well-structured markdown with headers, lists, and emphasis.",
    html: "Convert to clean semantic HTML with proper tags and structure.",
    plain: "Convert to plain text with clear paragraphs.",
    outline:
      "Convert to a hierarchical outline with main points and subpoints.",
  };

  return `
Please format the following text:

## Formatting Instructions:
- Target format: **${formatType}**
- Goal: ${formatGuides[formatType]}
- Preserve content and meaning.
- Improve readability and consistency.

## Text to Format:
${userText}

## Formatted Output:
`;
};
