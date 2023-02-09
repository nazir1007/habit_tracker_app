const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dates: [{
        date: String,
        complete: String
        }],
        favourite: {
            type: Boolean,
            default: false
        }
    }, {
        timestamps: true
});

const Habit  = mongoose.model('Habit', HabitSchema);

module.exports =  Habit;