// @ts-check
const Workout = require("../models/Workout");
const serverError = (res, error) => {
	console.log(error);
	res.status(500).send("<h1>Internal server error.</h1>");
};

module.exports = (router, ObjectId) => {
	router.get("/exercise", (req, res) => {
		res.sendFile("../public/exercise.html");
	});
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
		try {
			const workouts = await Workout.updateOne(
				{ _id: ObjectId(req.params.id) },
				{
					$push: {
						exercises: req.body.exercises
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
