const express = require('express');
const userRoutes = require('./routes/userRoutes');
const piratesRoutes = require('./routes/piratesRoutes');
const mongoose = require('mongoose');
const config = require('./config/keys');
const path = require('path');;
const app = express();


/******************************************MiddleWares  ********************************************/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRoutes);
app.use('/api/pirates', piratesRoutes);

/******************************************MongoDb Connection********************************************/

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log('MongoDb Connected')).catch(err => console.log(err));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('./client/build'));

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));

    });
}

app.listen(process.env.PORT || 8000, () => console.log('Listening to port 8000'));


