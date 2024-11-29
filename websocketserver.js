const WebSocket = require('ws');
const axios = require('axios'); // For making HTTP requests to Strapi API

// Create WebSocket server
const wss = new WebSocket.Server({ port: 4000 });

wss.on('connection', (ws) => {
  console.log('A user connected');

  // Listen for incoming messages
  ws.on('message', async (data) => {
    // Check if the message is a Buffer and convert to string
    const message = data instanceof Buffer ? data.toString() : data;

    console.log('Received message:', message);

    // Optionally, save the message to Strapi via an API call
    try {
      const response = await axios.post('https://chat-app-backend-n87k.onrender.com/api/messages', {
        data: { context: message },  // Adjusting the payload structure
      });
      console.log('Message saved in Strapi:', response.data);
    } catch (error) {
      console.error('Error interacting with Strapi:', error);
    }

    // Send the message back to the client
    console.log('Sending message back:', message);
    ws.send(message);
  });

  // Handle WebSocket disconnection
  ws.on('close', () => {
    console.log('A user disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:4000');
