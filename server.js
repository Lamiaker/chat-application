const express = require("express");
const http = require("http");
const WebSocket = require("ws");

// Initialiser Express
const app = express();

// Servir les fichiers statiques (HTML, CSS, JS)
app.use(express.static("public"));

// Créer un serveur HTTP
const server = http.createServer(app);

// Initialiser WebSocket sur le serveur HTTP
const wss = new WebSocket.Server({ server });

// Gérer les connexions WebSocket
wss.on("connection", (ws) => {
  console.log("Client connected");

  // Gérer les messages reçus d'un client
  ws.on("message", (message) => {
    console.log(`Received: ${message}`);

    // Diffuser le message à tous les clients connectés
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        // Envoyer le message à tous les clients sauf l'expéditeur
        client.send(message.toString());
      }
    });
  });

  // Gérer la déconnexion
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

// Démarrer le serveur sur le port 3000
server.listen(3000, () => {
  console.log("Server is listening on http://localhost:3000");
});
