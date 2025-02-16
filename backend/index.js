import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './db/index.js';
import pollRoutes from './routes/poll.routes.js';

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: `${process.env.CORS_ORIGIN}` } });

app.use(cors());
app.use(express.json());
app.use('/api/polls', pollRoutes);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.on('pollUpdated', () => {
    io.emit('refreshPolls');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
