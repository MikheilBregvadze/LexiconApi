const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors')
const connectDB = require("./api/config/db.js");
const corsOptions = require("./api/config/cors.js");
const path = require("path");

const userRoutes = require("./api/routes/userRoutes.js");

dotenv.config();

connectDB();

const app = express();

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.use(express.json());

app.use('/Api/Client', cors(corsOptions), userRoutes);

app.get('/', (req, res) => {
    res.send('Api is running!');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
