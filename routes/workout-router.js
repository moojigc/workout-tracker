const Workout = require("../models/Workout");
const serverError = (res, error) => {
	console.log(error);
	res.status(500).json({ message: "Internal server error." });
};
const successJson = (res, data) => res.status(200).json(data).end();

module.exports = (router, ObjectId) => {
	router.get("/api/workouts", async (req, res) => {
		try {
			const workouts = (await Workout.find({}).sort({ date: -1 })).map((w) => {
				const totalDuration = () => {
					return w.exercises.reduce((acc, curr) => {
						return acc + curr.duration;
					}, 0);
				};
				return {
					_id: w._id,
					day: w.day,
					exercises: w.exercises,
					totalDuration: totalDuration()
				};
			});
			successJson(res, workouts);
		} catch (error) {
			serverError(res, error);
		}
	});
	router.get("/api/workouts/range", async (req, res) => {
		try {
			const workouts = await Workout.find({});
			successJson(res, workouts);
		} catch (error) {
			serverError(res, error);
		}
	});
	router.get("/api/workouts/:id", async (req, res) => {
		try {
			const workouts = await Workout.findOne({ _id: ObjectId(req.params.id) });
			successJson(res, workouts);
		} catch (error) {
			serverError(res, error);
		}
	});
	router.put("/api/workouts/:id", async (req, res) => {
		console.log(req.body);
		try {
			const workouts = await Workout.updateOne(
				{ _id: ObjectId(req.params.id) },
				{
					$push: {
						exercises: req.body
					}
				}
			);
			successJson(res, workouts);
		} catch (error) {
			serverError(res, error);
		}
	});
	router.post("/api/workouts", async (req, res) => {
		try {
			const workouts = await Workout.create(req.body);
			successJson(res, workouts);
		} catch (error) {
			serverError(res, error);
		}
	});
};
