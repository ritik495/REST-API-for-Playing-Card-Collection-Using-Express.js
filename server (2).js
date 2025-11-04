
// server.js
// REST API for Playing Card Collection Using Express.js

const express = require("express");
const app = express();
app.use(express.json());

// In-memory card data
let cards = [
  { id: 1, suit: "Hearts", value: "Ace" },
  { id: 2, suit: "Spades", value: "King" },
  { id: 3, suit: "Diamonds", value: "Queen" }
];

// 1️⃣ GET all cards
app.get("/cards", (req, res) => {
  res.status(200).json(cards);
});

// 2️⃣ GET card by ID
app.get("/cards/:id", (req, res) => {
  const cardId = parseInt(req.params.id);
  const card = cards.find((c) => c.id === cardId);

  if (!card) {
    return res.status(404).json({ message: "Card not found" });
  }

  res.status(200).json(card);
});

// 3️⃣ POST (add) new card
app.post("/cards", (req, res) => {
  const { suit, value } = req.body;

  if (!suit || !value) {
    return res.status(400).json({ message: "Suit and value are required" });
  }

  const newCard = {
    id: cards.length ? cards[cards.length - 1].id + 1 : 1,
    suit,
    value,
  };

  cards.push(newCard);
  res.status(201).json(newCard);
});

// 4️⃣ DELETE card by ID
app.delete("/cards/:id", (req, res) => {
  const cardId = parseInt(req.params.id);
  const index = cards.findIndex((c) => c.id === cardId);

  if (index === -1) {
    return res.status(404).json({ message: "Card not found" });
  }

  const removedCard = cards.splice(index, 1)[0];
  res.status(200).json({
    message: `Card with ID ${cardId} removed`,
    card: removedCard,
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
