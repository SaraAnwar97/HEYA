const express = require("express");
const mongoose = require("mongoose");
const MONGODB_URI = 'mongodb+srv://habibaafarid:H8rnXzICA8ie72Bo@her.mmthp.mongodb.net/her?retryWrites=true&w=majority';
const app = express();

const therapistRoutes = require("./routes/therapist");
const gynecologistRoutes = require("./routes/gynecologist");
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const articlesRoutes = require('./routes/articles');
const donationRoutes = require('./routes/donations');

app.use(express.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/auth', authRoutes);
app.use('/therapists', therapistRoutes);
app.use('/gynecologists', gynecologistRoutes);
app.use('/articles', articlesRoutes);
app.use('/donations', donationRoutes);
app.use(userRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message });
})

mongoose
    .connect(
        MONGODB_URI,
        { useNewUrlParser: true },
        { useUnifiedTopology: true }
    )
    .then((result) => {
        app.listen(process.env.PORT || 8080, () => {
            console.log("Server working..");
        })
    })
    .catch((err) => {
        console.log(err);
    });
