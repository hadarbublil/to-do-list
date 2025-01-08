import express from 'express';
import cors from 'cors';
import taskRoutes from './taskRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', taskRoutes);

// Start the server
const PORT = 5000; // use any port that is available
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
