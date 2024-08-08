const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoute');
const postRoutes = require('./routes/postRoute');
const commentRoute=require('./routes/commentRoute');
const categoryRoute=require('./routes/categoryRoute');
//const authorRoute=require('./routes/authorRoute');
const app = express();


mongoose.connect('mongodb+srv://Durga2618:Durga2005@cluster0.pinhhqm.mongodb.net/blog')
.then(() => {
    console.log('MongoDB connected');
})
.catch(err => {
    console.error('Failed to connect to MongoDB:', err);
});
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use('/User', userRoutes);   
app.use('/',postRoutes); 
app.use('/',commentRoute);
app.use('/',categoryRoute);
//app.use('/',authorRoute);
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
