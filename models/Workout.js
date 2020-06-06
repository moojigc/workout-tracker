const { Schema, model } = require("mongoose");

const WorkoutSchema = new Schema({
	day: {
		type: Number,
		default: Date.now
	},
	exercises: {
		type: Array,
		required: true
	}
});

const Workout = model("Workout", WorkoutSchema);

module.exports = Workout;
