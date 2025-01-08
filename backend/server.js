const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Sample endpoint
app.get('/api/message', (req, res) => {
    res.json({ message: 'Hello from server!' });
});

// Start the server
const PORT = 5000; // use any port that is available
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
