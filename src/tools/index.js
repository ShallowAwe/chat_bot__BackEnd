import { injectContext } from "./context.tool.js";
import { summarizePrompt } from "./summarize.tool.js";
import { tonePrompt } from "./tone.tool.js";
import { formatPrompt } from "./format.tool.js";
import { expandPrompt } from "./expand.tool.js";
import { simplifyPrompt } from "./simplify.tool.js";

export const applyTool = (toolName, userText, options = {}) => {
  switch (toolName) {
    case "context":
      return injectContext(userText);
    case "summarize":
      return summarizePrompt(userText, options);
    case "tone":
      return tonePrompt(userText, options.tone || "friendly", options);
    case "format":
      return formatPrompt(userText, options.formatType || "markdown");
    case "expand":
      return expandPrompt(userText, options);
    case "simplify":
      return simplifyPrompt(
        userText,
        options.targetAudience || "general public"
      );
    default:
      return userText; // fallback: no modification
  }
};

export default {
  injectContext,
  summarizePrompt,
  tonePrompt,
  formatPrompt,
  expandPrompt,
  simplifyPrompt,
  applyTool,
};
