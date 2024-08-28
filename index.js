const express = require("express");                            // Login Middleware para parsear el cuerpo de solicitudes como JSON
const { connectDB } = require("./src/utils/db")
const router = require("./src/api/routes/film.routes")
const routerUser = require("./src/api/routes/user.routes")
const routerEra = require("./src/api/routes/era.routes")
const env = require("dotenv")
env.config()                                                   //configurar variables de entorno

const cloudinary = require("cloudinary").v2                    //importar cloudinary
cloudinary.config({                                            //configurar cloudinary con sus parámetros (que están en .env)
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const cors = require("cors")                                   //instalar dependencia cors // Login

connectDB();
const server = express();                                      // Login server = app
const PORT = process.env.PORT;                                 // Login  usamos la variable de entorno PORT
server.use(cors())                                             // Login Permitir CORS para todas las solicitudes
                                                                //habilita que cualquier ruta pueda hacer peticiones a este servidor
server.use(express.json())                                     // Login  server = app Middleware para parsear el cuerpo de las solicitudes como JSON
server.use("/", router)                                        //film
server.use("/user", routerUser)                                //user
server.use("/era", routerEra)                                  //Era


//_____________________________________________________

// server.js
const jwt = require('jsonwebtoken');

// Middleware para parsear el cuerpo de las solicitudes como JSON
server.use(express.json());

const users = {
    'user1': { password: 'password1', role: 'user' },
    'admin1': { password: 'password1', role: 'admin' }
};

const secretKey = 'your_secret_key';

server.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users[username];

    if (user && user.password === password) {
        const token = jwt.sign({ username, role: user.role }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const authorizeRole = (role) => (req, res, next) => {
    if (req.user.role === role) {
        next();
    } else {
        res.sendStatus(403);
    }
};

server.get('/api/user', authenticateToken, (req, res) => {
    res.json({ message: 'Hello User!' });
});

server.get('/api/admin', authenticateToken, authorizeRole('admin'), (req, res) => {
    res.json({ message: 'Hello Admin!' });
});

//________________________________________________________________

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});





