require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const personsRouter = require('./routers/persons');

const app = express();
app.use(express.json());

// Ruta de bienvenida o estado del servidor
app.get('/', (req, res) => {
    res.json({ 
        message: 'Welcome to the Persons API!', 
        status: 'Online',
        endpoints: '/api/persons'
    });
});

app.use('/api/persons', personsRouter);

const allowedOrigins = [
    'http://localhost:5173', // Para tu prueba local de Vite
    'https://silver-narwhal-a19886.netlify.app/' // ¡EL DOMINIO DE TU FRONTEND DESPLEGADO!
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", 
    credentials: true,
}));

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
  console.error('MongoDB connection error', err);
});


