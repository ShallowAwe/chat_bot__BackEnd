export const tonePrompt = (userText, tone = "friendly", options = {}) => {
  tone = tone.toLowerCase();

  const {
    preserveLength = true,
    audience = "general",
    intensity = "moderate",
  } = options;

  const toneDescriptions = {
    friendly: {
      description: "warm, approachable, and personable",
      examples: "use welcoming language and positive phrasing",
    },
    professional: {
      description: "polished, formal, and business-appropriate",
      examples: "avoid contractions, keep formal tone",
    },
    casual: {
      description: "relaxed, conversational, and informal",
      examples: "use everyday language and contractions",
    },
    enthusiastic: {
      description: "energetic, motivating, and confident",
      examples: "positive reinforcement and active verbs",
    },
    empathetic: {
      description: "understanding and compassionate",
      examples: "acknowledge feelings and show empathy",
    },
    confident: {
      description: "assertive and decisive",
      examples: "use strong declarative sentences",
    },
    humorous: {
      description: "witty and light-hearted",
      examples: "subtle humor and clever phrasing",
    },
    persuasive: {
      description: "convincing and influential",
      examples: "use logic, evidence, and strong calls to action",
    },
    diplomatic: {
      description: "tactful and balanced",
      examples: "acknowledge perspectives, stay neutral",
    },
    concise: {
      description: "brief and efficient",
      examples: "short sentences, focus on essentials",
    },
  };

  const audienceGuides = {
    general: "suitable for a broad audience",
    professional: "appropriate for workplace or business contexts",
    casual: "suited for friends or informal settings",
    technical: "for specialists or subject-matter experts",
  };

  const intensityGuides = {
    subtle: "Make minimal changes, slight tone shift",
    moderate: "Apply a balanced tone adjustment",
    strong: "Transform the tone significantly",
  };

  const selected = toneDescriptions[tone] || {
    description: tone,
    examples: `match a ${tone} tone`,
  };

  return `
Please rewrite the following message in a ${tone} tone:

## Tone Requirements:
- Description: ${selected.description}
- Examples: ${selected.examples}
- Intensity: ${intensityGuides[intensity]}
- Audience: ${audienceGuides[audience]}
${preserveLength ? "- Keep similar length" : "- Length may vary"}

## Guidelines:
- Preserve facts, names, and structure.
- Maintain clarity and flow.
- Avoid clichés or exaggeration.

## Original Message:
${userText}

## Rewritten Message (in ${tone} tone):
`;
};
