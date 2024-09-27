import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import routes from './routes';
import { errorHandler } from './middleware/error-handler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: 'Welcome to the app!' });
});

app.use('/api/v1', routes);

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});