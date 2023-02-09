//------require the Library--------//
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);


//------Connect to Mongo--------//
mongoose.connect('mongodb://localhost/habit_tracker'); 

//------acquire the connection (to check if it is successful)--------//
const db = mongoose.connection;


//------ error --------//
db.on('error',  console.error.bind(console, 'error connecting to db'));

//------ up and running then print the message --------//
db.once('open', () => {
    console.log('Successfully connected to the database');

})

 
