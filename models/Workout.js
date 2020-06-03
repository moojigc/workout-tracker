const { Schema, model } = require("mongoose");

const WorkoutSchema = new Schema({
    name: {
        type: String
    },
    type: {
        type: String,
        trim: true
    },
    reps: {
        type: Number,
    },
    duration: {
        type: Number,
    },
    sets: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    distance: {
        type: Number
    }
});

const Workout = model("Workout", WorkoutSchema);

module.exports = Workout;