const { Schema, model } = require("mongoose");

const WorkoutSchema = new Schema({
	name: String,
	day: {
		type: Date,
		default: Date.now
	},
	exercises: Array
});

const Workout = model("Workout", WorkoutSchema);

module.exports = Workout;
