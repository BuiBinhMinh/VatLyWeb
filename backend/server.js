// backend/server.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('❌ Missing MONGO_URI in .env');
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT_DIR   = path.join(__dirname, '..'); 

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const quizSchema = new mongoose.Schema({
  title: String,
  subject: String,
  createdAt: { type: Date, default: Date.now },
  questions: [{ q: String, options: [String], correct: Number }]
}, { collection: 'quizz' });

const Quiz = mongoose.model('Quiz', quizSchema);

app.get('/api/quizzes', async (_req, res) => {
  try {
    const docs = await Quiz.find().sort({ createdAt: 1 }).lean();
    res.json(docs);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/quizzes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'Invalid id' });
    const doc = await Quiz.findById(id).lean();
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/__debug', async (_req, res) => {
  try {
    const dbName = mongoose.connection.name;
    const collections = (await mongoose.connection.db.listCollections().toArray()).map(c => c.name);
    const quizzCount = collections.includes('quizz')
      ? await mongoose.connection.db.collection('quizz').countDocuments()
      : 0;
    res.json({ dbName, collections, quizzCount });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));


app.use(express.static(ROOT_DIR));

app.get('/', (_req, res) => {
  res.sendFile(path.join(ROOT_DIR, 'index.html'));
});
app.get('/index.html', (_req, res) => {
  res.sendFile(path.join(ROOT_DIR, 'index.html'));
});


(async () => {
  try {
    await mongoose.connect(MONGO_URI, { dbName: 'ChuongHoc' });
    console.log('✅ Mongo connected:', mongoose.connection.name);

    const cnt = await mongoose.connection.db.collection('quizz')
      .countDocuments()
      .catch(() => -1);
    console.log('ℹ️  quizz docs:', cnt);

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Mongo connect error:', err);
    process.exit(1);
  }
})();
