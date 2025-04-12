import 'dotenv/config';
import Fastify from 'fastify';
import fastifyWebsocket from '@fastify/websocket';
import fastifyFormBody from '@fastify/formbody';
import VoiceResponse from 'twilio/lib/twiml/VoiceResponse';
import { Voice } from 'elevenlabs-node';
import { Readable } from 'stream';

const fastify = Fastify({ logger: true });
await fastify.register(fastifyWebsocket);
await fastify.register(fastifyFormBody);

const PORT = process.env.PORT || 5000;
const voice = new Voice(process.env.ELEVENLABS_API_KEY);
const voiceId = process.env.ELEVENLABS_AGENT_ID;
const outputFormat = 'ulaw_8000';
const text = 'This is a test. You can now hang up. Thank you.';

// Handle incoming calls
fastify.post('/call/incoming', (request, reply) => {
  const twiml = new VoiceResponse();
  
  twiml.connect().stream({
    url: `wss://${process.env.SERVER_DOMAIN}/call/connection`,
  });

  reply
    .header('Content-Type', 'text/xml')
    .send(twiml.toString());
});

// Handle WebSocket connections
fastify.get('/call/connection', { websocket: true }, (connection, req) => {
  connection.socket.on('message', async (data) => {
    const message = JSON.parse(data.toString());

    if (message.event === 'start' && message.start) {
      const streamSid = message.start.streamSid;
      
      try {
        const audioStream = await voice.textToSpeech(voiceId, text, {
          outputFormat,
          modelId: 'eleven_turbo_v2'
        });

        const audioBuffer = await streamToBuffer(audioStream);
        
        connection.socket.send(JSON.stringify({
          streamSid,
          event: 'media',
          media: {
            payload: audioBuffer.toString('base64')
          }
        }));
      } catch (error) {
        fastify.log.error('Error generating speech:', error);
      }
    }
  });
});

async function streamToBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

// Start the server
try {
  await fastify.listen({ port: PORT, host: '0.0.0.0' });
  console.log(`Server listening at http://localhost:${PORT}`);
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
} 