// @ts-check
const Workout = require("../models/Workout");
const serverError = (res, error) => {
	console.log(error);
	res.status(500).json({ message: "Internal server error." });
};

module.exports = (router, ObjectId) => {
	router.get("/api/workouts", async (req, res) => {
		try {
			const workouts = await Workout.find({}).sort({ date: -1 });
			res.json(workouts).end();
		} catch (error) {
			serverError(res, error);
		}
	});
	router.get("/api/workouts/range", async (req, res) => {
		try {
			const workouts = await Workout.find({});
			res.json(workouts).end();
		} catch (error) {
			serverError(res, error);
		}
	});
	router.get("/api/workouts/:id", async (req, res) => {
		try {
			const workouts = await Workout.findOne({ _id: ObjectId(req.params.id) });
			res.json(workouts).end();
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
			res.json(workouts).end();
		} catch (error) {
			serverError(res, error);
		}
	});
	router.post("/api/workouts", async (req, res) => {
		try {
			const workouts = await Workout.create(req.body);
			res.json(workouts).end();
		} catch (error) {
			serverError(res, error);
		}
	});
};
