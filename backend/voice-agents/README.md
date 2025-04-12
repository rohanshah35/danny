# Voice Agents

A Node.js application that integrates Twilio's Voice API with ElevenLabs text-to-speech for real-time voice streaming.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```
4. Update the environment variables in `.env` with your:
   - Twilio credentials
   - ElevenLabs API key
   - Server domain
   - Port (optional)

## Running the Application

Start the server:
```bash
npm start
```

The server will start on the configured port (default: 5000).

## API Endpoints

- POST `/call/incoming`: Handles incoming Twilio voice calls
- WS `/call/connection`: WebSocket endpoint for real-time audio streaming

## Requirements

- Node.js 16+
- Twilio Account
- ElevenLabs API key
- HTTPS-enabled domain for production use 