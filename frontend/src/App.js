import React, { useState, useEffect } from 'react';

function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/message') // use the port you defined
            .then(response => response.json())
            .then(data => setMessage(data.message));
    }, []);

    return (
        <div>
            <h1>Message from Server:</h1>
            <p>{message}</p>
        </div>
    );
}

export default App;
