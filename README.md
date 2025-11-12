# 💬 Gemini Chat Backend

A modern, modular **Node.js + Express** backend that powers an intelligent chatbot using **Google's Gemini 2.0 API**. It provides dynamic AI tools such as summarization, tone transformation, contextual understanding, and content formatting — built with clean architecture and extensibility in mind.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue.svg)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Features

- 🤖 **Gemini 2.0 Integration** – Powered by Google's latest multimodal AI API
- 🔧 **Dynamic Tool Engine** – Multiple AI tools accessible via simple API
- 🔄 **Retry Logic** – Exponential backoff for handling rate limits
- 📝 **Structured Logging** – Winston-based logging with success/error tracking
- 🛡️ **Error Handling** – Clean error responses with detailed logging
- 🏗️ **ESM Architecture** – Modern modular JavaScript with import/export
- ⚡ **Rate Limiting** – Built-in protection against abuse

---

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation--setup)
- [Configuration](#-configuration)
- [API Endpoints](#-api-endpoints)
- [Available Tools](#-available-tools)
- [Usage Examples](#-usage-examples)
- [Development](#-development)
- [Future Improvements](#-future-improvements)
- [License](#-license)

---

## ⚙️ Tech Stack

| Technology                   | Purpose                               |
| ---------------------------- | ------------------------------------- |
| **Node.js (ESM)**            | Lightweight, scalable backend runtime |
| **Express.js**               | Routing and middleware management     |
| **Google Generative AI SDK** | Gemini API integration                |
| **Winston**                  | Structured logging system             |
| **dotenv**                   | Secure environment configuration      |
| **Nodemon**                  | Development auto-restart              |

---

## 📁 Project Structure

```
src/
├── config/
│   └── env.js                 # Environment loader + validation
├── controllers/
│   └── chat.controller.js     # Main chat endpoint logic
├── middleware/
│   ├── error.middleware.js    # Global error handler
│   └── rateLimiter.js         # Rate limiting middleware
├── routes/
│   └── chat.route.js          # POST /chat endpoint
├── services/
│   └── gemini.service.js      # Gemini API integration + retry logic
├── tools/
│   ├── context.tool.js        # Contextual personality tool
│   ├── summarize.tool.js      # Text summarization
│   ├── tone.tool.js           # Tone transformation
│   ├── format.tool.js         # Content formatting
│   ├── expand.tool.js         # Content expansion
│   ├── simplify.tool.js       # Text simplification
│   └── index.js               # Central tool dispatcher
├── utils/
│   └── logger.js              # Winston-based logger
└── server.js                  # Express app bootstrap
```

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Google Gemini API Key ([Get it here](https://aistudio.google.com/app/apikey))

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/gemini-chat-backend.git
cd gemini-chat-backend

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env
# Edit .env with your API key

# 4. Start development server
npm run dev
```

Server will start at: **http://localhost:8080**

---

## 🔑 Configuration

Create a `.env` file in the project root:

```env
PORT=8080
GEMINI_API_KEY=your_google_gemini_api_key_here
GEMINI_MODEL=gemini-2.0-pro-exp-02-05
NODE_ENV=development
LOG_LEVEL=info
```

### Environment Variables

| Variable         | Required | Description                | Default                    |
| ---------------- | -------- | -------------------------- | -------------------------- |
| `PORT`           | No       | Server port                | `8080`                     |
| `GEMINI_API_KEY` | Yes      | Your Google Gemini API key | -                          |
| `GEMINI_MODEL`   | No       | Gemini model version       | `gemini-2.0-pro-exp-02-05` |
| `NODE_ENV`       | No       | Environment mode           | `development`              |
| `LOG_LEVEL`      | No       | Winston log level          | `info`                     |

---

## 🌐 API Endpoints

### `GET /health`

Health check endpoint to verify server status.

**Response:**

```json
{
  "success": true,
  "message": "Server healthy 🚀"
}
```

---

### `POST /chat`

Generate AI responses based on user message and selected tool.

**Request Body:**

| Field            | Type    | Required | Description                                               |
| ---------------- | ------- | -------- | --------------------------------------------------------- |
| `message`        | string  | Yes      | The user's message or content                             |
| `tool`           | string  | No       | AI tool to use (see [Available Tools](#-available-tools)) |
| `tone`           | string  | No       | Target tone (used with `tone` tool)                       |
| `context`        | string  | No       | Conversation context for multi-turn sessions              |
| `targetAudience` | string  | No       | Target audience (used with `simplify` tool)               |
| `addExamples`    | boolean | No       | Add examples (used with `expand` tool)                    |
| `targetLength`   | string  | No       | Length modifier (used with `expand` tool)                 |

**Success Response:**

```json
{
  "success": true,
  "response": "Generated AI text here...",
  "timestamp": "2025-11-12T10:05:13.512Z"
}
```

**Error Response:**

```json
{
  "success": false,
  "error": "Error message",
  "timestamp": "2025-11-12T10:05:13.512Z"
}
```

---

## 🧰 Available Tools

| Tool          | Description                      | Additional Parameters                       |
| ------------- | -------------------------------- | ------------------------------------------- |
| **default**   | General conversation             | None                                        |
| **summarize** | Condense text to key points      | None                                        |
| **tone**      | Transform text tone              | `tone` (e.g., "polite", "formal", "casual") |
| **context**   | Contextual personality responses | None                                        |
| **format**    | Format and structure content     | None                                        |
| **expand**    | Expand text with details         | `addExamples`, `targetLength`               |
| **simplify**  | Simplify complex text            | `targetAudience`                            |

---

## 📝 Usage Examples

### 1. Default Chat

```bash
curl -X POST http://localhost:8080/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is Flutter?"
  }'
```

### 2. Summarize Text

```bash
curl -X POST http://localhost:8080/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Flutter is an open-source UI framework by Google for building applications across platforms with a single codebase.",
    "tool": "summarize"
  }'
```

### 3. Change Tone

```bash
curl -X POST http://localhost:8080/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Submit the report by EOD.",
    "tool": "tone",
    "tone": "polite"
  }'
```

### 4. Contextual Response

```bash
curl -X POST http://localhost:8080/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Explain quantum computing simply.",
    "tool": "context"
  }'
```

### 5. Simplify Text

```bash
curl -X POST http://localhost:8080/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Artificial intelligence enables machines to learn patterns from data.",
    "tool": "simplify",
    "targetAudience": "children"
  }'
```

### 6. Expand Content

```bash
curl -X POST http://localhost:8080/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "AI models learn from data to make predictions.",
    "tool": "expand",
    "addExamples": true,
    "targetLength": "double"
  }'
```

---

## 🛠️ Development

### Available Scripts

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Run tests (if configured)
npm test

# Lint code
npm run lint
```

### Adding New Tools

1. Create a new tool file in `src/tools/`
2. Export a function that returns a prompt configuration
3. Register the tool in `src/tools/index.js`

**Example:**

```javascript
// src/tools/myTool.tool.js
export const myToolPrompt = (message, options) => ({
  systemPrompt: "You are a helpful assistant that...",
  userMessage: `${message}\n\nAdditional context: ${options.context}`,
});
```

---

## 🔮 Future Improvements

- [ ] Add user authentication (JWT/Firebase Auth)
- [ ] Enable persistent chat history (MongoDB or Firestore)
- [ ] Implement streamed responses for real-time typing effect
- [ ] Extend toolset (sentiment analysis, title generation, etc.)
- [ ] Add comprehensive test suite (Jest/Mocha)
- [ ] Implement caching layer (Redis)
- [ ] Add API documentation (Swagger/OpenAPI)
- [ ] Support file uploads for document analysis
- [ ] Multi-language support

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**  
Software Engineer & AI Enthusiast  
Building practical AI tools for modern web & mobile applications.

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- [Google Gemini API](https://ai.google.dev/) for powering the AI capabilities
- [Express.js](https://expressjs.com/) for the robust web framework
- [Winston](https://github.com/winstonjs/winston) for excellent logging

---

<div align="center">
  
**If you find this project helpful, please consider giving it a ⭐**

Made with ❤️ by [Your Name]

</div>
