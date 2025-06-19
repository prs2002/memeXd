import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});


// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (replace with Supabase in production)
let memes = [];
let bids = [];
let votes = [];
let users = [
  { id: 'user1', username: 'CyberHacker', credits: 1000, avatar: '🦾' },
  { id: 'user2', username: 'NeonNinja', credits: 1500, avatar: '🥷' },
  { id: 'user3', username: 'MatrixMemer', credits: 800, avatar: '🤖' }
];

// Cache for AI responses
const aiCache = new Map();

// Fallback captions and vibes
const fallbackCaptions = [
  "YOLO to the moon! 🚀",
  "Hacking the mainframe... 💻",
  "When the matrix glitches 🔥",
  "Stonks in cyberspace 📈",
  "404: Reality not found 🌐"
];

// Routes
app.get('/api/memes', (req, res) => {
  const sortedMemes = memes.map(meme => ({
    ...meme,
    upvotes: votes.filter(v => v.memeId === meme.id && v.type === 'up').length,
    downvotes: votes.filter(v => v.memeId === meme.id && v.type === 'down').length,
    currentBid: Math.max(...bids.filter(b => b.memeId === meme.id).map(b => b.amount), 0)
  })).sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
  
  res.json(sortedMemes);
});

app.post('/api/memes', async (req, res) => {
  const { title, imageUrl, tags, ownerId } = req.body;
  
  const meme = {
    id: uuidv4(),
    title,
    imageUrl,
    tags: tags || [],
    ownerId,
    createdAt: new Date().toISOString(),
    aiCaption: await generateAICaption(tags || []),
    aiVibe: await generateAIVibe(tags || [])
  };
  
  memes.push(meme);
  io.emit('newMeme', meme);
  
  res.json(meme);
});

app.post('/api/bids', (req, res) => {
  const { memeId, userId, amount } = req.body;
  
  const user = users.find(u => u.id === userId);
  if (!user || user.credits < amount) {
    return res.status(400).json({ error: 'Insufficient credits' });
  }
  
  const bid = {
    id: uuidv4(),
    memeId,
    userId,
    amount,
    timestamp: new Date().toISOString()
  };
  
  bids.push(bid);
  user.credits -= amount;
  
  io.emit('newBid', { bid, user: user.username });
  
  res.json(bid);
});

app.post('/api/votes', (req, res) => {
  const { memeId, userId, type } = req.body;
  
  // Remove existing vote from this user for this meme
  votes = votes.filter(v => !(v.memeId === memeId && v.userId === userId));
  
  const vote = {
    id: uuidv4(),
    memeId,
    userId,
    type, // 'up' or 'down'
    timestamp: new Date().toISOString()
  };
  
  votes.push(vote);
  io.emit('newVote', vote);
  
  res.json(vote);
});


app.get('/api/users', (req, res) => {
  res.json(users);
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Cyberpunk Meme Server running on port ${PORT}`);
});